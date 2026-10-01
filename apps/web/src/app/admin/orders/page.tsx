'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Package,
  Search,
  Loader2,
  LogOut,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  FileBox,
  DollarSign,
} from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import {
  fetchOrders,
  fetchStats,
  type AdminOrder,
  type StatsResponse,
  type OrdersListFilters,
} from '@/lib/admin-api';

const getStatusInfo = (status: string) => {
  switch (status?.toUpperCase()) {
    case 'PAID':
      return { label: 'PAGADO', color: '#10B981', icon: <CheckCircle className="w-3.5 h-3.5" /> };
    case 'PENDING':
      return { label: 'PENDIENTE', color: '#E8B94A', icon: <Clock className="w-3.5 h-3.5" /> };
    case 'PROCESSING':
      return { label: 'PREPARANDO', color: '#E8B94A', icon: <FileBox className="w-3.5 h-3.5" /> };
    case 'SHIPPED':
      return { label: 'ENVIADO', color: '#38BDF8', icon: <Truck className="w-3.5 h-3.5" /> };
    case 'DELIVERED':
      return { label: 'ENTREGADO', color: '#10B981', icon: <CheckCircle className="w-3.5 h-3.5" /> };
    case 'CANCELLED':
      return { label: 'CANCELADO', color: '#EF4444', icon: <XCircle className="w-3.5 h-3.5" /> };
    default:
      return { label: status?.toUpperCase() || 'DESCONOCIDO', color: '#737373', icon: <Clock className="w-3.5 h-3.5" /> };
  }
};

function OrdersContent() {
  const router = useRouter();
  const { user, token, logout, isAuthenticated } = useAuthStore();

  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState<OrdersListFilters>({
    page: 1,
    limit: 15,
    status: 'ALL',
    search: '',
  });

  const [searchInput, setSearchInput] = useState('');
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 15, totalPages: 1 });

  // Verificar auth
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  // Cargar stats una sola vez
  useEffect(() => {
    if (!isAuthenticated()) return;
    fetchStats()
      .then(setStats)
      .catch((err) => console.error('Error stats:', err));
  }, [isAuthenticated]);

  // Cargar pedidos cuando cambian los filtros
  useEffect(() => {
    if (!isAuthenticated()) return;

    setIsLoading(true);
    setError('');

    fetchOrders(filters)
      .then((data) => {
        setOrders(data.orders);
        setPagination({
          total: data.total,
          page: data.page,
          limit: data.limit,
          totalPages: data.totalPages,
        });
      })
      .catch((err) => {
        console.error('Error orders:', err);
        setError(err.message || 'Error al cargar pedidos');
      })
      .finally(() => setIsLoading(false));
  }, [filters, isAuthenticated]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: searchInput, page: 1 }));
  };

  const handleStatusChange = (status: string) => {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const formatMoney = (n: number) => `$${n.toLocaleString('es-CO')}`;

  const statuses = ['ALL', 'PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5A36] to-[#C17A4B] flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight">BESTIGE ADMIN</h1>
              <p className="text-[10px] text-white/40 tracking-wider">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase text-white/60 hover:text-white border border-white/10 hover:border-[#FF5A36]/40 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Salir
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Dashboard stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#FF5A36]/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
                  <DollarSign className="w-3 h-3" />
                  Ventas del mes
                </div>
                <p className="text-white font-bold text-xl">{formatMoney(stats.monthSales)}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#38BDF8]/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
                  <Package className="w-3 h-3" />
                  Total pedidos
                </div>
                <p className="text-white font-bold text-xl">{stats.totalOrders}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#10B981]/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
                  <CheckCircle className="w-3 h-3" />
                  Pagados
                </div>
                <p className="text-white font-bold text-xl">{stats.paidOrders}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#E8B94A]/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
                  <Clock className="w-3 h-3" />
                  Pendientes
                </div>
                <p className="text-white font-bold text-xl">{stats.pendingOrders}</p>
              </div>
            </motion.div>
          </div>
        )}

        {/* Búsqueda */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Buscar por pedido, email, cédula, guía..."
                className="w-full bg-white/[0.02] border border-white/10 rounded-full pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 focus:bg-white/[0.04] transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold border border-white/10 transition-all"
            >
              Buscar
            </button>
          </div>
        </form>

        {/* Filtros de estado */}
        <div className="flex flex-wrap gap-2 mb-6">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              className={`
                px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all
                ${filters.status === s
                  ? 'bg-[#FF5A36] text-white shadow-[0_0_20px_rgba(255,90,54,0.3)]'
                  : 'text-white/50 hover:text-white border border-white/10 hover:border-white/30'}
              `}
            >
              {s === 'ALL' ? 'Todos' : getStatusInfo(s).label}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5 mb-6">
            <p className="text-[12px] text-red-400 text-center">{error}</p>
          </div>
        )}

        {/* Lista */}
        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#FF5A36]" />
          </div>
        ) : orders.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-white/60">No hay pedidos con estos filtros</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {orders.map((order, i) => {
                const statusInfo = getStatusInfo(order.status);
                const customerName = order.metadata?.customerName || 'Cliente';
                const customerEmail = order.metadata?.customerEmail || '—';
                const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                  >
                    {/* ✅ CAMBIO: usa query string en lugar de ruta con [id] */}
                    <Link
                      href={`/admin/orders/detail?orderId=${order.id}`}
                      className="block p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#FF5A36]/30 hover:bg-white/[0.04] transition-all"
                    >
                      <div className="flex flex-wrap items-center gap-4">
                        {/* Pedido */}
                        <div className="flex-1 min-w-[200px]">
                          <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1">
                            Pedido
                          </p>
                          <p className="text-white font-bold text-sm break-all">
                            {order.orderNumber}
                          </p>
                          <p className="text-white/40 text-[11px] mt-1">{formatDate(order.createdAt)}</p>
                        </div>

                        {/* Cliente */}
                        <div className="flex-1 min-w-[180px]">
                          <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1">
                            Cliente
                          </p>
                          <p className="text-white text-sm">{customerName}</p>
                          <p className="text-white/40 text-[11px] mt-1 break-all">{customerEmail}</p>
                        </div>

                        {/* Items */}
                        <div className="min-w-[80px]">
                          <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1">
                            Items
                          </p>
                          <p className="text-white text-sm">{itemCount}</p>
                        </div>

                        {/* Total */}
                        <div className="min-w-[120px]">
                          <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1">
                            Total
                          </p>
                          <p className="text-[#FF5A36] font-bold text-sm">{formatMoney(order.total)}</p>
                        </div>

                        {/* Estado */}
                        <div className="min-w-[120px]">
                          <span
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold border"
                            style={{
                              color: statusInfo.color,
                              backgroundColor: `${statusInfo.color}15`,
                              borderColor: `${statusInfo.color}40`,
                            }}
                          >
                            {statusInfo.icon}
                            {statusInfo.label}
                          </span>
                          {order.trackingNumber && (
                            <p className="text-[10px] text-white/40 mt-1 font-mono">
                              🚚 {order.trackingNumber}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <p className="text-[11px] text-white/40">
                Mostrando {orders.length} de {pagination.total} pedidos
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, page: Math.max(1, (prev.page || 1) - 1) }))
                  }
                  disabled={pagination.page <= 1}
                  className="p-2 rounded-lg border border-white/10 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] text-white/60 min-w-[80px] text-center">
                  {pagination.page} / {pagination.totalPages || 1}
                </span>
                <button
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      page: Math.min(pagination.totalPages, (prev.page || 1) + 1),
                    }))
                  }
                  disabled={pagination.page >= pagination.totalPages}
                  className="p-2 rounded-lg border border-white/10 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF5A36]" />
        </div>
      }
    >
      <OrdersContent />
    </Suspense>
  );
}