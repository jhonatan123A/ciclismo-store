'use client';

import { useState, useRef } from 'react';
import { Loader2, Star, Check, X, Camera, Instagram, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { createReview, uploadReviewPhoto } from '@/lib/reviews-api';

interface ReviewFormProps {
  productId: string;
  productName: string;
  onSuccess: () => void;
  onCancel?: () => void;
}

// ✅ CAMBIO: Límite bajado a 2 MB
const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export function ReviewForm({ productId, productName, onSuccess, onCancel }: ReviewFormProps) {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoUploadedUrl, setPhotoUploadedUrl] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ============================================
  // MANEJO DE FOTO
  // ============================================

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');

    // ✅ Validar tamaño con mensaje claro
    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setError(
        `Tu imagen pesa ${sizeMB} MB y el máximo permitido es ${MAX_FILE_SIZE_MB} MB. ` +
        `Intenta con una más liviana o comprímela antes de subirla.`
      );
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Validar tipo
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Solo se permiten imágenes JPG, PNG o WebP');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Mostrar preview local
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Subir a Cloudinary
    setIsUploadingPhoto(true);
    try {
      const url = await uploadReviewPhoto(file);
      setPhotoUploadedUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir la foto');
      setPhotoFile(null);
      setPhotoPreview(null);
      setPhotoUploadedUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setPhotoUploadedUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // ============================================
  // SUBMIT
  // ============================================

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

    if (photoFile && !photoUploadedUrl && !isUploadingPhoto) {
      setError('Espera a que la foto termine de subir');
      return;
    }

    if (isUploadingPhoto) {
      setError('Espera a que la foto termine de subir');
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
        photoUrl: photoUploadedUrl || undefined,
        instagramUrl: instagramUrl.trim() || undefined,
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

        {/* ✅ Foto */}
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-white/50 mb-2 block">
            Foto del producto (opcional)
          </label>

          {!photoPreview ? (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingPhoto}
                className="w-full py-3 rounded-lg border border-dashed border-white/20 hover:border-[#FF5A36]/50 bg-white/[0.02] hover:bg-white/[0.04] text-white/60 hover:text-[#FF5A36] text-xs tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Subir foto (JPG, PNG o WebP, máx {MAX_FILE_SIZE_MB} MB)
              </button>
            </>
          ) : (
            <div className="relative rounded-lg overflow-hidden border border-white/10">
              <img
                src={photoPreview}
                alt="Preview"
                className="w-full max-h-96 object-contain bg-black/40"
              />
              {isUploadingPhoto && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-[#FF5A36]" />
                  <span className="text-white text-xs ml-2">Subiendo...</span>
                </div>
              )}
              {photoUploadedUrl && !isUploadingPhoto && (
                <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-[#10B981] text-white text-[9px] font-semibold tracking-wider flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Subida
                </div>
              )}
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 backdrop-blur-sm hover:bg-red-500/80 text-white flex items-center justify-center transition-all"
                aria-label="Quitar foto"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* ✅ Instagram */}
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-white/50 mb-2 block">
            Link de tu post de Instagram (opcional)
          </label>
          <div className="relative">
            <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="url"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              placeholder="https://www.instagram.com/p/ABC123..."
              className="w-full bg-white/[0.02] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 focus:bg-white/[0.04] transition-all"
            />
          </div>
          <p className="text-[10px] text-white/40 mt-2">
            Pega el link de tu post o reel usando el producto. Se mostrará junto a tu reseña.
          </p>
        </div>

        {/* Aviso legal */}
        <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02]">
          <p className="text-[10px] text-white/50 leading-relaxed">
            📷 Al subir una foto o link confirmas que es tuyo, no contiene
            contenido ofensivo, y autorizas a BESTIGE a mostrarlo en la web.
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
          disabled={isSubmitting || isUploadingPhoto}
          className="w-full py-4 rounded-full font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF5A36] to-[#C17A4B] text-white hover:shadow-[0_0_40px_rgba(255,90,54,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Enviando...
            </>
          ) : isUploadingPhoto ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Subiendo foto...
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