// ============================================
// TIPOS
// ============================================

export type PostCategory =
  | 'TECNOLOGIA'
  | 'GUIAS'
  | 'HISTORIAS'
  | 'COMPARATIVAS'
  | 'NOTICIAS'
  | 'CONSEJOS';

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  coverImageAlt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string[];
  category: PostCategory;
  tags: string[];
  authorName: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt: string | null;
  isMainArticle: boolean;
  videoUrl: string | null;
  readingTime: number | null;
  views: number;
  showViews: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PostListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  coverImageAlt: string | null;
  category: PostCategory;
  tags: string[];
  authorName: string;
  readingTime: number | null;
  views: number;
  showViews: boolean;
  isMainArticle: boolean;
  publishedAt: string | null;
  createdAt: string;
}

export interface PostComment {
  id: string;
  authorName: string;
  content: string;
  adminReply: string | null;
  adminRepliedAt: string | null;
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PostListResponse {
  data: PostListItem[];
  pagination: Pagination;
}

export interface CreateCommentPayload {
  authorName: string;
  authorEmail: string;
  content: string;
  wantsEmailReply: boolean;
}

// ============================================
// CONFIG
// ============================================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// ============================================
// HELPERS
// ============================================

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => '');
    throw new Error(
      `API error ${res.status}: ${errorBody || res.statusText}`
    );
  }

  return res.json() as Promise<T>;
}

// ============================================
// POSTS — PÚBLICOS
// ============================================

/**
 * Lista posts publicados con paginación y filtros.
 */
export async function listPosts(params: {
  page?: number;
  limit?: number;
  category?: PostCategory;
  search?: string;
  tag?: string;
} = {}): Promise<PostListResponse> {
  const search = new URLSearchParams();

  if (params.page) search.set('page', String(params.page));
  if (params.limit) search.set('limit', String(params.limit));
  if (params.category) search.set('category', params.category);
  if (params.search) search.set('search', params.search);
  if (params.tag) search.set('tag', params.tag);

  const query = search.toString();
  return apiFetch<PostListResponse>(`/api/v1/posts${query ? `?${query}` : ''}`);
}

/**
 * Obtiene el artículo principal.
 */
export async function getMainArticle(): Promise<Post | null> {
  const res = await apiFetch<{ data: Post | null }>('/api/v1/posts/main');
  return res.data;
}

/**
 * Obtiene un post por slug.
 * @param countView Si es `false`, NO incrementa el contador de vistas.
 */
export async function getPostBySlug(
  slug: string,
  options: { countView?: boolean } = {}
): Promise<Post | null> {
  const query = options.countView === false ? '?view=false' : '';
  try {
    const res = await apiFetch<{ data: Post }>(
      `/api/v1/posts/slug/${encodeURIComponent(slug)}${query}`
    );
    return res.data;
  } catch (error: any) {
    // Si es 404, devolvemos null en lugar de lanzar
    if (error?.message?.includes('404')) return null;
    throw error;
  }
}

/**
 * Obtiene posts relacionados.
 */
export async function getRelatedPosts(
  slug: string,
  limit = 3
): Promise<PostListItem[]> {
  const res = await apiFetch<{ data: PostListItem[] }>(
    `/api/v1/posts/related/${encodeURIComponent(slug)}?limit=${limit}`
  );
  return res.data;
}

// ============================================
// COMENTARIOS — PÚBLICOS
// ============================================

/**
 * Lista comentarios aprobados de un post.
 */
export async function listComments(slug: string): Promise<PostComment[]> {
  const res = await apiFetch<{ data: PostComment[] }>(
    `/api/v1/posts/${encodeURIComponent(slug)}/comments`
  );
  return res.data;
}

/**
 * Envía un comentario (queda pendiente de moderación).
 */
export async function createComment(
  slug: string,
  data: CreateCommentPayload
): Promise<{ success: boolean; message: string; data: { id: string } }> {
  return apiFetch(`/api/v1/posts/${encodeURIComponent(slug)}/comment`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ============================================
// UTILS
// ============================================

/**
 * Formatea una fecha en formato legible.
 */
export function formatPostDate(dateString: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Nombre legible de la categoría.
 */
export function getCategoryLabel(category: PostCategory): string {
  const labels: Record<PostCategory, string> = {
    TECNOLOGIA: 'Tecnología',
    GUIAS: 'Guías',
    HISTORIAS: 'Historias',
    COMPARATIVAS: 'Comparativas',
    NOTICIAS: 'Noticias',
    CONSEJOS: 'Consejos',
  };
  return labels[category] || category;
}