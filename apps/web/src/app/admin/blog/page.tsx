'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  Plus,
  Edit,
  Trash2,
  Star,
  FileText,
  Archive,
} from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import {
  fetchAdminPosts,
  deleteAdminPost,
  togglePublishPost,
  setMainArticle,
  toggleShowViews,
  type AdminPostListResponse,
} from '@/lib/admin-posts-api';
import type { Post } from '@/lib/posts-api';
import { getCategoryLabel } from '@/lib/posts-api';

// ============================================
// HELPERS
// ============================================

function getStatusInfo(status: string) {
  switch (status?.toUpperCase()) {
    case 'PUBLISHED':
      return {
        label: 'PUBLICADO',
        color: '#10B981',
        icon: <CheckCircle className="w-3.5 h-3.5" />,
      };
    case 'DRAFT':
      return {
        label: 'BORRADOR',
        color: '#E8B94A',
        icon: <Clock className="w-3.5 h-3.5" />,
      };
    case 'ARCHIVED':
      return {
        label: 'ARCHIVADO',
        color: '#737373',
        icon: <Archive className="w-3.5 h-3.5" />,
      };
    default:
      return {
        label: status?.toUpperCase() || 'DESCONOCIDO',
        color: '#737373',
        icon: <Clock className="w-3.5 h-3.5" />,
      };
  }
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

// ============================================
// CONTENIDO
// ============================================

function BlogContent() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 15,
    status: 'ALL',
    search: '',
  });

  const [searchInput, setSearchInput] = useState('');
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

  // Cargar posts
  useEffect(() => {
    if (!isAuthenticated()) return;

    setIsLoading(true);
    setError('');

    fetchAdminPosts(filters)
      .then((data: AdminPostListResponse) => {
        setPosts(data.data);
        setPagination({
          total: data.pagination.total,
          page: data.pagination.page,
          limit: data.pagination.limit,
          totalPages: data.pagination.totalPages || 1,
        });
      })
      .catch((err) => {
        console.error('Error posts:', err);
        setError(err.message || 'Error al cargar posts');
      })
      .finally(() => setIsLoading(false));
  }, [filters, isAuthenticated]);

  const reload = () => {
    setFilters((prev) => ({ ...prev }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: searchInput, page: 1 }));
  };

  const handleStatusChange = (status: string) => {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  };

  const handleDelete = async (id: string, title: string) => {
    if (
      !confirm(
        `¿Eliminar el post "${title}"?\n\nEsta acción no se puede deshacer.`
      )
    )
      return;

    setActionLoading(id);
    try {
      await deleteAdminPost(id);
      reload();
    } catch (err: any) {
      alert(err.message || 'Error al eliminar');
    } finally {
      setActionLoading(null);
    }
  };

  const handleTogglePublish = async (id: string) => {
    setActionLoading(id);
    try {
      await togglePublishPost(id);
      reload();
    } catch (err: any) {
      alert(err.message || 'Error al cambiar estado');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSetMain = async (id: string) => {
    setActionLoading(id);
    try {
      await setMainArticle(id);
      reload();
    } catch (err: any) {
      alert(err.message || 'Error al marcar como principal');
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleViews = async (id: string) => {
    setActionLoading(id);
    try {
      await toggleShowViews(id);
      reload();
    } catch (err: any) {
      alert(err.message || 'Error al cambiar visibilidad');
    } finally {
      setActionLoading(null);
    }
  };

  const statuses = ['ALL', 'PUBLISHED', 'DRAFT', 'ARCHIVED'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Título */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#FF5A36] mb-2">
            Panel de administración
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Blog</h1>
        </div>
        <Link
          href="/admin/blog/editor"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#FF5A36] hover:bg-[#FF5A36]/90 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold text-white transition-all shadow-[0_0_20px_rgba(255,90,54,0.3)]"
        >
          <Plus className="w-4 h-4" />
          Nuevo post
        </Link>
      </div>

      {/* Búsqueda */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Buscar por título o slug..."
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

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => handleStatusChange(s)}
            className={`
              px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all
              ${
                filters.status === s
                  ? 'bg-[#FF5A36] text-white shadow-[0_0_20px_rgba(255,90,54,0.3)]'
                  : 'text-white/50 hover:text-white border border-white/10 hover:border-white/30'
              }
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
      ) : posts.length === 0 ? (
        <div className="py-20 text-center">
          <div className="text-5xl mb-4">📝</div>
          <p className="text-white/60 mb-6">No hay posts con estos filtros</p>
          <Link
            href="/admin/blog/editor"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#FF5A36] hover:bg-[#FF5A36]/90 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold text-white transition-all"
          >
            <Plus className="w-4 h-4" />
            Crear el primer post
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {posts.map((post, i) => {
              const statusInfo = getStatusInfo(post.status);
              const isProcessing = actionLoading === post.id;

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#FF5A36]/30 hover:bg-white/[0.04] transition-all"
                >
                  <div className="flex flex-wrap items-start gap-4">
                    {/* Título + info */}
                    <div className="flex-1 min-w-[280px]">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {post.isMainArticle && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E8B94A]/15 border border-[#E8B94A]/40 text-[9px] tracking-widest uppercase font-bold text-[#E8B94A]">
                            <Star className="w-3 h-3" />
                            Principal
                          </span>
                        )}
                        <span className="text-[9px] tracking-widest uppercase text-[#FF5A36]">
                          {getCategoryLabel(post.category)}
                        </span>
                      </div>
                      <Link
                        href={`/admin/blog/editor?id=${post.id}`}
                        className="text-white font-bold text-sm hover:text-[#FF5A36] transition-colors line-clamp-2"
                      >
                        {post.title}
                      </Link>
                      <p className="text-white/40 text-[11px] mt-1.5">
                        /blog/{post.slug}
                      </p>
                    </div>

                    {/* Estado */}
                    <div className="min-w-[110px]">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1">
                        Estado
                      </p>
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

                    {/* Vistas */}
                    <div className="min-w-[80px]">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1">
                        Vistas
                      </p>
                      <button
                        onClick={() => handleToggleViews(post.id)}
                        disabled={isProcessing}
                        title={
                          post.showViews
                            ? 'Vistas visibles al público'
                            : 'Vistas ocultas al público'
                        }
                        className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-[#FF5A36] transition-colors disabled:opacity-30"
                      >
                        {post.showViews ? (
                          <Eye className="w-3.5 h-3.5" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5" />
                        )}
                        {post.views}
                      </button>
                    </div>

                    {/* Fecha */}
                    <div className="min-w-[100px]">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1">
                        Fecha
                      </p>
                      <p className="text-white/70 text-[11px]">
                        {formatDate(post.createdAt)}
                      </p>
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleTogglePublish(post.id)}
                        disabled={isProcessing}
                        title={
                          post.status === 'PUBLISHED'
                            ? 'Despublicar'
                            : 'Publicar'
                        }
                        className="p-2 rounded-lg border border-white/10 hover:border-[#FF5A36]/50 hover:bg-[#FF5A36]/5 text-white/60 hover:text-[#FF5A36] transition-all disabled:opacity-30"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      {!post.isMainArticle && post.status === 'PUBLISHED' && (
                        <button
                          onClick={() => handleSetMain(post.id)}
                          disabled={isProcessing}
                          title="Marcar como artículo principal"
                          className="p-2 rounded-lg border border-white/10 hover:border-[#E8B94A]/50 hover:bg-[#E8B94A]/5 text-white/60 hover:text-[#E8B94A] transition-all disabled:opacity-30"
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      )}
                      <Link
                        href={`/admin/blog/editor?id=${post.id}`}
                        title="Editar"
                        className="p-2 rounded-lg border border-white/10 hover:border-[#38BDF8]/50 hover:bg-[#38BDF8]/5 text-white/60 hover:text-[#38BDF8] transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      {post.status === 'PUBLISHED' && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          title="Ver en el sitio"
                          className="p-2 rounded-lg border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-all"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      )}
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        disabled={isProcessing}
                        title="Eliminar"
                        className="p-2 rounded-lg border border-white/10 hover:border-red-500/50 hover:bg-red-500/5 text-white/60 hover:text-red-400 transition-all disabled:opacity-30"
                      >
                        {isProcessing ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Paginación */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <p className="text-[11px] text-white/40">
              Mostrando {posts.length} de {pagination.total} posts
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
    </div>
  );
}

// ============================================
// EXPORT CON SUSPENSE
// ============================================

export default function AdminBlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF5A36]" />
        </div>
      }
    >
      <BlogContent />
    </Suspense>
  );
}