'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { createComment } from '@/lib/posts-api';

interface CommentFormProps {
  postSlug: string;
  onSuccess?: () => void;
}

export function CommentForm({ postSlug, onSuccess }: CommentFormProps) {
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    content: '',
    wantsEmailReply: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await createComment(postSlug, formData);
      setStatus('success');
      setFormData({
        authorName: '',
        authorEmail: '',
        content: '',
        wantsEmailReply: false,
      });
      if (onSuccess) onSuccess();
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(
        error?.message || 'No se pudo enviar el comentario. Intenta de nuevo.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="p-6 rounded-2xl bg-[#0F0F12] border border-[#FF5A36]/30 text-center">
        <CheckCircle2
          size={40}
          className="mx-auto text-[#FF5A36] mb-3"
        />
        <h3 className="text-white font-bold text-lg mb-2">
          ¡Comentario enviado!
        </h3>
        <p className="text-white/60 text-sm">
          Tu comentario será visible después de ser revisado por nuestro equipo.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 md:p-8 rounded-2xl bg-[#0F0F12] border border-white/10 space-y-5"
    >
      <div>
        <h3 className="text-white font-bold text-lg mb-1">
          Deja tu comentario
        </h3>
        <p className="text-white/50 text-xs">
          Los comentarios se publican tras ser revisados.
        </p>
      </div>

      {/* Nombre */}
      <div className="space-y-2">
        <label
          htmlFor="comment-name"
          className="block text-white/70 text-xs tracking-wider uppercase font-medium"
        >
          Nombre
        </label>
        <input
          id="comment-name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          value={formData.authorName}
          onChange={(e) =>
            setFormData({ ...formData, authorName: e.target.value })
          }
          className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:border-[#FF5A36] focus:outline-none transition-colors"
          placeholder="Tu nombre"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="comment-email"
          className="block text-white/70 text-xs tracking-wider uppercase font-medium"
        >
          Email (no se publica)
        </label>
        <input
          id="comment-email"
          type="email"
          required
          value={formData.authorEmail}
          onChange={(e) =>
            setFormData({ ...formData, authorEmail: e.target.value })
          }
          className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:border-[#FF5A36] focus:outline-none transition-colors"
          placeholder="tu@email.com"
        />
      </div>

      {/* Comentario */}
      <div className="space-y-2">
        <label
          htmlFor="comment-content"
          className="block text-white/70 text-xs tracking-wider uppercase font-medium"
        >
          Comentario
        </label>
        <textarea
          id="comment-content"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:border-[#FF5A36] focus:outline-none transition-colors resize-none"
          placeholder="Comparte tu opinión o pregunta..."
        />
        <p className="text-white/30 text-xs text-right">
          {formData.content.length} / 2000
        </p>
      </div>

      {/* Checkbox email reply */}
      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={formData.wantsEmailReply}
          onChange={(e) =>
            setFormData({ ...formData, wantsEmailReply: e.target.checked })
          }
          className="mt-0.5 w-4 h-4 rounded border-white/20 bg-[#050505] text-[#FF5A36] focus:ring-[#FF5A36] focus:ring-offset-0"
        />
        <span className="text-white/60 text-xs leading-relaxed">
          Quiero recibir por email la respuesta a mi comentario
        </span>
      </label>

      {/* Aviso legal */}
      <p className="text-white/40 text-[11px] leading-relaxed">
        Al enviar tu comentario, aceptas que tu nombre y comentario sean
        visibles públicamente. Tu email nunca se mostrará.
      </p>

      {/* Error */}
      {status === 'error' && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
          <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-red-400 text-xs">{errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF5A36] text-white text-sm font-bold tracking-wide rounded-full hover:bg-[#FF5A36]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={16} />
            Enviar comentario
          </>
        )}
      </button>
    </form>
  );
}