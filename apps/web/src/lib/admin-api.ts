/**
 * Cliente HTTP para el panel de admin.
 * Adjunta automáticamente el JWT del auth-store en cada llamada.
 *
 * ⚠️ Solo se usa en el panel /admin.
 */

'use client';

import { useAuthStore } from './auth-store';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://ciclismo-api.onrender.com/api/v1'
  : 'http://localhost:4000/api/v1';

/**
 * Función interna que hace fetch con el token adjunto.
 * Si el backend devuelve 401, cierra sesión automáticamente.
 */
async function adminFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
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

  // Si el token expiró, forzar logout
  if (response.status === 401) {
    useAuthStore.getState().logout();
    throw new Error('Sesión expirada. Inicia sesión nuevamente.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Error ${response.status}`);
  }

  return data as T;
}

// ============================================
// TIPOS
// ============================================

export interface AdminOrderItem {
  id: string;
  productId: string | null;
  productName: string | null;
  productImage: string | null;
  quantity: number;
  price: number;
  total: number;
  size: string | null;
  color: string | null;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  paymentId: string | null;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  trackingNumber: string | null;
  accessToken: string | null;
  accessTokenExp: string | null;
  shippingAddress: any;
  billingAddress: any;
  metadata: {
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    documentType?: string;
    documentId?: string;
    personType?: string;
    taxRegime?: string;
    [key: string]: any;
  };
  items: AdminOrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrdersListResponse {
  orders: AdminOrder[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface StatsResponse {
  totalOrders: number;
  paidOrders: number;
  pendingOrders: number;
  shippedOrders: number;
  monthSales: number;
  todaySales: number;
  recentOrders: AdminOrder[];
}

export interface OrdersListFilters {
  status?: string;
  search?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

// ============================================
// FUNCIONES DE API
// ============================================

/**
 * Obtiene la lista de pedidos con filtros y paginación.
 */
export async function fetchOrders(
  filters: OrdersListFilters = {}
): Promise<OrdersListResponse> {
  const params = new URLSearchParams();

  if (filters.status) params.append('status', filters.status);
  if (filters.search) params.append('search', filters.search);
  if (filters.from) params.append('from', filters.from);
  if (filters.to) params.append('to', filters.to);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const query = params.toString();
  const endpoint = `/orders/admin/list${query ? `?${query}` : ''}`;

  return adminFetch<OrdersListResponse>(endpoint);
}

/**
 * Obtiene las estadísticas del dashboard.
 */
export async function fetchStats(): Promise<StatsResponse> {
  return adminFetch<StatsResponse>('/orders/admin/stats');
}

/**
 * Obtiene el detalle de un pedido por ID.
 * Usa el endpoint /:id existente.
 */
export async function fetchOrderById(id: string): Promise<AdminOrder> {
  return adminFetch<AdminOrder>(`/orders/${id}`);
}

/**
 * Cambia el estado de un pedido.
 */
export async function updateOrderStatus(
  orderId: string,
  status: string
): Promise<{ success: boolean; order: AdminOrder }> {
  return adminFetch(`/orders/admin/${orderId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

/**
 * Actualiza el número de guía de un pedido.
 */
export async function updateOrderTracking(
  orderId: string,
  trackingNumber: string
): Promise<{ success: boolean; order: AdminOrder }> {
  return adminFetch(`/orders/admin/${orderId}/tracking`, {
    method: 'PATCH',
    body: JSON.stringify({ trackingNumber }),
  });
}