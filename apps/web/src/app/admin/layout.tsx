'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Package,
  Star,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';

const NAV_ITEMS = [
  { href: '/admin/orders', label: 'Pedidos', icon: Package },
  { href: '/admin/reviews', label: 'Reseñas', icon: Star },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Si estamos en /admin/login, no mostrar el sidebar
  const isLoginPage = pathname === '/admin/login';

  // Verificar autenticación en páginas protegidas
  useEffect(() => {
    if (!isLoginPage && !isAuthenticated()) {
      router.push('/admin/login');
    }
  }, [pathname, isLoginPage, isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  // Si es la página de login, solo renderizar children
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Si no está autenticado, no renderizar nada (el useEffect lo redirige)
  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-white/10 bg-black/60 backdrop-blur sticky top-0 h-screen flex flex-col">
        {/* Logo / Header */}
        <div className="p-6 border-b border-white/10">
          <Link href="/admin/orders" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF5A36] to-[#C17A4B] flex items-center justify-center shadow-[0_0_20px_rgba(255,90,54,0.3)]">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight text-white">BESTIGE</p>
              <p className="text-[9px] text-white/40 tracking-[0.2em] uppercase">Admin</p>
            </div>
          </Link>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] tracking-[0.1em] uppercase font-semibold transition-all
                  ${isActive
                    ? 'bg-[#FF5A36]/10 text-[#FF5A36] border border-[#FF5A36]/30'
                    : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'}
                `}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer: usuario + logout */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="px-2">
            <p className="text-[9px] tracking-[0.15em] uppercase text-white/30 mb-1">
              Sesión activa
            </p>
            <p className="text-xs text-white/70 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[10px] tracking-[0.15em] uppercase font-semibold text-white/50 hover:text-white hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}