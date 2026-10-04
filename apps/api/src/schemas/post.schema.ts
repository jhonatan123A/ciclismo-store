import { z } from 'zod';

// ============================================
// CATEGORÍAS (deben coincidir con el enum de Prisma)
// ============================================

export const postCategoryEnum = z.enum([
  'TECNOLOGIA',
  'GUIAS',
  'HISTORIAS',
  'COMPARATIVAS',
  'NOTICIAS',
  'CONSEJOS',
]);

// ============================================
// POSTS
// ============================================

export const postCreateSchema = z.object({
  title: z.string().min(5).max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, {
    message: 'El slug solo puede contener letras minúsculas, números y guiones',
  }),
  excerpt: z.string().min(20).max(500),
  content: z.string().min(100),

  coverImage: z.string().url().optional().nullable(),
  coverImageAlt: z.string().max(200).optional().nullable(),

  metaTitle: z.string().max(200).optional().nullable(),
  metaDescription: z.string().max(500).optional().nullable(),
  keywords: z.array(z.string()).default([]),

  category: postCategoryEnum.default('TECNOLOGIA'),
  tags: z.array(z.string()).default([]),

  authorName: z.string().max(100).default('Equipo BESTIGE'),

  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  isMainArticle: z.boolean().default(false),

  videoUrl: z.string().url().optional().nullable(),

  readingTime: z.number().int().positive().optional().nullable(),
  showViews: z.boolean().default(false),
});

export const postUpdateSchema = postCreateSchema.partial();

export type PostCreateInput = z.infer<typeof postCreateSchema>;
export type PostUpdateInput = z.infer<typeof postUpdateSchema>;

// ============================================
// COMENTARIOS
// ============================================

export const commentCreateSchema = z.object({
  authorName: z.string().min(2).max(100),
  authorEmail: z.string().email().max(200),
  content: z.string().min(10).max(2000),
  wantsEmailReply: z.boolean().default(false),
});

export const commentReplySchema = z.object({
  adminReply: z.string().min(5).max(2000),
});

export type CommentCreateInput = z.infer<typeof commentCreateSchema>;
export type CommentReplyInput = z.infer<typeof commentReplySchema>;

// ============================================
// QUERIES
// ============================================

export const postListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(12),
  category: postCategoryEnum.optional(),
  search: z.string().max(200).optional(),
  tag: z.string().max(50).optional(),
});