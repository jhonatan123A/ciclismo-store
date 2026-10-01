/**
 * Store de autenticación para el panel de admin.
 * Guarda el JWT en localStorage para persistir la sesión.
 *
 * ⚠️ Solo se usa en el panel /admin. Los clientes NO usan login.
 */

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthStore {
  token: string | null;
  user: AdminUser | null;
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      login: (token, user) => {
        set({ token, user });
      },

      logout: () => {
        set({ token: null, user: null });
      },

      isAuthenticated: () => {
        const { token, user } = get();
        return !!token && !!user && user.role === 'ADMIN';
      },
    }),
    {
      name: 'bestige-admin-auth',
    }
  )
);