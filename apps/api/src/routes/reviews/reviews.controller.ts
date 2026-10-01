import { Router, Request, Response } from 'express';
import { asyncHandler } from '../../middleware/error-handler';
import { authenticate, authorize } from '../../middleware/auth';
import {
  getReviewsByProduct,
  getProductRatingStats,
  createReview,
  getAllReviewsAdmin,
  deleteReview,
  toggleReviewApproval,
} from '../../modules/reviews/reviews.service';
import { z } from 'zod';
import { logger } from '../../lib/logger/logger';

const router = Router();

// ============================================
// ESQUEMAS DE VALIDACIÓN
// ============================================

const createReviewSchema = z.object({
  productId: z.string().min(1, 'productId es requerido'),
  authorName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(80),
  authorEmail: z.string().email('Email inválido').max(200),
  rating: z.number().int().min(1, 'El rating debe ser entre 1 y 5').max(5),
  comment: z.string().min(10, 'El comentario debe tener al menos 10 caracteres').max(1000),
});

// ============================================
// ENDPOINTS PÚBLICOS
// ============================================

/**
 * GET /api/v1/reviews/product/:productId - PÚBLICO
 * Lista reviews aprobadas de un producto.
 */
router.get(
  '/product/:productId',
  asyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ error: 'productId es requerido' });
    }

    const [reviews, stats] = await Promise.all([
      getReviewsByProduct(productId),
      getProductRatingStats(productId),
    ]);

    res.json({ success: true, reviews, stats });
  })
);

/**
 * POST /api/v1/reviews - PÚBLICO
 * Crea una nueva review.
 * Body: { productId, authorName, authorEmail, rating, comment }
 */
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    logger.info({ body: req.body }, '📝 Nueva review recibida');

    const data = createReviewSchema.parse(req.body);

    try {
      // ✅ FIX: cast a `any` porque Zod infiere los campos como opcionales
      const review = await createReview(data as any);
      res.status(201).json({ success: true, review });
    } catch (error: any) {
      logger.warn({ error: error?.message }, '⚠️  Error creando review');
      return res.status(400).json({ error: error?.message || 'Error al crear la review' });
    }
  })
);

// ============================================
// ENDPOINTS DE ADMIN
// ============================================

/**
 * GET /api/v1/reviews/admin/all - SOLO ADMIN
 * Lista TODAS las reviews (incluidas las no aprobadas).
 */
router.get(
  '/admin/all',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: Request, res: Response) => {
    const reviews = await getAllReviewsAdmin();
    res.json({ success: true, reviews });
  })
);

/**
 * DELETE /api/v1/reviews/admin/:id - SOLO ADMIN
 * Borra una review.
 */
router.delete(
  '/admin/:id',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await deleteReview(id);
      res.json({ success: true, message: 'Review eliminada' });
    } catch (error: any) {
      return res.status(404).json({ error: 'Review no encontrada' });
    }
  })
);

/**
 * PATCH /api/v1/reviews/admin/:id/toggle - SOLO ADMIN
 * Cambia el estado de aprobación (oculta/muestra).
 */
router.patch(
  '/admin/:id/toggle',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const review = await toggleReviewApproval(id);
      res.json({ success: true, review });
    } catch (error: any) {
      return res.status(404).json({ error: error?.message || 'Review no encontrada' });
    }
  })
);

export default router;