import { Router, Request, Response } from 'express';
import { asyncHandler, AppError } from '../../middleware/error-handler';
import { authenticate, authorize, AuthRequest } from '../../middleware/auth';
import { prisma } from '../../lib/prisma/client';
import { logger } from '../../lib/logger/logger';
import { createOrderSchema } from '../../schemas/order.schema';

const router = Router();

// GET /api/v1/orders - Listar pedidos (solo admin)
router.get('/', authenticate, authorize('ADMIN', 'STORE_MANAGER'), asyncHandler(async (req: AuthRequest, res: Response) => {
  const { limit = 50, offset = 0, status } = req.query;
  
  const where: any = status ? { status: status as string } : {};
  
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      skip: Number(offset),
    }),
    prisma.order.count({ where }),
  ]);
  
  res.json({
    data: orders,
    pagination: {
      total,
      limit: Number(limit),
      offset: Number(offset),
    },
  });
}));

// GET /api/v1/orders/my - Mis pedidos (usuario autenticado)
router.get('/my', authenticate, asyncHandler(async (req: AuthRequest, res: Response) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user!.id },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              images: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  
  res.json(orders);
}));

// GET /api/v1/orders/:id - Obtener pedido
router.get('/:id', authenticate, asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              images: true,
            },
          },
        },
      },
    },
  });
  
  if (!order) {
    throw new AppError('Order not found', 404);
  }
  
  // Verificar permiso: admin o dueño del pedido
  if (req.user?.role !== 'ADMIN' && order.userId !== req.user?.id) {
    throw new AppError('Not authorized to view this order', 403);
  }
  
  res.json(order);
}));

// POST /api/v1/orders - Crear pedido (con transacción atómica)
router.post('/', authenticate, asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = createOrderSchema.parse(req.body);
  
  // Usar transacción para evitar sobreventa
  const result = await prisma.$transaction(async (tx) => {
    // Verificar stock de cada item
    for (const item of data.items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
      });
      
      if (!product) {
        throw new AppError(`Product ${item.productId} not found`, 404);
      }
      
      const availableStock = product.stock - product.reservedStock;
      if (availableStock < item.quantity) {
        throw new AppError(
          `Insufficient stock for "${product.name}". Available: ${availableStock}`,
          409
        );
      }
    }
    
    // Reservar stock
    for (const item of data.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          reservedStock: {
            increment: item.quantity,
          },
        },
      });
    }
    
    // Crear número de pedido
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const order = await tx.order.create({
      data: {
        orderNumber,
        userId: req.user!.id,
        status: 'PENDING',
        total,
        subtotal: total,
        tax: data.tax || 0,
        shipping: data.shipping || 0,
        discount: data.discount || 0,
        paymentMethod: data.paymentMethod,
        shippingAddress: data.shippingAddress,
        billingAddress: data.billingAddress,
        notes: data.notes,
        items: {
          create: data.items.map(item => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });
    
    return order;
  });
  
  logger.info({
    orderId: result.id,
    orderNumber: result.orderNumber,
    userId: req.user?.id,
    total: result.total,
    items: result.items.length,
  }, 'Order created with stock reservation');
  
  res.status(201).json(result);
}));

// PUT /api/v1/orders/:id/cancel - Cancelar pedido
router.put('/:id/cancel', authenticate, asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
  
  if (!order) {
    throw new AppError('Order not found', 404);
  }
  
  // Verificar permiso: admin o dueño del pedido
  if (req.user?.role !== 'ADMIN' && order.userId !== req.user?.id) {
    throw new AppError('Not authorized to cancel this order', 403);
  }
  
  if (order.status === 'PAID' || order.status === 'SHIPPED') {
    throw new AppError('Cannot cancel paid or shipped order', 400);
  }
  
  // Liberar stock reservado
  await prisma.$transaction(async (tx) => {
    for (const item of order.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          reservedStock: {
            decrement: item.quantity,
          },
        },
      });
    }
    
    await tx.order.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  });
  
  logger.info({ orderId: id, userId: req.user?.id }, 'Order cancelled');
  
  res.json({ message: 'Order cancelled successfully' });
}));

export default router;