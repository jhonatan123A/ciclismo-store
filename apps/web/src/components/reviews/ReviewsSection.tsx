'use client';

import { useState, useEffect } from 'react';
import { Loader2, Star, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  fetchProductReviews,
  type Review,
  type RatingStats,
} from '@/lib/reviews-api';
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';

interface ReviewsSectionProps {
  productId: string;
  productName: string;
}

export function ReviewsSection({ productId, productName }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<RatingStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Cargar reviews
  const loadReviews = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchProductReviews(productId);
      setReviews(data.reviews);
      setStats(data.stats);
    } catch (err) {
      console.error('Error cargando reviews:', err);
      setError('Error al cargar las reseñas');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleReviewCreated = () => {
    setShowForm(false);
    loadReviews();
  };

  return (
    <div className="mt-16 pt-16 border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <p className="text-eyebrow text-[#FF5A36] mb-3 tracking-[0.3em] text-[10px]">
            OPINIONES
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Reseñas de clientes
          </h2>

          {stats && stats.total > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(stats.average)
                        ? 'fill-[#E8B94A] text-[#E8B94A]'
                        : 'text-white/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-white font-semibold text-sm">
                {stats.average.toFixed(1)}
              </span>
              <span className="text-white/50 text-xs">
                · {stats.total} {stats.total === 1 ? 'reseña' : 'reseñas'}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all border border-[#FF5A36]/40 text-[#FF5A36] hover:bg-[#FF5A36]/10 self-start md:self-auto"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          {showForm ? 'Cancelar' : 'Escribir reseña'}
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="mb-10">
          <ReviewForm
            productId={productId}
            productName={productName}
            onSuccess={handleReviewCreated}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Contenido */}
      {isLoading ? (
        <div className="py-16 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF5A36]" />
        </div>
      ) : error ? (
        <div className="py-16 text-center">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      ) : reviews.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-16 text-center rounded-2xl border border-white/10 bg-white/[0.02]"
        >
          <Star className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-white font-semibold text-base mb-2">
            Aún no hay reseñas
          </h3>
          <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
            Sé el primero en compartir tu experiencia con {productName}.
          </p>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF5A36] to-[#C17A4B] text-white text-[10px] tracking-[0.15em] uppercase font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Escribir la primera reseña
            </button>
          )}
        </motion.div>
      ) : (
        <ReviewList reviews={reviews} stats={stats} />
      )}
    </div>
  );
}