import { Router, Request, Response } from 'express';
import { asyncHandler } from '../../middleware/error-handler';
import { authenticate, authorize, AuthRequest } from '../../middleware/auth';
import { logger } from '../../lib/logger/logger';
import {
  postCreateSchema,
  postUpdateSchema,
  postListQuerySchema,
  commentCreateSchema,
  commentReplySchema,
} from '../../schemas/post.schema';
import * as postsService from '../../modules/posts/posts.service';

const router = Router();

// ============================================
// RUTAS PÚBLICAS
// ============================================

/**
 * GET /api/v1/posts
 * Lista posts publicados con paginación y filtros.
 */
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const query = postListQuerySchema.parse(req.query);
    const result = await postsService.listPublishedPosts({
      page: query.page,
      limit: query.limit,
      category: query.category,
      search: query.search,
      tag: query.tag,
    });
    res.json(result);
  })
);

/**
 * GET /api/v1/posts/main
 * Obtiene el artículo principal (destacado).
 */
router.get(
  '/main',
  asyncHandler(async (_req: Request, res: Response) => {
    const post = await postsService.getMainArticle();
    res.json({ data: post });
  })
);

/**
 * GET /api/v1/posts/slug/:slug
 * Obtiene un post por slug + incrementa vistas.
 */
router.get(
  '/slug/:slug',
  asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const countView = req.query.view !== 'false';
    const post = await postsService.getPostBySlug(slug, { countView });

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.json({ data: post });
  })
);

/**
 * GET /api/v1/posts/related/:slug
 * Obtiene posts relacionados (misma categoría).
 */
router.get(
  '/related/:slug',
  asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const limit = req.query.limit ? Number(req.query.limit) : 3;
    const posts = await postsService.getRelatedPosts(slug, limit);
    res.json({ data: posts });
  })
);

/**
 * GET /api/v1/posts/:slug/comments
 * Lista comentarios aprobados de un post.
 */
router.get(
  '/:slug/comments',
  asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const comments = await postsService.listApprovedComments(slug);
    res.json({ data: comments });
  })
);

/**
 * POST /api/v1/posts/:slug/comment
 * Crea un comentario (queda pendiente de moderación).
 */
router.post(
  '/:slug/comment',
  asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const data = commentCreateSchema.parse(req.body);
    const comment = await postsService.createComment(slug, data);
    res.status(201).json({
      success: true,
      message: 'Comentario enviado. Será visible tras moderación.',
      data: { id: comment.id },
    });
  })
);

// ============================================
// RUTAS ADMIN
// ============================================

/**
 * GET /api/v1/posts/admin/list
 * Lista TODOS los posts (incluye borradores).
 */
router.get(
  '/admin/list',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const status = req.query.status as string | undefined;
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;

    const result = await postsService.listAllPostsAdmin({
      page,
      limit,
      status,
      category,
      search,
    });
    res.json(result);
  })
);

/**
 * GET /api/v1/posts/admin/comments/list
 * Lista TODOS los comentarios (admin).
 */
router.get(
  '/admin/comments/list',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const status = req.query.status as 'pending' | 'approved' | undefined;

    const result = await postsService.listAllCommentsAdmin({ page, limit, status });
    res.json(result);
  })
);

/**
 * PATCH /api/v1/posts/admin/comments/:id/approve
 * Aprueba un comentario.
 */
router.patch(
  '/admin/comments/:id/approve',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const comment = await postsService.approveComment(id);
    res.json({ data: comment });
  })
);

/**
 * POST /api/v1/posts/admin/comments/:id/reply
 * Responde a un comentario.
 */
router.post(
  '/admin/comments/:id/reply',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const data = commentReplySchema.parse(req.body);
    const comment = await postsService.replyToComment(id, data.adminReply);
    res.json({ data: comment });
  })
);

/**
 * DELETE /api/v1/posts/admin/comments/:id
 * Elimina un comentario.
 */
router.delete(
  '/admin/comments/:id',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    await postsService.deleteComment(id);
    res.json({ success: true, message: 'Comentario eliminado' });
  })
);

/**
 * GET /api/v1/posts/admin/:id
 * Obtiene un post por ID (admin).
 */
router.get(
  '/admin/:id',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const post = await postsService.getPostByIdAdmin(id);

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.json({ data: post });
  })
);

/**
 * POST /api/v1/posts/admin
 * Crea un post.
 */
router.post(
  '/admin',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = postCreateSchema.parse(req.body);
    const post = await postsService.createPost(data);
    logger.info({ postId: post.id, admin: req.user?.email }, 'Post creado');
    res.status(201).json({ data: post });
  })
);

/**
 * PUT /api/v1/posts/admin/:id
 * Actualiza un post.
 */
router.put(
  '/admin/:id',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const data = postUpdateSchema.parse(req.body);
    const post = await postsService.updatePost(id, data);
    logger.info({ postId: post.id, admin: req.user?.email }, 'Post actualizado');
    res.json({ data: post });
  })
);

/**
 * DELETE /api/v1/posts/admin/:id
 * Elimina un post.
 */
router.delete(
  '/admin/:id',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    await postsService.deletePost(id);
    logger.info({ postId: id, admin: req.user?.email }, 'Post eliminado');
    res.json({ success: true, message: 'Post eliminado' });
  })
);

/**
 * PATCH /api/v1/posts/admin/:id/publish
 * Publica o despublica un post.
 */
router.patch(
  '/admin/:id/publish',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const post = await postsService.togglePublish(id);
    res.json({ data: post });
  })
);

/**
 * PATCH /api/v1/posts/admin/:id/main
 * Marca un post como principal.
 */
router.patch(
  '/admin/:id/main',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const post = await postsService.setMainArticle(id);
    res.json({ data: post });
  })
);

/**
 * PATCH /api/v1/posts/admin/:id/show-views
 * Alterna mostrar/ocultar vistas.
 */
router.patch(
  '/admin/:id/show-views',
  authenticate,
  authorize('ADMIN', 'STORE_MANAGER'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const post = await postsService.toggleShowViews(id);
    res.json({ data: post });
  })
);

export default router;