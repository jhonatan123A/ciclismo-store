'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Loader2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Trash2,
  Send,
  Mail,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import {
  fetchAdminComments,
  approveAdminComment,
  replyToAdminComment,
  deleteAdminComment,
  type AdminComment,
} from '@/lib/admin-posts-api';

// ============================================
// HELPERS
// ============================================

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

// ============================================
// COMPONENTE: MODAL DE RESPUESTA
// ============================================

function ReplyModal({
  comment,
  onClose,
  onSuccess,
}: {
  comment: AdminComment;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [reply, setReply] = useState(comment.adminReply || '');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!reply.trim() || reply.length < 5) {
      setError('La respuesta debe tener al menos 5 caracteres');
      return;
    }
    setIsSending(true);
    setError('');
    try {
      await replyToAdminComment(comment.id, reply.trim());
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al enviar');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl p-6 rounded-2xl border border-white/10 bg-[#0F0F12] space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#FF5A36] mb-1">
              Responder comentario
            </p>
            <p className="text-white text-sm font-medium">
              {comment.authorName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Comentario original */}
        <div className="p-4 rounded-xl border border-white/10 bg-black/40">
          <p className="text-[10px] tracking-widest uppercase text-white/30 mb-2">
            Comentario original
          </p>
          <p className="text-white/80 text-sm whitespace-pre-wrap">
            {comment.content}
          </p>
        </div>

        {/* Respuesta */}
        <div>
          <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
            Tu respuesta
          </label>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={6}
            placeholder="Escribe tu respuesta..."
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 transition-all resize-none"
          />
          {comment.wantsEmailReply && (
            <div className="mt-3 flex items-start gap-2 p-3 rounded-xl border border-[#38BDF8]/30 bg-[#38BDF8]/5">
              <Mail className="w-4 h-4 text-[#38BDF8] flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#38BDF8]">
                El usuario pidió recibir la respuesta por email. Se enviará a{' '}
                <strong>{comment.authorEmail}</strong> automáticamente.
              </p>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/5">
            <p className="text-[11px] text-red-400">{error}</p>
          </div>
        )}

        {/* Acciones */}
        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold text-white/50 hover:text-white border border-white/10 hover:border-white/30 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleSend}
            disabled={isSending}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5A36] hover:bg-[#FF5A36]/90 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold text-white transition-all disabled:opacity-50"
          >
            {isSending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Enviar respuesta
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CONTENIDO PRINCIPAL
// ============================================

function CommentsContent() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const [comments, setComments] = useState<AdminComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<AdminComment | null>(null);

  const [filters, setFilters] = useState<{
    page: number;
    limit: number;
    status?: 'pending' | 'approved';
  }>({
    page: 1,
    limit: 15,
  });

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 15,
    totalPages: 1,
  });

  // Auth
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  // Cargar comentarios
  useEffect(() => {
    if (!isAuthenticated()) return;

    setIsLoading(true);
    setError('');

    fetchAdminComments(filters)
      .then((data) => {
        setComments(data.data);
        setPagination({
          total: data.pagination.total,
          page: data.pagination.page,
          limit: data.pagination.limit,
          totalPages: data.pagination.totalPages || 1,
        });
      })
      .catch((err) => {
        console.error('Error comments:', err);
        setError(err.message || 'Error al cargar comentarios');
      })
      .finally(() => setIsLoading(false));
  }, [filters, isAuthenticated]);

  const reload = () => setFilters((prev) => ({ ...prev }));

  const handleStatusChange = (status?: 'pending' | 'approved') => {
    setFilters({ page: 1, limit: 15, status });
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      await approveAdminComment(id);
      reload();
    } catch (err: any) {
      alert(err.message || 'Error al aprobar');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string, author: string) => {
    if (
      !confirm(
        `¿Eliminar el comentario de "${author}"?\n\nEsta acción no se puede deshacer.`
      )
    )
      return;

    setActionLoading(id);
    try {
      await deleteAdminComment(id);
      reload();
    } catch (err: any) {
      alert(err.message || 'Error al eliminar');
    } finally {
      setActionLoading(null);
    }
  };

  const filterButtons = [
    { label: 'Todos', value: undefined },
    { label: 'Pendientes', value: 'pending' as const },
    { label: 'Aprobados', value: 'approved' as const },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Título */}
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#FF5A36] mb-2">
          Panel de administración
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Comentarios
        </h1>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterButtons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => handleStatusChange(btn.value)}
            className={`
              px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all
              ${
                filters.status === btn.value
                  ? 'bg-[#FF5A36] text-white shadow-[0_0_20px_rgba(255,90,54,0.3)]'
                  : 'text-white/50 hover:text-white border border-white/10 hover:border-white/30'
              }
            `}
          >
            {btn.label}
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
      ) : comments.length === 0 ? (
        <div className="py-20 text-center">
          <div className="text-5xl mb-4">💬</div>
          <p className="text-white/60">No hay comentarios con estos filtros</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {comments.map((comment, i) => {
              const isProcessing = actionLoading === comment.id;
              const isPending = !comment.isApproved;

              return (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className={`p-5 rounded-2xl border bg-white/[0.02] transition-all ${
                    isPending
                      ? 'border-[#E8B94A]/30 bg-[#E8B94A]/[0.02]'
                      : 'border-white/10'
                  }`}
                >
                  {/* Header del comentario */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-[240px]">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {isPending ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E8B94A]/15 border border-[#E8B94A]/40 text-[9px] tracking-widest uppercase font-bold text-[#E8B94A]">
                            <Clock className="w-3 h-3" />
                            Pendiente
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 text-[9px] tracking-widest uppercase font-bold text-[#10B981]">
                            <CheckCircle className="w-3 h-3" />
                            Aprobado
                          </span>
                        )}
                        {comment.wantsEmailReply && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/40 text-[9px] tracking-widest uppercase font-bold text-[#38BDF8]">
                            <Mail className="w-3 h-3" />
                            Pide respuesta
                          </span>
                        )}
                      </div>

                      <p className="text-white text-sm font-medium">
                        {comment.authorName}
                      </p>
                      <p className="text-white/40 text-[11px]">
                        {comment.authorEmail} · {formatDate(comment.createdAt)}
                      </p>
                    </div>

                    <Link
                      href={`/blog/${comment.post.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-white/50 hover:text-[#FF5A36] transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {comment.post.title.length > 40
                        ? comment.post.title.substring(0, 40) + '...'
                        : comment.post.title}
                    </Link>
                  </div>

                  {/* Contenido del comentario */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-4">
                    <p className="text-white/80 text-sm whitespace-pre-wrap leading-relaxed">
                      {comment.content}
                    </p>
                  </div>

                  {/* Respuesta admin */}
                  {comment.adminReply && (
                    <div className="ml-6 pl-4 border-l-2 border-[#FF5A36] py-2 mb-4">
                      <p className="text-[10px] tracking-widest uppercase text-[#FF5A36] font-bold mb-2">
                        Respuesta BESTIGE
                      </p>
                      <p className="text-white/70 text-sm whitespace-pre-wrap">
                        {comment.adminReply}
                      </p>
                      {comment.adminRepliedAt && (
                        <p className="text-white/30 text-[10px] mt-2">
                          {formatDate(comment.adminRepliedAt)}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="flex flex-wrap items-center gap-2">
                    {isPending && (
                      <button
                        onClick={() => handleApprove(comment.id)}
                        disabled={isProcessing}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[10px] tracking-widest uppercase font-semibold text-[#10B981] hover:bg-[#10B981]/20 transition-all disabled:opacity-30"
                      >
                        {isProcessing ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <CheckCircle className="w-3.5 h-3.5" />
                        )}
                        Aprobar
                      </button>
                    )}

                    <button
                      onClick={() => setReplyingTo(comment)}
                      disabled={isProcessing}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-widest uppercase font-semibold text-white/70 hover:text-[#FF5A36] hover:border-[#FF5A36]/40 transition-all disabled:opacity-30"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {comment.adminReply ? 'Editar respuesta' : 'Responder'}
                    </button>

                    <button
                      onClick={() => handleDelete(comment.id, comment.authorName)}
                      disabled={isProcessing}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-widest uppercase font-semibold text-white/70 hover:text-red-400 hover:border-red-500/40 transition-all disabled:opacity-30"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Eliminar
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Paginación */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <p className="text-[11px] text-white/40">
              Mostrando {comments.length} de {pagination.total} comentarios
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    page: Math.max(1, (prev.page || 1) - 1),
                  }))
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
                    page: Math.min(
                      pagination.totalPages,
                      (prev.page || 1) + 1
                    ),
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

      {/* Modal de respuesta */}
      {replyingTo && (
        <ReplyModal
          comment={replyingTo}
          onClose={() => setReplyingTo(null)}
          onSuccess={reload}
        />
      )}
    </div>
  );
}

export default function AdminCommentsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF5A36]" />
        </div>
      }
    >
      <CommentsContent />
    </Suspense>
  );
}