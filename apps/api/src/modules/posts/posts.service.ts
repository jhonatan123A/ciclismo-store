import { prisma } from '../../lib/prisma/client';
import { logger } from '../../lib/logger/logger';
import type {
  PostCreateInput,
  PostUpdateInput,
  CommentCreateInput,
} from '../../schemas/post.schema';

// ============================================
// HELPERS
// ============================================

/**
 * Calcula el tiempo estimado de lectura (en minutos).
 * Basado en 200 palabras por minuto (promedio adulto).
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Genera un slug a partir de un título.
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quitar acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ============================================
// POSTS — PÚBLICOS
// ============================================

/**
 * Lista posts publicados (paginados).
 */
export async function listPublishedPosts(params: {
  page: number;
  limit: number;
  category?: string | undefined;
  search?: string | undefined;
  tag?: string | undefined;
}) {
  const { page, limit, category, search, tag } = params;
  const skip = (page - 1) * limit;

  const where: any = {
    status: 'PUBLISHED',
    publishedAt: { not: null },
  };

  if (category) where.category = category;
  if (tag) where.tags = { has: tag };
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { excerpt: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: [{ isMainArticle: 'desc' }, { publishedAt: 'desc' }],
      skip,
      take: limit,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        coverImageAlt: true,
        category: true,
        tags: true,
        authorName: true,
        readingTime: true,
        views: true,
        showViews: true,
        isMainArticle: true,
        publishedAt: true,
        createdAt: true,
      },
    }),
    prisma.post.count({ where }),
  ]);

  return {
    data: posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Obtiene el artículo principal (isMainArticle = true).
 */
export async function getMainArticle() {
  return prisma.post.findFirst({
    where: {
      status: 'PUBLISHED',
      isMainArticle: true,
      publishedAt: { not: null },
    },
    orderBy: { publishedAt: 'desc' },
  });
}

/**
 * Obtiene un post publicado por slug e incrementa el contador de vistas.
 */
export async function getPostBySlug(slug: string, options: { countView?: boolean } = {}) {
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post || post.status !== 'PUBLISHED') {
    return null;
  }

  // Incrementar vistas solo si se pidió
  if (options.countView) {
    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });
    post.views += 1;
  }

  return post;
}

/**
 * Obtiene posts relacionados (misma categoría, excluyendo el actual).
 */
export async function getRelatedPosts(slug: string, limit = 3) {
  const current = await prisma.post.findUnique({
    where: { slug },
    select: { id: true, category: true },
  });

  if (!current) return [];

  return prisma.post.findMany({
    where: {
      status: 'PUBLISHED',
      category: current.category,
      id: { not: current.id },
      publishedAt: { not: null },
    },
    orderBy: { publishedAt: 'desc' },
    take: limit,
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      category: true,
      readingTime: true,
      publishedAt: true,
    },
  });
}

// ============================================
// POSTS — ADMIN
// ============================================

/**
 * Lista TODOS los posts (incluye borradores) — solo admin.
 */
export async function listAllPostsAdmin(params: {
  page: number;
  limit: number;
  status?: string | undefined;
  category?: string | undefined;
  search?: string | undefined;
}) {
  const { page, limit, status, category, search } = params;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (status) where.status = status;
  if (category) where.category = category;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { slug: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);

  return {
    data: posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Obtiene un post por ID (admin).
 */
export async function getPostByIdAdmin(id: string) {
  return prisma.post.findUnique({ where: { id } });
}

/**
 * Crea un post (admin).
 */
export async function createPost(data: PostCreateInput) {
  const slug = data.slug || generateSlug(data.title);
  const readingTime = calculateReadingTime(data.content);

  // Si se publica directamente, setear publishedAt
  const publishedAt = data.status === 'PUBLISHED' ? new Date() : null;

  const post = await prisma.post.create({
    data: {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage || null,
      coverImageAlt: data.coverImageAlt || null,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      keywords: data.keywords,
      category: data.category,
      tags: data.tags,
      authorName: data.authorName,
      status: data.status,
      publishedAt,
      isMainArticle: data.isMainArticle,
      videoUrl: data.videoUrl || null,
      readingTime,
      showViews: data.showViews,
    },
  });

  logger.info({ postId: post.id, slug: post.slug }, '📝 Post creado');
  return post;
}

/**
 * Actualiza un post (admin).
 */
export async function updatePost(id: string, data: PostUpdateInput) {
  const current = await prisma.post.findUnique({ where: { id } });
  if (!current) throw new Error('Post no encontrado');

  const updates: any = { ...data };

  // Recalcular readingTime si cambió el contenido
  if (data.content) {
    updates.readingTime = calculateReadingTime(data.content);
  }

  // Manejar publishedAt según cambio de estado
  if (data.status === 'PUBLISHED' && !current.publishedAt) {
    updates.publishedAt = new Date();
  } else if (data.status && data.status !== 'PUBLISHED') {
    updates.publishedAt = null;
  }

  // Limpiar campos undefined que no deben sobrescribirse
  Object.keys(updates).forEach((key) => {
    if (updates[key] === undefined) delete updates[key];
  });

  const post = await prisma.post.update({
    where: { id },
    data: updates,
  });

  logger.info({ postId: post.id, slug: post.slug }, '✏️ Post actualizado');
  return post;
}

/**
 * Elimina un post (admin).
 */
export async function deletePost(id: string) {
  const post = await prisma.post.delete({ where: { id } });
  logger.info({ postId: id }, '🗑️ Post eliminado');
  return post;
}

/**
 * Cambia el estado publish/draft de un post (admin).
 */
export async function togglePublish(id: string) {
  const current = await prisma.post.findUnique({ where: { id } });
  if (!current) throw new Error('Post no encontrado');

  const newStatus = current.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';

  const post = await prisma.post.update({
    where: { id },
    data: {
      status: newStatus,
      publishedAt: newStatus === 'PUBLISHED' ? new Date() : null,
    },
  });

  logger.info({ postId: id, status: newStatus }, '🔄 Estado de post cambiado');
  return post;
}

/**
 * Marca un post como principal (y desmarca los demás) (admin).
 */
export async function setMainArticle(id: string) {
  // Desmarcar todos
  await prisma.post.updateMany({
    where: { isMainArticle: true },
    data: { isMainArticle: false },
  });

  // Marcar el nuevo
  const post = await prisma.post.update({
    where: { id },
    data: { isMainArticle: true },
  });

  logger.info({ postId: id }, '⭐ Post marcado como principal');
  return post;
}

/**
 * Alterna mostrar/ocultar vistas de un post (admin).
 */
export async function toggleShowViews(id: string) {
  const current = await prisma.post.findUnique({ where: { id } });
  if (!current) throw new Error('Post no encontrado');

  const post = await prisma.post.update({
    where: { id },
    data: { showViews: !current.showViews },
  });

  logger.info({ postId: id, showViews: post.showViews }, '👁️ Vistas toggle');
  return post;
}

// ============================================
// COMENTARIOS
// ============================================

/**
 * Lista comentarios aprobados de un post (público).
 */
export async function listApprovedComments(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!post) return [];

  return prisma.postComment.findMany({
    where: {
      postId: post.id,
      isApproved: true,
    },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      authorName: true,
      content: true,
      adminReply: true,
      adminRepliedAt: true,
      createdAt: true,
    },
  });
}

/**
 * Crea un comentario (público) — queda pendiente de moderación.
 */
export async function createComment(slug: string, data: CommentCreateInput) {
  const post = await prisma.post.findUnique({
    where: { slug },
    select: { id: true, status: true },
  });

  if (!post || post.status !== 'PUBLISHED') {
    throw new Error('Post no encontrado');
  }

  const comment = await prisma.postComment.create({
    data: {
      postId: post.id,
      authorName: data.authorName.trim(),
      authorEmail: data.authorEmail.toLowerCase().trim(),
      content: data.content.trim(),
      wantsEmailReply: data.wantsEmailReply,
      isApproved: false,
    },
  });

  logger.info({ commentId: comment.id, postId: post.id }, '💬 Comentario creado (pendiente)');
  return comment;
}

/**
 * Lista TODOS los comentarios (admin).
 */
export async function listAllCommentsAdmin(params: {
  page: number;
  limit: number;
  status?: 'pending' | 'approved' | undefined;
}) {
  const { page, limit, status } = params;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (status === 'pending') where.isApproved = false;
  if (status === 'approved') where.isApproved = true;

  const [comments, total] = await Promise.all([
    prisma.postComment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        post: {
          select: { id: true, slug: true, title: true },
        },
      },
    }),
    prisma.postComment.count({ where }),
  ]);

  return {
    data: comments,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Aprueba un comentario (admin).
 */
export async function approveComment(id: string) {
  const comment = await prisma.postComment.update({
    where: { id },
    data: {
      isApproved: true,
      approvedAt: new Date(),
    },
  });

  logger.info({ commentId: id }, '✅ Comentario aprobado');
  return comment;
}

/**
 * Responde a un comentario (admin) — el envío de email se hace en el controller.
 */
export async function replyToComment(id: string, adminReply: string) {
  const comment = await prisma.postComment.update({
    where: { id },
    data: {
      adminReply,
      adminRepliedAt: new Date(),
      isApproved: true, // Aprobar automáticamente al responder
      approvedAt: new Date(),
    },
  });

  logger.info({ commentId: id }, '💌 Respuesta admin guardada');
  return comment;
}

/**
 * Elimina un comentario (admin).
 */
export async function deleteComment(id: string) {
  const comment = await prisma.postComment.delete({ where: { id } });
  logger.info({ commentId: id }, '🗑️ Comentario eliminado');
  return comment;
}