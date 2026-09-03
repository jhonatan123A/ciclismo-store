import { Router, Request, Response } from 'express';
import { asyncHandler } from '../../middleware/error-handler';
import { authenticate, authorize, AuthRequest } from '../../middleware/auth';
import { prisma } from '../../lib/prisma/client';
import { logger } from '../../lib/logger/logger';
import { productSchema, productUpdateSchema } from '../../schemas/product.schema';

const router = Router();

// GET /api/v1/products - Listar productos (público)
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const { 
    page = 1, 
    limit = 20, 
    category, 
    search,
    minPrice,
    maxPrice,
    sort = 'createdAt',
    order = 'desc',
  } = req.query;
  
  const where: any = {
    isActive: true,
    status: 'PUBLISHED',
  };
  
  if (category) {
    where.category = { slug: category as string };
  }
  
  if (search) {
    where.OR = [
      { name: { contains: search as string, mode: 'insensitive' } },
      { description: { contains: search as string, mode: 'insensitive' } },
    ];
  }
  
  if (minPrice) {
    where.price = { ...where.price, gte: parseFloat(minPrice as string) };
  }
  
  if (maxPrice) {
    where.price = { ...where.price, lte: parseFloat(maxPrice as string) };
  }
  
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { [sort as string]: order as string },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    }),
    prisma.product.count({ where }),
  ]);
  
  res.json({
    data: products,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
}));

// GET /api/v1/products/:id - Obtener producto (público)
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
  
  if (!product || !product.isActive) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
}));

// GET /api/v1/products/slug/:slug - Obtener por slug (público)
router.get('/slug/:slug', asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });
  
  if (!product || !product.isActive) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
}));

// POST /api/v1/products - Crear producto (solo admin)
router.post('/', authenticate, authorize('ADMIN', 'STORE_MANAGER'), asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = productSchema.parse(req.body);
  
  // Generar slug
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  const product = await prisma.product.create({
    data: {
      ...data,
      slug,
    },
  });
  
  logger.info({ productId: product.id, admin: req.user?.email }, 'Product created');
  
  res.status(201).json(product);
}));

// PUT /api/v1/products/:id - Actualizar producto (solo admin)
router.put('/:id', authenticate, authorize('ADMIN', 'STORE_MANAGER'), asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const data = productUpdateSchema.parse(req.body);
  
  const product = await prisma.product.update({
    where: { id },
    data,
  });
  
  logger.info({ productId: product.id, admin: req.user?.email }, 'Product updated');
  
  res.json(product);
}));

// DELETE /api/v1/products/:id - Eliminar producto (solo admin)
router.delete('/:id', authenticate, authorize('ADMIN'), asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  
  await prisma.product.delete({
    where: { id },
  });
  
  logger.info({ productId: id, admin: req.user?.email }, 'Product deleted');
  
  res.json({ message: 'Product deleted successfully' });
}));

export default router;