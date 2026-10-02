/**
 * Cliente HTTP para el sistema de reviews.
 * Es público (no requiere autenticación para leer/crear).
 * Solo para admin: listar todas, borrar, togglear.
 */

'use client';

import { useAuthStore } from './auth-store';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://ciclismo-api.onrender.com/api/v1'
  : 'http://localhost:4000/api/v1';

// ============================================
// TIPOS
// ============================================

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  // ✅ NUEVO: foto + link Instagram (opcionales)
  photoUrl?: string | null;
  instagramUrl?: string | null;
  createdAt: string;
  // Solo cuando es admin:
  authorEmail?: string;
  productId?: string;
  isApproved?: boolean;
  product?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface RatingStats {
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

export interface ProductReviewsResponse {
  success: boolean;
  reviews: Review[];
  stats: RatingStats;
}

export interface CreateReviewData {
  productId: string;
  authorName: string;
  authorEmail: string;
  rating: number;
  comment: string;
  // ✅ NUEVO: opcionales
  photoUrl?: string;
  instagramUrl?: string;
}

// ============================================
// ENDPOINTS PÚBLICOS
// ============================================

/**
 * Obtiene las reviews y estadísticas de un producto.
 */
export async function fetchProductReviews(productId: string): Promise<ProductReviewsResponse> {
  const response = await fetch(`${API_URL}/reviews/product/${encodeURIComponent(productId)}`);

  if (!response.ok) {
    throw new Error('Error al cargar reviews');
  }

  return response.json();
}

/**
 * ✅ NUEVO: Sube una foto de review a Cloudinary (vía backend).
 * Devuelve la URL pública de la imagen.
 */
export async function uploadReviewPhoto(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('photo', file);

  const response = await fetch(`${API_URL}/reviews/upload`, {
    method: 'POST',
    // ⚠️ NO poner 'Content-Type' — multer lo detecta automáticamente
    body: formData,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Error al subir la imagen');
  }

  return json.photoUrl;
}

/**
 * Crea una nueva review.
 */
export async function createReview(data: CreateReviewData): Promise<{ success: boolean; review: Review }> {
  const response = await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Error al crear la review');
  }

  return json;
}

// ============================================
// ENDPOINTS DE ADMIN
// ============================================

async function adminFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error('No autenticado');
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (response.status === 401) {
    useAuthStore.getState().logout();
    throw new Error('Sesión expirada');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Error ${response.status}`);
  }

  return data as T;
}

/**
 * Lista TODAS las reviews (incluidas las no aprobadas). Solo admin.
 */
export async function fetchAllReviewsAdmin(): Promise<{ success: boolean; reviews: Review[] }> {
  return adminFetch('/reviews/admin/all');
}

/**
 * Borra una review. Solo admin.
 */
export async function deleteReviewAdmin(id: string): Promise<{ success: boolean }> {
  return adminFetch(`/reviews/admin/${id}`, { method: 'DELETE' });
}

/**
 * Cambia el estado de aprobación de una review. Solo admin.
 */
export async function toggleReviewApprovalAdmin(id: string): Promise<{ success: boolean; review: Review }> {
  return adminFetch(`/reviews/admin/${id}/toggle`, { method: 'PATCH' });
}