import { Router, Request, Response } from 'express';
import { asyncHandler } from '../../middleware/error-handler';
import { authenticate, authorize, AuthRequest } from '../../middleware/auth';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByEmail,
} from '../../modules/orders/orders.service';
import { createOrderSchema } from '../../schemas/order.schema';
import { logger } from '../../lib/logger/logger';

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
 * GET /api/v1/orders/history/:email - PÚBLICO (cliente ve sus pedidos)
 * ⚠️ DEBE IR ANTES de /:id para no colisionar
 */
router.get(
  '/history/:email',
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