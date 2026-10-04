'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Loader2,
  Save,
  Send,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import {
  createAdminPost,
  updateAdminPost,
  fetchAdminPostById,
  type CreatePostPayload,
} from '@/lib/admin-posts-api';
import type { Post, PostCategory } from '@/lib/posts-api';

// ============================================
// CONSTANTES
// ============================================

const CATEGORIES: { value: PostCategory; label: string }[] = [
  { value: 'TECNOLOGIA', label: 'Tecnología' },
  { value: 'GUIAS', label: 'Guías' },
  { value: 'HISTORIAS', label: 'Historias' },
  { value: 'COMPARATIVAS', label: 'Comparativas' },
  { value: 'NOTICIAS', label: 'Noticias' },
  { value: 'CONSEJOS', label: 'Consejos' },
];

const generateSlug = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// ============================================
// FORMULARIO
// ============================================

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  category: PostCategory;
  tags: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  isMainArticle: boolean;
  videoUrl: string;
  showViews: boolean;
}

const EMPTY_FORM: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  coverImageAlt: '',
  metaTitle: '',
  metaDescription: '',
  keywords: '',
  category: 'TECNOLOGIA',
  tags: '',
  status: 'DRAFT',
  isMainArticle: false,
  videoUrl: '',
  showViews: false,
};

function EditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuthStore();

  const postId = searchParams.get('id');
  const isEditing = !!postId;

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(!!postId);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // Auth
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  // Cargar post si estamos editando
  useEffect(() => {
    if (!isAuthenticated() || !postId) return;

    setIsLoading(true);
    fetchAdminPostById(postId)
      .then((post: Post) => {
        setForm({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage || '',
          coverImageAlt: post.coverImageAlt || '',
          metaTitle: post.metaTitle || '',
          metaDescription: post.metaDescription || '',
          keywords: post.keywords.join(', '),
          category: post.category,
          tags: post.tags.join(', '),
          status: post.status,
          isMainArticle: post.isMainArticle,
          videoUrl: post.videoUrl || '',
          showViews: post.showViews,
        });
        setSlugManuallyEdited(true);
      })
      .catch((err) => {
        console.error('Error cargando post:', err);
        setErrorMessage(err.message || 'Error al cargar el post');
      })
      .finally(() => setIsLoading(false));
  }, [postId, isAuthenticated]);

  // Auto-generar slug desde título
  useEffect(() => {
    if (!slugManuallyEdited && form.title) {
      setForm((prev) => ({ ...prev, slug: generateSlug(form.title) }));
    }
  }, [form.title, slugManuallyEdited]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaveStatus('idle');
  };

  const buildPayload = (status?: 'DRAFT' | 'PUBLISHED'): CreatePostPayload => {
    return {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      coverImage: form.coverImage.trim() || null,
      coverImageAlt: form.coverImageAlt.trim() || null,
      metaTitle: form.metaTitle.trim() || null,
      metaDescription: form.metaDescription.trim() || null,
      keywords: form.keywords
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean),
      category: form.category,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      status: status || form.status,
      isMainArticle: form.isMainArticle,
      videoUrl: form.videoUrl.trim() || null,
      showViews: form.showViews,
    };
  };

  const validate = (): string | null => {
    if (!form.title.trim() || form.title.length < 5) {
      return 'El título debe tener al menos 5 caracteres';
    }
    if (!form.slug.trim() || form.slug.length < 3) {
      return 'El slug debe tener al menos 3 caracteres';
    }
    if (!/^[a-z0-9-]+$/.test(form.slug)) {
      return 'El slug solo puede contener letras minúsculas, números y guiones';
    }
    if (!form.excerpt.trim() || form.excerpt.length < 20) {
      return 'El extracto debe tener al menos 20 caracteres';
    }
    if (!form.content.trim() || form.content.length < 100) {
      return 'El contenido debe tener al menos 100 caracteres';
    }
    return null;
  };

  const handleSave = async (status?: 'DRAFT' | 'PUBLISHED') => {
    const validation = validate();
    if (validation) {
      setSaveStatus('error');
      setErrorMessage(validation);
      return;
    }

    setIsSaving(true);
    setSaveStatus('saving');
    setErrorMessage('');

    try {
      const payload = buildPayload(status);
      if (isEditing && postId) {
        await updateAdminPost(postId, payload);
      } else {
        const created = await createAdminPost(payload);
        // Redirigir a modo edición
        router.replace(`/admin/blog/editor?id=${created.id}`);
      }
      setSaveStatus('saved');
      if (status) {
        setForm((prev) => ({ ...prev, status }));
      }
      setTimeout(() => setSaveStatus('idle'), 2500);
    } catch (err: any) {
      console.error('Error guardando:', err);
      setSaveStatus('error');
      setErrorMessage(err.message || 'Error al guardar');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF5A36]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-white/50 hover:text-[#FF5A36] transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al listado
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#FF5A36] mb-2">
              {isEditing ? 'Editar post' : 'Nuevo post'}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {form.title || 'Sin título'}
            </h1>
          </div>

          {/* Guardar status indicator */}
          {saveStatus === 'saved' && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/30">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span className="text-[11px] tracking-widest uppercase text-[#10B981] font-semibold">
                Guardado
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Error global */}
      {errorMessage && (
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-[12px] text-red-400">{errorMessage}</p>
        </div>
      )}

      {/* Formulario */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda (contenido) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Título */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-5">
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
                Título *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Un título atractivo y descriptivo"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
                Slug (URL) *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-white/30 text-xs whitespace-nowrap">
                  /blog/
                </span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => {
                    updateField('slug', e.target.value);
                    setSlugManuallyEdited(true);
                  }}
                  placeholder="mi-post-slug"
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
                Extracto * <span className="text-white/30 normal-case">(resumen corto para el listado y Google)</span>
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => updateField('excerpt', e.target.value)}
                placeholder="Un resumen atractivo de 1-2 frases que invite a leer"
                rows={3}
                maxLength={500}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 transition-all resize-none"
              />
              <p className="text-right text-[10px] text-white/30 mt-1">
                {form.excerpt.length} / 500
              </p>
            </div>
          </div>

          {/* Contenido Markdown */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
              Contenido (Markdown) *
            </label>
            <textarea
              value={form.content}
              onChange={(e) => updateField('content', e.target.value)}
              placeholder="# Título del artículo&#10;&#10;Escribe tu contenido aquí usando **Markdown**...&#10;&#10;## Subtítulo&#10;&#10;- Lista item 1&#10;- Lista item 2"
              rows={25}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 transition-all font-mono resize-y"
            />
            <div className="mt-3 flex items-center justify-between text-[10px] text-white/30">
              <span>
                Soporta: <strong className="text-white/50">#</strong> títulos, <strong className="text-white/50">**negrita**</strong>, <strong className="text-white/50">[link](url)</strong>, listas, citas (<strong className="text-white/50">&gt;</strong>), tablas
              </span>
              <span>{form.content.length} caracteres</span>
            </div>
          </div>

          {/* Imagen de portada */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
                Imagen de portada (URL)
              </label>
              <input
                type="url"
                value={form.coverImage}
                onChange={(e) => updateField('coverImage', e.target.value)}
                placeholder="https://res.cloudinary.com/.../image.jpg"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 transition-all"
              />
              <p className="text-[10px] text-white/30 mt-2">
                Pega una URL de Cloudinary, Unsplash u otro servicio.
              </p>
            </div>

            {form.coverImage && (
              <div className="rounded-xl overflow-hidden border border-white/10">
                <img
                  src={form.coverImage}
                  alt="Vista previa"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '';
                  }}
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
                Texto alternativo de la imagen (SEO)
              </label>
              <input
                type="text"
                value={form.coverImageAlt}
                onChange={(e) => updateField('coverImageAlt', e.target.value)}
                placeholder="Descripción de la imagen para Google"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 transition-all"
              />
            </div>
          </div>

          {/* SEO */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#FF5A36] mb-1">
              SEO (opcional)
            </p>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
                Meta título
              </label>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) => updateField('metaTitle', e.target.value)}
                placeholder="Si lo dejas vacío, se usa el título del post"
                maxLength={200}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
                Meta descripción
              </label>
              <textarea
                value={form.metaDescription}
                onChange={(e) => updateField('metaDescription', e.target.value)}
                placeholder="Si lo dejas vacío, se usa el extracto"
                rows={2}
                maxLength={500}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
                Keywords (separadas por coma)
              </label>
              <input
                type="text"
                value={form.keywords}
                onChange={(e) => updateField('keywords', e.target.value)}
                placeholder="tecnología somatosensorial, ciclismo, running"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Columna derecha (publicación) */}
        <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          {/* Publicación */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#FF5A36]">
              Publicación
            </p>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
                Estado
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  updateField('status', e.target.value as FormState['status'])
                }
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF5A36]/50 transition-all"
              >
                <option value="DRAFT">Borrador</option>
                <option value="PUBLISHED">Publicado</option>
                <option value="ARCHIVED">Archivado</option>
              </select>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isMainArticle}
                onChange={(e) => updateField('isMainArticle', e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-white/20 bg-black/40 text-[#FF5A36] focus:ring-[#FF5A36] focus:ring-offset-0"
              />
              <div>
                <p className="text-white text-xs font-medium">
                  Artículo principal
                </p>
                <p className="text-white/40 text-[10px] mt-0.5">
                  Se muestra grande al inicio del blog
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.showViews}
                onChange={(e) => updateField('showViews', e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-white/20 bg-black/40 text-[#FF5A36] focus:ring-[#FF5A36] focus:ring-offset-0"
              />
              <div>
                <p className="text-white text-xs font-medium">
                  Mostrar contador de vistas
                </p>
                <p className="text-white/40 text-[10px] mt-0.5">
                  Si se desactiva, los visitantes no ven las vistas
                </p>
              </div>
            </label>
          </div>

          {/* Categoría y tags */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
                Categoría
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  updateField('category', e.target.value as PostCategory)
                }
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF5A36]/50 transition-all"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
                Tags (separadas por coma)
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => updateField('tags', e.target.value)}
                placeholder="ciclismo, somatosensorial, tecnología"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2">
                Video (URL YouTube/Vimeo)
              </label>
              <input
                type="url"
                value={form.videoUrl}
                onChange={(e) => updateField('videoUrl', e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 transition-all"
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <button
              onClick={() => handleSave('DRAFT')}
              disabled={isSaving}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] tracking-[0.15em] uppercase font-semibold text-white border border-white/10 transition-all disabled:opacity-50"
            >
              {isSaving && saveStatus === 'saving' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Guardar borrador
            </button>

            <button
              onClick={() => handleSave('PUBLISHED')}
              disabled={isSaving}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#FF5A36] hover:bg-[#FF5A36]/90 rounded-xl text-[10px] tracking-[0.15em] uppercase font-semibold text-white transition-all shadow-[0_0_20px_rgba(255,90,54,0.3)] disabled:opacity-50"
            >
              {isSaving && saveStatus === 'saving' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isEditing && form.status === 'PUBLISHED'
                ? 'Actualizar'
                : 'Publicar'}
            </button>
          </div>

          {/* Info */}
          <div className="p-4 rounded-xl border border-white/10 bg-black/40">
            <p className="text-[10px] tracking-widest uppercase text-white/30 mb-2">
              Info
            </p>
            <p className="text-[10px] text-white/40 leading-relaxed">
              El <strong className="text-white/60">tiempo de lectura</strong> se
              calcula automáticamente según el contenido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminBlogEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF5A36]" />
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}