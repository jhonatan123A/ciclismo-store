'use client';

import { Star, User } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Review, RatingStats } from '@/lib/reviews-api';

interface ReviewListProps {
  reviews: Review[];
  stats: RatingStats | null;
}

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

function DistributionBar({ label, count, total }: { label: number; count: number; total: number }) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="flex items-center gap-3">
      <span className="text-white/60 text-xs w-4 text-right">{label}</span>
      <Star className="w-3 h-3 fill-[#E8B94A] text-[#E8B94A] flex-shrink-0" />
      <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#E8B94A] to-[#FF5A36] rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-white/40 text-xs w-8 text-right">{count}</span>
    </div>
  );
}

export function ReviewList({ reviews, stats }: ReviewListProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Columna izquierda: Distribución */}
      {stats && stats.total > 0 && (
        <div className="lg:col-span-1">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] lg:sticky lg:top-24">
            <div className="text-center mb-6 pb-6 border-b border-white/10">
              <p className="text-5xl font-bold text-white mb-2">
                {stats.average.toFixed(1)}
              </p>
              <div className="flex items-center justify-center gap-1 mb-2">
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
              <p className="text-white/50 text-xs">
                {stats.total} {stats.total === 1 ? 'reseña' : 'reseñas'}
              </p>
            </div>

            <div className="space-y-2">
              <DistributionBar label={5} count={stats.distribution[5]} total={stats.total} />
              <DistributionBar label={4} count={stats.distribution[4]} total={stats.total} />
              <DistributionBar label={3} count={stats.distribution[3]} total={stats.total} />
              <DistributionBar label={2} count={stats.distribution[2]} total={stats.total} />
              <DistributionBar label={1} count={stats.distribution[1]} total={stats.total} />
            </div>
          </div>
        </div>
      )}

      {/* Columna derecha: Lista de reviews */}
      <div className={stats && stats.total > 0 ? 'lg:col-span-2' : 'lg:col-span-3'}>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF5A36]/20 to-[#38BDF8]/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white/60" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {review.authorName}
                    </p>
                    <p className="text-white/40 text-[11px] mt-0.5">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>

              {/* Comentario */}
              <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                {review.comment}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}