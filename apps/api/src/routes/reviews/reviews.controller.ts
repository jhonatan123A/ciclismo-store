import { Router, Request, Response } from 'express';
import multer from 'multer';
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
import { uploadReviewImage } from '../../lib/cloudinary/client';
import { z } from 'zod';
import { logger } from '../../lib/logger/logger';

const router = Router();

// ============================================
// MULTER (para subir fotos)
// ============================================
// Guarda el archivo en memoria (no en disco), lo subimos directo a Cloudinary.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB máximo
  },
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Solo se permiten imágenes JPG, PNG o WebP'));
    }
    cb(null, true);
  },
});

// ============================================
// ESQUEMAS DE VALIDACIÓN
// ============================================

const createReviewSchema = z.object({
  productId: z.string().min(1, 'productId es requerido'),
  authorName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(80),
  authorEmail: z.string().email('Email inválido').max(200),
  rating: z.number().int().min(1, 'El rating debe ser entre 1 y 5').max(5),
  comment: z.string().min(10, 'El comentario debe tener al menos 10 caracteres').max(1000),
  // ✅ NUEVO: campos opcionales
  photoUrl: z.string().url('URL de foto inválida').optional().or(z.literal('')),
  instagramUrl: z
    .string()
    .url('URL de Instagram inválida')
    .refine(
      (url) =>
        /^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+\/?/.test(url),
      { message: 'Debe ser un link válido de Instagram (post o reel)' }
    )
    .optional()
    .or(z.literal('')),
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
 * POST /api/v1/reviews/upload - PÚBLICO
 * Sube una foto de review a Cloudinary.
 * Body: multipart/form-data con campo "photo"
 * Devuelve: { success: true, photoUrl: "https://res.cloudinary.com/..." }
 */
router.post(
  '/upload',
  upload.single('photo'),
  asyncHandler(async (req: Request, res: Response) => {
    logger.info('📷 Nueva foto de review recibida');

    if (!req.file) {
      return res.status(400).json({ error: 'No se recibió ningún archivo' });
    }

    try {
      const photoUrl = await uploadReviewImage(req.file.buffer);
      logger.info({ photoUrl }, '✅ Foto subida a Cloudinary');
      res.json({ success: true, photoUrl });
    } catch (error: any) {
      logger.error({ error: error?.message }, '❌ Error subiendo foto');
      return res.status(500).json({
        error: error?.message || 'Error al subir la imagen. Intenta de nuevo.',
      });
    }
  })
);

/**
 * POST /api/v1/reviews - PÚBLICO
 * Crea una nueva review.
 * Body: { productId, authorName, authorEmail, rating, comment, photoUrl?, instagramUrl? }
 */
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    logger.info({ body: req.body }, '📝 Nueva review recibida');

    const data = createReviewSchema.parse(req.body);

    try {
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