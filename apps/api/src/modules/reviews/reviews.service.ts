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
  photoUrl?: string;
  instagramUrl?: string;
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
      photoUrl: true,
      instagramUrl: true,
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

  const average = Math.round((sum / total) * 10) / 10;

  return { average, total, distribution };
}

/**
 * ✅ Helper: Resolver el ID real del producto desde un ID o un slug.
 *
 * ⚠️ CAMBIO CRÍTICO (fix del bug en producción):
 * Prisma 5.22 + PgBouncer (pooler de Neon) tiene un bug conocido donde
 * `findUnique` con `select: { id: true }` FALLA SILENCIOSAMENTE devolviendo
 * `null`, aunque el registro SÍ exista en la DB.
 *
 * Por eso ahora usamos `findFirst` SIN `select` (trae el producto completo).
 * Es la única forma confiable con el pooler de Neon.
 */
async function resolveProductId(productIdOrSlug: string): Promise<string | null> {
  if (!productIdOrSlug || productIdOrSlug.trim() === '') return null;

  const clean = productIdOrSlug.trim();

  // ─── Búsqueda 1: por ID ─────────────────────────────
  try {
    const byId = await prisma.product.findFirst({
      where: { id: clean },
    });
    if (byId) {
      logger.info({ id: clean }, '✅ Producto encontrado por ID');
      return byId.id;
    }
  } catch (e) {
    logger.warn({ error: e, id: clean }, '⚠️ Error buscando producto por id');
  }

  // ─── Búsqueda 2: por slug ───────────────────────────
  try {
    const bySlug = await prisma.product.findFirst({
      where: { slug: clean },
    });
    if (bySlug) {
      logger.info({ slug: clean }, '✅ Producto encontrado por slug');
      return bySlug.id;
    }
  } catch (e) {
    logger.warn({ error: e, slug: clean }, '⚠️ Error buscando producto por slug');
  }

  logger.warn({ raw: clean }, '❌ Producto no encontrado ni por ID ni por slug');
  return null;
}

/**
 * Crea una nueva review.
 */
export async function createReview(data: CreateReviewData) {
  const {
    productId: rawProductId,
    authorName,
    authorEmail,
    rating,
    comment,
    photoUrl,
    instagramUrl,
  } = data;

  // Validaciones básicas
  if (!rawProductId || !authorName || !authorEmail || !comment) {
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

  // ✅ FIX: Resolver el ID real (acepta ID o slug)
  const realProductId = await resolveProductId(rawProductId);

  if (!realProductId) {
    logger.error(
      { rawProductId },
      '❌ Producto no encontrado (ni por ID ni por slug)'
    );
    throw new Error('Producto no encontrado');
  }

  logger.info(
    { rawProductId, realProductId },
    '✅ Producto resuelto correctamente'
  );

  // Verificar si ya dejó una review para este producto
  const existing = await prisma.review.findFirst({
    where: {
      productId: realProductId,
      authorEmail: authorEmail.toLowerCase().trim(),
    },
  });

  if (existing) {
    throw new Error('Ya dejaste una reseña para este producto');
  }

  // Limpiar URLs
  const cleanPhotoUrl = photoUrl && photoUrl.trim() !== '' ? photoUrl.trim() : null;
  const cleanInstagramUrl =
    instagramUrl && instagramUrl.trim() !== '' ? instagramUrl.trim() : null;

  // Crear la review
  const review = await prisma.review.create({
    data: {
      productId: realProductId,
      authorName: authorName.trim(),
      authorEmail: authorEmail.toLowerCase().trim(),
      rating,
      comment: comment.trim(),
      photoUrl: cleanPhotoUrl,
      instagramUrl: cleanInstagramUrl,
      isApproved: true,
    },
    select: {
      id: true,
      authorName: true,
      rating: true,
      comment: true,
      photoUrl: true,
      instagramUrl: true,
      createdAt: true,
    },
  });

  logger.info(
    {
      reviewId: review.id,
      realProductId,
      rating,
      hasPhoto: !!cleanPhotoUrl,
      hasInstagram: !!cleanInstagramUrl,
    },
    '✅ Review creada'
  );

  return review;
}

// ============================================
// FUNCIONES DE ADMIN
// ============================================

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

export async function deleteReview(id: string) {
  const review = await prisma.review.delete({
    where: { id },
  });

  logger.info({ reviewId: id }, '🗑️  Review eliminada');
  return review;
}

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