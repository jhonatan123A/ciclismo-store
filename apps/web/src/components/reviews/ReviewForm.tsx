'use client';

import { useState } from 'react';
import { Loader2, Star, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { createReview } from '@/lib/reviews-api';

interface ReviewFormProps {
  productId: string;
  productName: string;
  onSuccess: () => void;
  onCancel?: () => void;
}

export function ReviewForm({ productId, productName, onSuccess, onCancel }: ReviewFormProps) {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (rating < 1 || rating > 5) {
      setError('Selecciona una calificación de 1 a 5 estrellas');
      return;
    }

    if (authorName.trim().length < 2) {
      setError('Escribe tu nombre (mínimo 2 caracteres)');
      return;
    }

    if (!authorEmail.includes('@')) {
      setError('Escribe un email válido');
      return;
    }

    if (comment.trim().length < 10) {
      setError('El comentario debe tener al menos 10 caracteres');
      return;
    }

    setIsSubmitting(true);

    try {
      await createReview({
        productId,
        authorName: authorName.trim(),
        authorEmail: authorEmail.trim().toLowerCase(),
        rating,
        comment: comment.trim(),
      });

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar la reseña');
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-2xl border border-[#10B981]/30 bg-[#10B981]/5 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-[#10B981]" />
        </div>
        <h3 className="text-white font-bold text-lg mb-2">¡Gracias por tu reseña!</h3>
        <p className="text-white/60 text-sm">
          Tu opinión es muy valiosa para nosotros y para otros clientes.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02]"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-white font-bold text-base mb-1">Escribe tu reseña</h3>
          <p className="text-white/50 text-xs">
            Comparte tu experiencia con {productName}
          </p>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-white/40 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Rating con estrellas */}
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-white/50 mb-3 block">
            Tu calificación *
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
                aria-label={`${star} estrellas`}
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoverRating || rating)
                      ? 'fill-[#E8B94A] text-[#E8B94A]'
                      : 'text-white/20'
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="text-white/60 text-sm ml-2">
                {rating === 1 ? 'Malo' :
                 rating === 2 ? 'Regular' :
                 rating === 3 ? 'Bueno' :
                 rating === 4 ? 'Muy bueno' :
                 'Excelente'}
              </span>
            )}
          </div>
        </div>

        {/* Nombre */}
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-white/50 mb-2 block">
            Tu nombre *
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Ej: Juan Pérez"
            maxLength={80}
            className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 focus:bg-white/[0.04] transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-white/50 mb-2 block">
            Tu email *
          </label>
          <input
            type="email"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            maxLength={200}
            className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 focus:bg-white/[0.04] transition-all"
          />
          <p className="text-[10px] text-white/40 mt-2">
            No publicaremos tu email. Solo lo usamos para verificar tu reseña.
          </p>
        </div>

        {/* Comentario */}
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-white/50 mb-2 block">
            Tu comentario *
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Cuéntanos qué te pareció el producto, calidad, talla, envío..."
            rows={5}
            maxLength={1000}
            className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 focus:bg-white/[0.04] transition-all resize-none"
          />
          <p className="text-[10px] text-white/40 mt-2 text-right">
            {comment.length} / 1000
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/5">
            <p className="text-[11px] text-red-400">{error}</p>
          </div>
        )}

        {/* Botón submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-full font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF5A36] to-[#C17A4B] text-white hover:shadow-[0_0_40px_rgba(255,90,54,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Star className="w-4 h-4" />
              Publicar reseña
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}