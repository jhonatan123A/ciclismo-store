'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://ciclismo-api.onrender.com/api/v1'
  : 'http://localhost:4000/api/v1';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Si ya está logueado, redirige al panel
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/admin/orders');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Credenciales inválidas');
      }

      // Verificar que sea ADMIN o STORE_MANAGER
      if (data.user.role !== 'ADMIN' && data.user.role !== 'STORE_MANAGER') {
        throw new Error('No tienes permisos para acceder al panel');
      }

      // Guardar en el store
      login(data.token, data.user);

      // Redirigir al panel
      router.push('/admin/orders');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-black">
      {/* Fondo triádico */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#FF5A36]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E8B94A]/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header con logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF5A36]/20 to-[#38BDF8]/20 border border-[#FF5A36]/30 mb-5">
            <Lock className="w-8 h-8 text-[#FF5A36]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            BESTIGE
          </h1>
          <p className="text-eyebrow text-[#FF5A36] tracking-[0.3em] text-[10px]">
            PANEL ADMINISTRATIVO
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF5A36]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-5">
            {/* Email */}
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-white/50 mb-2 flex items-center gap-2">
                <Mail className="w-3 h-3" />
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bestige.com"
                required
                className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 focus:bg-white/[0.04] transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-white/50 mb-2 flex items-center gap-2">
                <Lock className="w-3 h-3" />
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 focus:bg-white/[0.04] transition-all"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/5">
                <p className="text-[11px] text-red-400 text-center">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-full font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF5A36] to-[#C17A4B] text-white hover:shadow-[0_0_40px_rgba(255,90,54,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Ingresando...
                </>
              ) : (
                <>
                  Iniciar sesión
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-[10px] text-white/30 mt-6 tracking-wide">
          © {new Date().getFullYear()} BESTIGE · FITHAB INNOVATION CI SAS
        </p>
      </motion.div>
    </div>
  );
}