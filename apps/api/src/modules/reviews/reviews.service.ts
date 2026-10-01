import { prisma } from '../../lib/prisma/client';
import { logger } from '../../lib/logger/logger';

// ============================================
// TIPOS
// ============================================

interface CreateReviewData {
  productId: string;
  authorName: string;
  authorEmail: string;
  rating: number;
  comment: string;
}

interface RatingStats {
  average: number;
  total: number;
  distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

// ============================================
// FUNCIONES PÚBLICAS
// ============================================

/**
 * Obtiene todas las reviews aprobadas de un producto.
 */
export async function getReviewsByProduct(productId: string) {
  logger.info({ productId }, '🔍 Buscando reviews del producto');

  const reviews = await prisma.review.findMany({
    where: {
      productId,
      isApproved: true,
    },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      authorName: true,
      rating: true,
      comment: true,
      createdAt: true,
    },
  });

  logger.info({ productId, count: reviews.length }, '✅ Reviews encontradas');
  return reviews;
}

/**
 * Calcula el promedio y la distribución de ratings de un producto.
 */
export async function getProductRatingStats(productId: string): Promise<RatingStats> {
  const reviews = await prisma.review.findMany({
    where: { productId, isApproved: true },
    select: { rating: true },
  });

  const total = reviews.length;

  if (total === 0) {
    return {
      average: 0,
      total: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };
  }

  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let sum = 0;

  for (const review of reviews) {
    const r = review.rating as 1 | 2 | 3 | 4 | 5;
    if (r >= 1 && r <= 5) {
      distribution[r]++;
      sum += r;
    }
  }

  const average = Math.round((sum / total) * 10) / 10; // Redondea a 1 decimal

  return { average, total, distribution };
}

/**
 * Crea una nueva review.
 * - Valida el rating (1-5)
 * - Verifica que no exista una review previa del mismo email para el mismo producto
 */
export async function createReview(data: CreateReviewData) {
  const { productId, authorName, authorEmail, rating, comment } = data;

  // Validaciones básicas
  if (!productId || !authorName || !authorEmail || !comment) {
    throw new Error('Todos los campos son obligatorios');
  }

  if (rating < 1 || rating > 5) {
    throw new Error('El rating debe estar entre 1 y 5');
  }

  if (comment.length < 10) {
    throw new Error('El comentario debe tener al menos 10 caracteres');
  }

  if (comment.length > 1000) {
    throw new Error('El comentario no puede exceder 1000 caracteres');
  }

  // Verificar que el producto existe
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true, name: true },
  });

  if (!product) {
    throw new Error('Producto no encontrado');
  }

  // Verificar si ya dejó una review para este producto
  const existing = await prisma.review.findFirst({
    where: {
      productId,
      authorEmail: authorEmail.toLowerCase().trim(),
    },
  });

  if (existing) {
    throw new Error('Ya dejaste una reseña para este producto');
  }

  // Crear la review
  const review = await prisma.review.create({
    data: {
      productId,
      authorName: authorName.trim(),
      authorEmail: authorEmail.toLowerCase().trim(),
      rating,
      comment: comment.trim(),
      isApproved: true, // Por defecto aprobada; el admin puede ocultarla después
    },
    select: {
      id: true,
      authorName: true,
      rating: true,
      comment: true,
      createdAt: true,
    },
  });

  logger.info(
    { reviewId: review.id, productId, rating },
    '✅ Review creada'
  );

  return review;
}

// ============================================
// FUNCIONES DE ADMIN
// ============================================

/**
 * Obtiene TODAS las reviews (incluidas las no aprobadas) — solo admin.
 */
export async function getAllReviewsAdmin() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      product: {
        select: { id: true, name: true, slug: true },
      },
    },
  });

  return reviews;
}

/**
 * Borra una review — solo admin.
 */
export async function deleteReview(id: string) {
  const review = await prisma.review.delete({
    where: { id },
  });

  logger.info({ reviewId: id }, '🗑️  Review eliminada');
  return review;
}

/**
 * Cambia el estado de aprobación de una review — solo admin.
 */
export async function toggleReviewApproval(id: string) {
  const current = await prisma.review.findUnique({
    where: { id },
    select: { isApproved: true },
  });

  if (!current) {
    throw new Error('Review no encontrada');
  }

  const review = await prisma.review.update({
    where: { id },
    data: { isApproved: !current.isApproved },
  });

  logger.info(
    { reviewId: id, isApproved: review.isApproved },
    '✅ Estado de review cambiado'
  );

  return review;
}