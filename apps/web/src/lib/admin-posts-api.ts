import { useAuthStore } from './auth-store';
import type {
  Post,
  PostCategory,
  PostComment,
  Pagination,
} from './posts-api';

// ============================================
// CONFIG
// ============================================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// ============================================
// HELPER: FETCH CON AUTH
// ============================================

async function adminFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  // Zustand store: obtenemos el token del estado global
  const store = useAuthStore.getState();
  const token = (store as any).token || (store as any).accessToken;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
// TIPOS
// ============================================

export interface AdminPostListResponse {
  data: Post[];
  pagination: Pagination;
}

export interface AdminComment extends PostComment {
  postId: string;
  authorEmail: string;
  isApproved: boolean;
  approvedAt: string | null;
  wantsEmailReply: boolean;
  post: {
    id: string;
    slug: string;
    title: string;
  };
}

export interface AdminCommentsListResponse {
  data: AdminComment[];
  pagination: Pagination;
}

export interface CreatePostPayload {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  coverImageAlt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string[];
  category?: PostCategory;
  tags?: string[];
  authorName?: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  isMainArticle?: boolean;
  videoUrl?: string | null;
  showViews?: boolean;
}

export type UpdatePostPayload = Partial<CreatePostPayload>;

export interface PostsListFilters {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  search?: string;
}

// ============================================
// POSTS — ADMIN
// ============================================

export async function fetchAdminPosts(
  filters: PostsListFilters = {}
): Promise<AdminPostListResponse> {
  const params = new URLSearchParams();
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters.status && filters.status !== 'ALL')
    params.set('status', filters.status);
  if (filters.category) params.set('category', filters.category);
  if (filters.search) params.set('search', filters.search);

  const qs = params.toString();
  return adminFetch<AdminPostListResponse>(
    `/api/v1/posts/admin/list${qs ? `?${qs}` : ''}`
  );
}

export async function fetchAdminPostById(id: string): Promise<Post> {
  const res = await adminFetch<{ data: Post }>(
    `/api/v1/posts/admin/${id}`
  );
  return res.data;
}

export async function createAdminPost(
  payload: CreatePostPayload
): Promise<Post> {
  const res = await adminFetch<{ data: Post }>('/api/v1/posts/admin', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function updateAdminPost(
  id: string,
  payload: UpdatePostPayload
): Promise<Post> {
  const res = await adminFetch<{ data: Post }>(
    `/api/v1/posts/admin/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    }
  );
  return res.data;
}

export async function deleteAdminPost(id: string): Promise<void> {
  await adminFetch(`/api/v1/posts/admin/${id}`, {
    method: 'DELETE',
  });
}

export async function togglePublishPost(id: string): Promise<Post> {
  const res = await adminFetch<{ data: Post }>(
    `/api/v1/posts/admin/${id}/publish`,
    { method: 'PATCH' }
  );
  return res.data;
}

export async function setMainArticle(id: string): Promise<Post> {
  const res = await adminFetch<{ data: Post }>(
    `/api/v1/posts/admin/${id}/main`,
    { method: 'PATCH' }
  );
  return res.data;
}

export async function toggleShowViews(id: string): Promise<Post> {
  const res = await adminFetch<{ data: Post }>(
    `/api/v1/posts/admin/${id}/show-views`,
    { method: 'PATCH' }
  );
  return res.data;
}

// ============================================
// COMENTARIOS — ADMIN
// ============================================

export async function fetchAdminComments(
  filters: { page?: number; limit?: number; status?: 'pending' | 'approved' } = {}
): Promise<AdminCommentsListResponse> {
  const params = new URLSearchParams();
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters.status) params.set('status', filters.status);

  const qs = params.toString();
  return adminFetch<AdminCommentsListResponse>(
    `/api/v1/posts/admin/comments/list${qs ? `?${qs}` : ''}`
  );
}

export async function approveAdminComment(id: string): Promise<AdminComment> {
  const res = await adminFetch<{ data: AdminComment }>(
    `/api/v1/posts/admin/comments/${id}/approve`,
    { method: 'PATCH' }
  );
  return res.data;
}

export async function replyToAdminComment(
  id: string,
  adminReply: string
): Promise<AdminComment> {
  const res = await adminFetch<{ data: AdminComment }>(
    `/api/v1/posts/admin/comments/${id}/reply`,
    {
      method: 'POST',
      body: JSON.stringify({ adminReply }),
    }
  );
  return res.data;
}

export async function deleteAdminComment(id: string): Promise<void> {
  await adminFetch(`/api/v1/posts/admin/comments/${id}`, {
    method: 'DELETE',
  });
}