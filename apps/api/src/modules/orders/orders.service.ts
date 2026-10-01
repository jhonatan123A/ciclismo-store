import { prisma } from '../../lib/prisma/client';
import { logger } from '../../lib/logger/logger';
import crypto from 'crypto';

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

    // ✅ La orden se crea PENDING hasta que Wompi confirme el pago vía webhook
    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: 'PENDING',
        subtotal: data.subtotal,
        shipping: data.shippingCost,
        total: data.total,
        paymentMethod: data.paymentMethod,
        paymentId: data.paymentId,
        paymentStatus: 'pending',
        shippingAddress: data.shippingAddress,
        billingAddress: data.shippingAddress,
        metadata: {
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          // ✅ Datos legales del cliente (DIAN + guías)
          documentType: data.shippingAddress?.documentType || '',
          documentId: data.shippingAddress?.documentId || '',
          personType: data.shippingAddress?.personType || '',
          taxRegime: data.shippingAddress?.taxRegime || '',
        },
        items: {
          create: itemsToCreate,
        },
      },
      include: { items: true },
    });

    logger.info({ orderNumber: order.orderNumber }, '✅ Orden guardada en DB (PENDING)');

    // ✅ Los emails los envía el webhook de Wompi cuando el pago es APPROVED

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
// Solo devuelve pedidos pagados (PAID, SHIPPED, DELIVERED)
// ⚠️ USO INTERNO / ADMIN — No exponer públicamente
export async function getOrdersByEmail(email: string) {
  logger.info({ email }, '🔍 Buscando pedidos por email');

  // Buscar por email en metadata (formato JSON), solo órdenes pagadas
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
      AND status IN ('PAID', 'SHIPPED', 'DELIVERED')
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

// ✅ NUEVO: Genera un token de acceso único (32 bytes hex = 64 caracteres)
export function generateAccessToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// ✅ NUEVO: Calcula la fecha de expiración (90 días desde ahora)
export function getAccessTokenExpiration(): Date {
  const exp = new Date();
  exp.setDate(exp.getDate() + 90); // 90 días
  return exp;
}

// ✅ NUEVO: Obtener una orden por su accessToken
// Solo devuelve la orden si el token es válido y no ha expirado
export async function getOrderByAccessToken(token: string) {
  logger.info({ tokenPrefix: token.substring(0, 8) + '...' }, '🔍 Buscando orden por token');

  if (!token || token.length < 32) {
    logger.warn('⚠️ Token inválido (muy corto)');
    return null;
  }

  const order = await prisma.order.findUnique({
    where: { accessToken: token },
    include: { items: true },
  });

  if (!order) {
    logger.warn({ tokenPrefix: token.substring(0, 8) + '...' }, '⚠️ Token no encontrado');
    return null;
  }

  // Verificar que no haya expirado
  if (order.accessTokenExp && order.accessTokenExp < new Date()) {
    logger.warn(
      { orderNumber: order.orderNumber, expiredAt: order.accessTokenExp },
      '⚠️ Token expirado'
    );
    return null;
  }

  // Solo devolver órdenes que ya estén pagadas o más allá
  if (!['PAID', 'SHIPPED', 'DELIVERED'].includes(order.status)) {
    logger.warn(
      { orderNumber: order.orderNumber, status: order.status },
      '⚠️ Orden no está pagada'
    );
    return null;
  }

  logger.info({ orderNumber: order.orderNumber }, '✅ Orden encontrada por token');
  return order;
}

// ============================================
// ✅ NUEVO: FUNCIONES PARA EL PANEL DE ADMIN
// ============================================

interface AdminOrderFilters {
  status?: string;
  search?: string;       // email, orderNumber, cédula, nombre
  from?: Date;
  to?: Date;
  page?: number;
  limit?: number;
}

/**
 * Lista de pedidos para el panel de admin con filtros y paginación.
 */
export async function getOrdersAdmin(filters: AdminOrderFilters = {}) {
  const {
    status,
    search,
    from,
    to,
    page = 1,
    limit = 20,
  } = filters;

  const where: any = {};

  // Filtro por estado
  if (status && status !== 'ALL') {
    where.status = status;
  }

  // Filtro por fecha
  if (from || to) {
    where.createdAt = {};
    if (from) where.createdAt.gte = from;
    if (to) where.createdAt.lte = to;
  }

  // Búsqueda por texto (email, orderNumber, cédula, nombre)
  if (search && search.trim().length > 0) {
    const term = search.trim();
    where.OR = [
      { orderNumber: { contains: term, mode: 'insensitive' } },
      { paymentId: { contains: term, mode: 'insensitive' } },
      { trackingNumber: { contains: term, mode: 'insensitive' } },
      { metadata: { path: ['customerEmail'], string_contains: term } },
      { metadata: { path: ['customerName'], string_contains: term } },
      { metadata: { path: ['documentId'], string_contains: term } },
      { metadata: { path: ['customerPhone'], string_contains: term } },
    ];
  }

  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { items: true },
      skip,
      take: limit,
    }),
    prisma.order.count({ where }),
  ]);

  return {
    orders,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Estadísticas para el dashboard del admin.
 */
export async function getOrderStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    totalOrders,
    paidOrders,
    pendingOrders,
    shippedOrders,
    monthSalesResult,
    todaySalesResult,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: 'PAID' } }),
    prisma.order.count({ where: { status: 'PENDING' } }),
    prisma.order.count({ where: { status: 'SHIPPED' } }),
    prisma.order.aggregate({
      where: {
        status: { in: ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'] },
        createdAt: { gte: startOfMonth },
      },
      _sum: { total: true },
    }),
    prisma.order.aggregate({
      where: {
        status: { in: ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'] },
        createdAt: { gte: startOfToday },
      },
      _sum: { total: true },
    }),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { items: true },
    }),
  ]);

  return {
    totalOrders,
    paidOrders,
    pendingOrders,
    shippedOrders,
    monthSales: monthSalesResult._sum.total || 0,
    todaySales: todaySalesResult._sum.total || 0,
    recentOrders,
  };
}

/**
 * Cambia el estado de una orden.
 */
export async function updateOrderStatus(orderId: string, newStatus: string) {
  const VALID_STATUSES = ['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  if (!VALID_STATUSES.includes(newStatus)) {
    throw new Error(`Estado inválido: ${newStatus}. Válidos: ${VALID_STATUSES.join(', ')}`);
  }

  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus },
    include: { items: true },
  });

  logger.info(
    { orderNumber: order.orderNumber, newStatus },
    '✅ Estado de orden actualizado'
  );

  return order;
}

/**
 * Agrega o actualiza el número de guía de una orden.
 */
export async function updateOrderTracking(orderId: string, trackingNumber: string) {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { trackingNumber },
    include: { items: true },
  });

  logger.info(
    { orderNumber: order.orderNumber, trackingNumber },
    '✅ Número de guía actualizado'
  );

  return order;
}