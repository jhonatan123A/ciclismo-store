import { Router, Request, Response } from 'express';
import { asyncHandler } from '../../middleware/error-handler';
import { authenticate, authorize, AuthRequest } from '../../middleware/auth';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByEmail,
  getOrderByAccessToken,
  getOrdersAdmin,
  getOrderStats,
  updateOrderStatus,
  updateOrderTracking,
} from '../../modules/orders/orders.service';
import { createOrderSchema } from '../../schemas/order.schema';
import { logger } from '../../lib/logger/logger';
import { sendStatusUpdateEmail } from '../../lib/email/send-order-emails';

const router = Router();

/**
 * POST /api/v1/orders - PÚBLICO
 */
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    logger.info({ body: req.body }, '📥 Body recibido');

    const data = createOrderSchema.parse(req.body);

    logger.info(
      { email: data.customerEmail, total: data.total },
      '📦 Nueva orden recibida'
    );

    const order = await createOrder({
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone || '',
      shippingAddress: data.shippingAddress,
      items: data.items as any,
      subtotal: data.subtotal,
      shippingCost: data.shippingCost,
      total: data.total,
      paymentMethod: data.paymentMethod,
      paymentId: data.paymentId,
    });

    res.status(201).json({
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
    });
  })
);

/**
 * GET /api/v1/orders/by-token/:token - PÚBLICO (cliente ve SU pedido con token)
 */
router.get(
  '/by-token/:token',
  asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.params;

    if (!token || token.length < 32) {
      return res.status(400).json({ error: 'Token inválido' });
    }

    const order = await getOrderByAccessToken(token);

    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado o token expirado' });
    }

    res.json({
      success: true,
      order,
    });
  })
);

// ============================================
// ✅ NUEVOS ENDPOINTS DE ADMIN (protegidos con JWT + rol)
// ⚠️ DEBEN IR ANTES de /:id para no colisionar
// ============================================

/**
 * GET /api/v1/orders/admin/list - SOLO ADMIN
 * Lista pedidos con filtros, búsqueda y paginación.
 * Query params: status, search, from, to, page, limit
 */
router.get(
  '/admin/list',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: Request, res: Response) => {
    const { status, search, from, to, page, limit } = req.query;

    const filters: any = {};

    if (status && typeof status === 'string') filters.status = status;
    if (search && typeof search === 'string') filters.search = search;
    if (from && typeof from === 'string') filters.from = new Date(from);
    if (to && typeof to === 'string') filters.to = new Date(to);
    if (page) filters.page = parseInt(String(page), 10);
    if (limit) filters.limit = parseInt(String(limit), 10);

    const result = await getOrdersAdmin(filters);

    res.json(result);
  })
);

/**
 * GET /api/v1/orders/admin/stats - SOLO ADMIN
 * Estadísticas para el dashboard.
 */
router.get(
  '/admin/stats',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: Request, res: Response) => {
    const stats = await getOrderStats();
    res.json(stats);
  })
);

/**
 * PATCH /api/v1/orders/admin/:id/status - SOLO ADMIN
 * Cambiar el estado de un pedido + enviar email al cliente.
 * Body: { status: 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' }
 */
router.patch(
  '/admin/:id/status',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || typeof status !== 'string') {
      return res.status(400).json({ error: 'status es requerido' });
    }

    try {
      const order = await updateOrderStatus(id, status);

      // ✅ NUEVO: Enviar email al cliente notificando el cambio de estado
      // Solo para estados que el cliente debe conocer: PROCESSING, SHIPPED, DELIVERED, CANCELLED
      const meta = (order.metadata as any) || {};
      if (
        meta.customerEmail &&
        ['PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].includes(status)
      ) {
        try {
          await sendStatusUpdateEmail({
            orderNumber: order.orderNumber,
            customerName: meta.customerName || 'Cliente',
            customerEmail: meta.customerEmail,
            newStatus: status,
            trackingNumber: order.trackingNumber || undefined,
            accessToken: order.accessToken || undefined,
          });
          logger.info(
            { orderNumber: order.orderNumber, status },
            '📧 Email de cambio de estado enviado al cliente'
          );
        } catch (emailError) {
          logger.error({ emailError }, '❌ Error enviando email de cambio de estado');
          // No hacemos throw — la orden ya se actualizó
        }
      }

      res.json({ success: true, order });
    } catch (error: any) {
      logger.error({ error: error?.message, orderId: id, status }, '❌ Error cambiando estado');
      return res.status(400).json({ error: error?.message || 'Error al cambiar estado' });
    }
  })
);

/**
 * PATCH /api/v1/orders/admin/:id/tracking - SOLO ADMIN
 * Agregar o actualizar el número de guía de un pedido + enviar email al cliente.
 * Body: { trackingNumber: 'ABC123456' }
 */
router.patch(
  '/admin/:id/tracking',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { trackingNumber } = req.body;

    if (!trackingNumber || typeof trackingNumber !== 'string') {
      return res.status(400).json({ error: 'trackingNumber es requerido' });
    }

    const order = await updateOrderTracking(id, trackingNumber);

    // ✅ NUEVO: Enviar email al cliente notificando el número de guía
    const meta = (order.metadata as any) || {};
    if (meta.customerEmail) {
      try {
        await sendStatusUpdateEmail({
          orderNumber: order.orderNumber,
          customerName: meta.customerName || 'Cliente',
          customerEmail: meta.customerEmail,
          newStatus: 'SHIPPED',
          trackingNumber: order.trackingNumber || undefined,
          accessToken: order.accessToken || undefined,
        });
        logger.info(
          { orderNumber: order.orderNumber, trackingNumber },
          '📧 Email de guía enviado al cliente'
        );
      } catch (emailError) {
        logger.error({ emailError }, '❌ Error enviando email de guía');
      }
    }

    res.json({ success: true, order });
  })
);

// ============================================
// FIN ENDPOINTS DE ADMIN
// ============================================

/**
 * GET /api/v1/orders/history/:email - SOLO ADMIN
 * ⚠️ DEBE IR ANTES de /:id para no colisionar
 */
router.get(
  '/history/:email',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.params;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    const orders = await getOrdersByEmail(email);

    res.json({
      success: true,
      email,
      count: orders.length,
      orders,
    });
  })
);

/**
 * GET /api/v1/orders - SOLO ADMIN
 */
router.get(
  '/',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: Request, res: Response) => {
    const orders = await getAllOrders();
    res.json(orders);
  })
);

/**
 * GET /api/v1/orders/:id - SOLO ADMIN
 */
router.get(
  '/:id',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: Request, res: Response) => {
    const order = await getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    res.json(order);
  })
);

export default router;