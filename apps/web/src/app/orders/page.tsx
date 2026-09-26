'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  Package,
  Loader2,
  MessageCircle,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
} from 'lucide-react';
import { generateOrderWhatsAppLink } from '@/lib/whatsapp';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  subtotal: number;
  shipping: number;
  paymentMethod: string;
  shippingAddress: any;
  createdAt: string;
  items: Array<{
    id: string;
    productName: string;
    productImage: string;
    quantity: number;
    size: string;
    color: string;
    price: number;
    total: number;
  }>;
}

const getStatusInfo = (status: string) => {
  switch (status?.toUpperCase()) {
    case 'PAID':
      return {
        label: 'PAGADO',
        color: '#10B981',
        icon: <CheckCircle className="w-4 h-4" />,
      };
    case 'PENDING':
      return {
        label: 'PENDIENTE',
        color: '#E8B94A',
        icon: <Clock className="w-4 h-4" />,
      };
    case 'SHIPPED':
      return {
        label: 'ENVIADO',
        color: '#38BDF8',
        icon: <Truck className="w-4 h-4" />,
      };
    case 'DELIVERED':
      return {
        label: 'ENTREGADO',
        color: '#10B981',
        icon: <CheckCircle className="w-4 h-4" />,
      };
    case 'CANCELLED':
      return {
        label: 'CANCELADO',
        color: '#EF4444',
        icon: <XCircle className="w-4 h-4" />,
      };
    default:
      return {
        label: status?.toUpperCase() || 'DESCONOCIDO',
        color: '#737373',
        icon: <Clock className="w-4 h-4" />,
      };
  }
};

export default function OrdersPage() {
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Ingresa un correo electrónico válido');
      return;
    }

    setIsLoading(true);
    setError('');
    setOrders([]);

    try {
      const apiUrl = process.env.NODE_ENV === 'production'
        ? 'https://ciclismo-api.onrender.com/api/v1'
        : 'http://localhost:4000/api/v1';

      const response = await fetch(
        `${apiUrl}/orders/history/${encodeURIComponent(email)}`
      );

      if (!response.ok) {
        throw new Error('Error al buscar pedidos');
      }

      const data = await response.json();
      setOrders(data.orders || []);
      setHasSearched(true);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al buscar tus pedidos. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-[#FF5A36]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#E8B94A]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-[#FF5A36] transition-colors mb-10 text-[11px] tracking-[0.2em] uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF5A36]/20 to-[#38BDF8]/20 border border-[#FF5A36]/30 flex items-center justify-center mx-auto mb-5">
            <Package className="w-8 h-8 text-[#FF5A36]" />
          </div>
          <p className="text-eyebrow text-[#FF5A36] mb-3 tracking-[0.3em]">
            HISTORIAL
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Mis Pedidos
          </h1>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Ingresa el correo con el que hiciste tu compra para ver el historial
          </p>
        </div>

        {/* Buscador */}
        <form onSubmit={handleSearch} className="mb-10">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                className="w-full bg-white/[0.02] border border-white/10 rounded-full pl-12 pr-4 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 focus:bg-white/[0.04] transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 btn-orange text-[10px] tracking-[0.2em] uppercase font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  Buscar
                </>
              )}
            </button>
          </div>
          {error && (
            <p className="mt-3 text-red-400 text-xs text-center">{error}</p>
          )}
        </form>

        {/* Resultados */}
        {hasSearched && orders.length === 0 && !isLoading && (
          <div className="p-10 rounded-2xl border border-white/10 bg-white/[0.02] text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-white font-bold text-lg mb-2">
              No encontramos pedidos
            </h3>
            <p className="text-white/50 text-sm">
              No hay pedidos asociados al correo <strong>{email}</strong>
            </p>
          </div>
        )}

        {orders.length > 0 && (
          <div className="space-y-4">
            <p className="text-eyebrow text-white/40 mb-4">
              {orders.length} {orders.length === 1 ? 'pedido encontrado' : 'pedidos encontrados'}
            </p>

            {orders.map((order, index) => {
              const statusInfo = getStatusInfo(order.status);
              const whatsappLink = generateOrderWhatsAppLink({
                orderNumber: order.orderNumber,
                customerName: 'Cliente',
                total: Number(order.total),
                items: order.items.map((item) => ({
                  name: item.productName,
                  quantity: item.quantity,
                  size: item.size,
                  color: item.color,
                })),
              });

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all"
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5 pb-5 border-b border-white/10">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">
                        PEDIDO
                      </p>
                      <p className="text-white font-bold text-sm break-all mb-2">
                        {order.orderNumber}
                      </p>
                      <p className="text-white/40 text-xs">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
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
                    </div>
                  </div>

                  {/* Productos */}
                  <div className="space-y-3 mb-5">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        {item.productImage && (
                          <div className="w-14 h-14 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {item.productName}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-white/40 mt-1 tracking-wider uppercase">
                            {item.size && <span>Talla {item.size}</span>}
                            {item.size && item.color && (
                              <span className="w-1 h-1 bg-[#FF5A36] rounded-full" />
                            )}
                            {item.color && <span>{item.color}</span>}
                            <span className="w-1 h-1 bg-[#FF5A36] rounded-full" />
                            <span>x{item.quantity}</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-white font-semibold text-sm">
                            ${Number(item.total).toLocaleString('es-CO')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer con totales y acciones */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/10">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">
                        TOTAL
                      </p>
                      <p className="text-[#FF5A36] font-bold text-lg">
                        ${Number(order.total).toLocaleString('es-CO')} COP
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold border border-green-500/30 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Soporte WhatsApp
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}