'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Loader2,
  User,
  MapPin,
  Truck,
  Save,
  Check,
  XCircle,
  Clock,
  CheckCircle,
  FileBox,
} from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import {
  fetchOrderById,
  updateOrderStatus,
  updateOrderTracking,
  type AdminOrder,
} from '@/lib/admin-api';

const STATUSES = [
  { value: 'PENDING', label: 'Pendiente', color: '#E8B94A', icon: <Clock className="w-4 h-4" /> },
  { value: 'PAID', label: 'Pagado', color: '#10B981', icon: <CheckCircle className="w-4 h-4" /> },
  { value: 'PROCESSING', label: 'Preparando', color: '#E8B94A', icon: <FileBox className="w-4 h-4" /> },
  { value: 'SHIPPED', label: 'Enviado', color: '#38BDF8', icon: <Truck className="w-4 h-4" /> },
  { value: 'DELIVERED', label: 'Entregado', color: '#10B981', icon: <CheckCircle className="w-4 h-4" /> },
  { value: 'CANCELLED', label: 'Cancelado', color: '#EF4444', icon: <XCircle className="w-4 h-4" /> },
];

const getStatusInfo = (status: string) =>
  STATUSES.find((s) => s.value === status) || STATUSES[0];

function DetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '';

  const { isAuthenticated } = useAuthStore();

  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [newStatus, setNewStatus] = useState('');
  const [newTracking, setNewTracking] = useState('');
  const [isSavingStatus, setIsSavingStatus] = useState(false);
  const [isSavingTracking, setIsSavingTracking] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!orderId || !isAuthenticated()) return;

    setIsLoading(true);
    fetchOrderById(orderId)
      .then((data) => {
        setOrder(data);
        setNewStatus(data.status);
        setNewTracking(data.trackingNumber || '');
      })
      .catch((err) => setError(err.message || 'Error al cargar el pedido'))
      .finally(() => setIsLoading(false));
  }, [orderId, isAuthenticated]);

  const handleSaveStatus = async () => {
    if (!order || newStatus === order.status) return;

    setIsSavingStatus(true);
    setError('');
    try {
      const result = await updateOrderStatus(order.id, newStatus);
      setOrder(result.order);
      setSuccessMsg('Estado actualizado correctamente');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cambiar estado');
    } finally {
      setIsSavingStatus(false);
    }
  };

  const handleSaveTracking = async () => {
    if (!order || newTracking === (order.trackingNumber || '')) return;

    setIsSavingTracking(true);
    setError('');
    try {
      const result = await updateOrderTracking(order.id, newTracking);
      setOrder(result.order);
      setSuccessMsg('Número de guía actualizado');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar guía');
    } finally {
      setIsSavingTracking(false);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const formatMoney = (n: number) => `$${n.toLocaleString('es-CO')}`;

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF5A36]" />
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto pt-20 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Error</h1>
          <p className="text-white/60 mb-6">{error}</p>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5A36] text-white rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver a pedidos
          </Link>
        </div>
      </div>
    );
  }

  if (!order) return null;

  const statusInfo = getStatusInfo(order.status);
  const meta = order.metadata || {};

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-2 text-white/50 hover:text-[#FF5A36] transition-colors text-[11px] tracking-[0.2em] uppercase mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Volver a pedidos
      </Link>

      {/* Título */}
      <div className="mb-8">
        <p className="text-[#FF5A36] mb-2 tracking-[0.3em] text-[10px]">
          DETALLE DEL PEDIDO
        </p>
        <h1 className="text-2xl md:text-3xl font-bold break-all mb-2">{order.orderNumber}</h1>
        <div className="flex flex-wrap items-center gap-3 text-white/50 text-xs">
          <span>{formatDate(order.createdAt)}</span>
          <span className="w-1 h-1 bg-white/30 rounded-full" />
          <span>Método: {order.paymentMethod.toUpperCase()}</span>
        </div>
      </div>

      {successMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl border border-[#10B981]/30 bg-[#10B981]/5 flex items-center gap-3"
        >
          <Check className="w-4 h-4 text-[#10B981]" />
          <p className="text-[12px] text-[#10B981]">{successMsg}</p>
        </motion.div>
      )}

      {error && order && (
        <div className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/5">
          <p className="text-[12px] text-red-400">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white">Estado del pedido</h2>
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

            <div className="flex flex-col md:flex-row gap-3">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="flex-1 bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF5A36]/50"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value} className="bg-[#0A0A0A]">
                    {s.label}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSaveStatus}
                disabled={isSavingStatus || newStatus === order.status}
                className="px-6 py-3 bg-gradient-to-r from-[#FF5A36] to-[#C17A4B] rounded-lg text-[10px] tracking-[0.15em] uppercase font-semibold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
              >
                {isSavingStatus ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                Guardar estado
              </button>
            </div>

            <p className="text-[10px] text-white/40 mt-3">
              Al cambiar el estado, el cliente recibirá un email automático.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-4 h-4 text-[#38BDF8]" />
              <h2 className="text-sm font-bold text-white">Número de guía</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={newTracking}
                onChange={(e) => setNewTracking(e.target.value)}
                placeholder="Ej: 1234567890"
                className="flex-1 bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#38BDF8]/50 font-mono"
              />
              <button
                onClick={handleSaveTracking}
                disabled={isSavingTracking || newTracking === (order.trackingNumber || '')}
                className="px-6 py-3 bg-gradient-to-r from-[#38BDF8] to-[#E8B94A] rounded-lg text-[10px] tracking-[0.15em] uppercase font-semibold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all text-black"
              >
                {isSavingTracking ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                Guardar guía
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h2 className="text-sm font-bold text-white mb-4">Productos</h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center py-3 border-b border-white/5 last:border-0">
                  {item.productImage && (
                    <div className="w-14 h-14 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                      <img
                        src={item.productImage}
                        alt={item.productName || 'Producto'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">
                      {item.productName || 'Producto'}
                    </p>
                    <p className="text-white/40 text-[10px] mt-1 uppercase tracking-wider">
                      {item.size && `Talla ${item.size} · `}
                      {item.color && `${item.color} · `}x{item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm font-semibold">
                      {formatMoney(item.total)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-sm">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>{formatMoney(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Envío</span>
                <span>{order.shipping === 0 ? 'GRATIS' : formatMoney(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-lg pt-3 border-t border-white/10">
                <span>Total</span>
                <span className="text-[#FF5A36]">{formatMoney(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-[#FF5A36]" />
              Cliente
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase mb-1">Nombre</p>
                <p className="text-white">{meta.customerName || '—'}</p>
              </div>
              <div>
                <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase mb-1">Email</p>
                <p className="text-white break-all">{meta.customerEmail || '—'}</p>
              </div>
              <div>
                <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase mb-1">Teléfono</p>
                <p className="text-white">{meta.customerPhone || '—'}</p>
              </div>
              {meta.documentType && (
                <div>
                  <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase mb-1">Documento</p>
                  <p className="text-white">
                    {meta.documentType} {meta.documentId}
                  </p>
                </div>
              )}
              {meta.personType && (
                <div>
                  <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase mb-1">Tipo persona</p>
                  <p className="text-white">
                    {meta.personType === 'NATURAL' ? 'Persona Natural' : 'Persona Jurídica'}
                  </p>
                </div>
              )}
              {meta.taxRegime && (
                <div>
                  <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase mb-1">Régimen</p>
                  <p className="text-white">
                    {meta.taxRegime === 'NO_RESPONSABLE' ? 'No resp. IVA' :
                     meta.taxRegime === 'RESPONSABLE' ? 'Resp. IVA' :
                     meta.taxRegime === 'SIMPLE' ? 'Régimen Simple' : meta.taxRegime}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#38BDF8]" />
              Dirección de envío
            </h2>
            <div className="text-xs text-white/80 space-y-1">
              {order.shippingAddress?.address && <p>{order.shippingAddress.address}</p>}
              {order.shippingAddress?.neighborhood && (
                <p className="text-white/60">Barrio: {order.shippingAddress.neighborhood}</p>
              )}
              <p className="text-white/60">
                {order.shippingAddress?.city}, {order.shippingAddress?.department}
              </p>
              {order.shippingAddress?.zipCode && (
                <p className="text-white/40">CP: {order.shippingAddress.zipCode}</p>
              )}
              {order.shippingAddress?.references && (
                <p className="text-white/50 italic mt-2 text-[11px]">
                  Ref: {order.shippingAddress.references}
                </p>
              )}
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h2 className="text-sm font-bold text-white mb-4">Acciones rápidas</h2>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setNewStatus('SHIPPED');
                  setTimeout(handleSaveStatus, 100);
                }}
                disabled={order.status === 'SHIPPED'}
                className="w-full py-2.5 rounded-lg text-[10px] tracking-[0.15em] uppercase font-semibold border border-[#38BDF8]/30 text-[#38BDF8] hover:bg-[#38BDF8]/10 disabled:opacity-30 transition-all"
              >
                Marcar como enviado
              </button>
              <button
                onClick={() => {
                  setNewStatus('DELIVERED');
                  setTimeout(handleSaveStatus, 100);
                }}
                disabled={order.status === 'DELIVERED'}
                className="w-full py-2.5 rounded-lg text-[10px] tracking-[0.15em] uppercase font-semibold border border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/10 disabled:opacity-30 transition-all"
              >
                Marcar como entregado
              </button>
              <button
                onClick={() => {
                  if (confirm('¿Cancelar este pedido?')) {
                    setNewStatus('CANCELLED');
                    setTimeout(handleSaveStatus, 100);
                  }
                }}
                disabled={order.status === 'CANCELLED'}
                className="w-full py-2.5 rounded-lg text-[10px] tracking-[0.15em] uppercase font-semibold border border-red-500/30 text-red-400 hover:bg-red-500/10 disabled:opacity-30 transition-all"
              >
                Cancelar pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminOrderDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF5A36]" />
        </div>
      }
    >
      <DetailContent />
    </Suspense>
  );
}