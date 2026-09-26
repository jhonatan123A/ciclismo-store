import { prisma } from '../../lib/prisma/client';
import { logger } from '../../lib/logger/logger';
import { sendOrderEmails } from '../../lib/email/send-order-emails';

interface CreateOrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: any;
  items: any[];
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  paymentId: string;
}

export async function createOrder(data: CreateOrderData) {
  try {
    const orderNumber = `BESTIGE-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;

    logger.info({ orderNumber }, '📦 Creando orden en DB...');

    const productIds = data.items
      .map((item: any) => item.productId)
      .filter((id: any) => typeof id === 'string' && id.trim().length > 0);

    const existingProducts = productIds.length > 0
      ? await prisma.product.findMany({
          where: { id: { in: productIds } },
          select: { id: true },
        })
      : [];

    const existingIds = new Set(existingProducts.map((p) => p.id));

    logger.info(
      { requested: productIds.length, existing: existingIds.size },
      '🔍 Productos verificados'
    );

    const itemsToCreate = data.items.map((item: any) => {
      const itemData: any = {
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
        productName: item.name || 'Producto',
        productImage: item.image || '',
        size: item.size || 'M',
        color: item.color || 'Negro',
      };

      if (item.productId && existingIds.has(item.productId)) {
        itemData.productId = item.productId;
      }

      return itemData;
    });

    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: 'PAID',
        subtotal: data.subtotal,
        shipping: data.shippingCost,
        total: data.total,
        paymentMethod: data.paymentMethod,
        paymentId: data.paymentId,
        paymentStatus: 'approved',
        shippingAddress: data.shippingAddress,
        billingAddress: data.shippingAddress,
        metadata: {
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
        },
        items: {
          create: itemsToCreate,
        },
      },
      include: { items: true },
    });

    logger.info({ orderNumber: order.orderNumber }, '✅ Orden guardada en DB');

    try {
      await sendOrderEmails({
        orderNumber: order.orderNumber,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        shippingAddress: data.shippingAddress,
        items: data.items.map((item: any) => ({
          name: item.name || 'Producto',
          quantity: item.quantity,
          size: item.size || 'M',
          color: item.color || 'Negro',
          price: item.price,
        })),
        subtotal: data.subtotal,
        shippingCost: data.shippingCost,
        total: data.total,
        paymentMethod: data.paymentMethod,
        paymentId: data.paymentId,
      });
      logger.info({ orderNumber }, '✅ Emails enviados');
    } catch (emailError) {
      logger.error({ emailError }, '❌ Error enviando emails');
    }

    return order;
  } catch (error) {
    logger.error({ error }, '❌ Error creando orden');
    throw error;
  }
}

export async function getAllOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  });
}

export async function getOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
}

// ✅ NUEVA FUNCIÓN: Obtener pedidos por email del cliente
export async function getOrdersByEmail(email: string) {
  logger.info({ email }, '🔍 Buscando pedidos por email');

  // Buscar por email en metadata (formato JSON)
  const orders = await prisma.$queryRaw`
    SELECT 
      id,
      "orderNumber",
      status,
      total,
      subtotal,
      shipping,
      "paymentMethod",
      "paymentStatus",
      "shippingAddress",
      metadata,
      "createdAt"
    FROM "Order"
    WHERE metadata->>'customerEmail' = ${email}
    ORDER BY "createdAt" DESC
    LIMIT 50
  `;

  // Para cada orden, obtener sus items
  const ordersWithItems = await Promise.all(
    (orders as any[]).map(async (order) => {
      const items = await prisma.orderItem.findMany({
        where: { orderId: order.id },
      });
      return { ...order, items };
    })
  );

  logger.info({ email, count: ordersWithItems.length }, '✅ Pedidos encontrados');

  return ordersWithItems;
}