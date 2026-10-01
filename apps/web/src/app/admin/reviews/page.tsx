'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Loader2,
  Trash2,
  Eye,
  EyeOff,
  User,
  Package,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import {
  fetchAllReviews,
  deleteReview,
  toggleReviewApproval,
  type AdminReview,
} from '@/lib/admin-api';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= rating
              ? 'fill-[#E8B94A] text-[#E8B94A]'
              : 'text-white/20'
          }`}
        />
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Filtro: todas / aprobadas / ocultas
  const [filter, setFilter] = useState<'all' | 'approved' | 'hidden'>('all');

  const loadReviews = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchAllReviews();
      setReviews(data.reviews);
    } catch (err) {
      console.error('Error cargando reviews:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar reseñas');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleToggle = async (id: string) => {
    try {
      const result = await toggleReviewApproval(id);
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, isApproved: result.review.isApproved } : r))
      );
      setSuccessMsg(result.review.isApproved ? 'Reseña visible' : 'Reseña ocultada');
      setTimeout(() => setSuccessMsg(''), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cambiar estado');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Borrar esta reseña? Esta acción no se puede deshacer.')) return;

    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setSuccessMsg('Reseña eliminada');
      setTimeout(() => setSuccessMsg(''), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al borrar');
      setTimeout(() => setError(''), 3000);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  // Filtrar
  const filteredReviews = reviews.filter((r) => {
    if (filter === 'approved') return r.isApproved;
    if (filter === 'hidden') return !r.isApproved;
    return true;
  });

  // Contadores
  const totalCount = reviews.length;
  const approvedCount = reviews.filter((r) => r.isApproved).length;
  const hiddenCount = reviews.filter((r) => !r.isApproved).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#FF5A36] mb-2">
          Panel de administración
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Reseñas</h1>
        <p className="text-white/50 text-sm mt-2">
          Modera las reseñas de los clientes: aprueba, oculta o elimina.
        </p>
      </div>

      {/* Mensajes */}
      {successMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl border border-[#10B981]/30 bg-[#10B981]/5 flex items-center gap-3"
        >
          <CheckCircle className="w-4 h-4 text-[#10B981]" />
          <p className="text-[12px] text-[#10B981]">{successMsg}</p>
        </motion.div>
      )}
      {error && (
        <div className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/5 flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <p className="text-[12px] text-red-400">{error}</p>
        </div>
      )}

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all ${
            filter === 'all'
              ? 'bg-[#FF5A36] text-white shadow-[0_0_20px_rgba(255,90,54,0.3)]'
              : 'text-white/50 hover:text-white border border-white/10 hover:border-white/30'
          }`}
        >
          Todas ({totalCount})
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all ${
            filter === 'approved'
              ? 'bg-[#10B981] text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
              : 'text-white/50 hover:text-white border border-white/10 hover:border-white/30'
          }`}
        >
          Visibles ({approvedCount})
        </button>
        <button
          onClick={() => setFilter('hidden')}
          className={`px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all ${
            filter === 'hidden'
              ? 'bg-[#E8B94A] text-black shadow-[0_0_20px_rgba(232,185,74,0.3)]'
              : 'text-white/50 hover:text-white border border-white/10 hover:border-white/30'
          }`}
        >
          Ocultas ({hiddenCount})
        </button>
      </div>

      {/* Lista */}
      {isLoading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF5A36]" />
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-white/10 bg-white/[0.02]">
          <Star className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/60">
            {reviews.length === 0
              ? 'Aún no hay reseñas'
              : 'No hay reseñas con este filtro'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className={`
                p-6 rounded-2xl border bg-white/[0.02] transition-all
                ${review.isApproved
                  ? 'border-white/10 hover:border-white/20'
                  : 'border-[#E8B94A]/30 bg-[#E8B94A]/[0.02]'}
              `}
            >
              <div className="flex flex-wrap gap-4 justify-between items-start mb-4">
                {/* Info autor */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF5A36]/20 to-[#38BDF8]/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white/60" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {review.authorName}
                    </p>
                    <p className="text-white/40 text-[11px] break-all">
                      {review.authorEmail}
                    </p>
                  </div>
                </div>

                {/* Estado + acciones */}
                <div className="flex items-center gap-2">
                  {!review.isApproved && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold border border-[#E8B94A]/40 text-[#E8B94A] bg-[#E8B94A]/10">
                      <EyeOff className="w-3 h-3" />
                      Oculta
                    </span>
                  )}

                  <button
                    onClick={() => handleToggle(review.id)}
                    className={`
                      p-2 rounded-lg border transition-all
                      ${review.isApproved
                        ? 'border-white/10 hover:border-[#E8B94A]/40 hover:bg-[#E8B94A]/10 text-white/60 hover:text-[#E8B94A]'
                        : 'border-[#10B981]/30 hover:bg-[#10B981]/10 text-[#10B981]'}
                    `}
                    title={review.isApproved ? 'Ocultar reseña' : 'Mostrar reseña'}
                  >
                    {review.isApproved ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-2 rounded-lg border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 text-white/60 hover:text-red-400 transition-all"
                    title="Borrar reseña"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Producto */}
              {review.product && (
                <div className="flex items-center gap-2 mb-3 text-[11px]">
                  <Package className="w-3 h-3 text-white/40" />
                  <span className="text-white/50">Producto:</span>
                  <span className="text-white/80">{review.product.name}</span>
                </div>
              )}

              {/* Rating + fecha */}
              <div className="flex items-center gap-4 mb-4">
                <StarRating rating={review.rating} />
                <span className="text-white/40 text-[11px]">
                  {formatDate(review.createdAt)}
                </span>
              </div>

              {/* Comentario */}
              <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                {review.comment}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}