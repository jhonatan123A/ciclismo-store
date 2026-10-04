import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PostCard } from '@/components/blog/PostCard';
import { BlogFilters } from '@/components/blog/BlogFilters';
import {
  listPosts,
  getMainArticle,
  type PostCategory,
} from '@/lib/posts-api';
import { NeuralFrame } from '@/components/neural/NeuralFrame';

// ============================================
// METADATA SEO
// ============================================

export const metadata: Metadata = {
  title: 'Blog | BESTIGE — Tecnología Somatosensorial',
  description:
    'Artículos científicos y guías sobre tecnología somatosensorial, ciclismo y running. Descubre cómo la ciencia aplicada a la indumentaria deportiva puede transformar tu rendimiento.',
  keywords: [
    'tecnología somatosensorial',
    'blog ciclismo Colombia',
    'blog running Colombia',
    'indumentaria deportiva científica',
    'BESTIGE',
  ],
  openGraph: {
    title: 'Blog BESTIGE — Tecnología Somatosensorial',
    description:
      'Ciencia aplicada al deporte. Artículos sobre tecnología somatosensorial, ciclismo y running.',
    type: 'website',
  },
  alternates: {
    canonical: '/blog',
  },
};

// ============================================
// TIPOS
// ============================================

interface PageProps {
  searchParams: {
    category?: string;
    page?: string;
    search?: string;
    tag?: string;
  };
}

// ============================================
// PÁGINA
// ============================================

export default async function BlogPage({ searchParams }: PageProps) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const category = searchParams.category as PostCategory | undefined;
  const search = searchParams.search;
  const tag = searchParams.tag;

  // Cargar posts + artículo principal en paralelo
  const [postsResult, mainArticle] = await Promise.all([
    listPosts({ page, limit: 12, category, search, tag }).catch(() => ({
      data: [],
      pagination: { page: 1, limit: 12, total: 0, totalPages: 0 },
    })),
    page === 1 && !category && !search && !tag
      ? getMainArticle().catch(() => null)
      : Promise.resolve(null),
  ]);

  const { data: posts, pagination } = postsResult;

  // Filtrar el artículo principal del listado (para no duplicarlo)
  const secondaryPosts = mainArticle
    ? posts.filter((p) => p.id !== mainArticle.id)
    : posts;

  const isFirstPage = page === 1 && !category && !search && !tag;

  return (
    <>
      <NeuralFrame />
      <main className="min-h-screen pt-24 pb-32 px-6 relative">
        {/* Fondo neuronal sutil */}
        <div className="fixed inset-0 pointer-events-none opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FF5A36]/5 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* HERO DEL BLOG */}
          <section className="text-center mb-16 space-y-6">
            <p className="text-[#FF5A36] text-xs tracking-[0.3em] uppercase font-medium">
              Conocimiento
            </p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.05] max-w-3xl mx-auto">
              Ciencia aplicada al movimiento
            </h1>
            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Artículos sobre tecnología somatosensorial, rendimiento deportivo
              y las investigaciones que están transformando la indumentaria
              deportiva.
            </p>
          </section>

          {/* FILTROS */}
          <section className="mb-12 flex justify-center">
            <Suspense
              fallback={<div className="h-10 w-full max-w-md bg-white/5 rounded-full" />}
            >
              <BlogFilters />
            </Suspense>
          </section>

          {/* ARTÍCULO PRINCIPAL */}
          {isFirstPage && mainArticle && (
            <section className="mb-16">
              <PostCard post={mainArticle} featured />
            </section>
          )}

          {/* LISTADO DE POSTS */}
          {secondaryPosts.length > 0 ? (
            <>
              {isFirstPage && mainArticle && (
                <div className="mb-8">
                  <h2 className="text-xs tracking-[0.3em] uppercase text-white/40 font-medium">
                    Todos los artículos
                  </h2>
                </div>
              )}

              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {secondaryPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </section>

              {/* PAGINACIÓN */}
              {pagination.totalPages > 1 && (
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  searchParams={searchParams}
                />
              )}
            </>
          ) : (
            <EmptyState />
          )}

          {/* CTA FINAL */}
          <section className="mt-24 text-center space-y-6 py-16 border-t border-white/5">
            <p className="text-[#FF5A36] text-xs tracking-[0.3em] uppercase font-medium">
              Conoce BESTIGE
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight max-w-2xl mx-auto">
              La única del mundo con tecnología somatosensorial interna
            </h2>
            <p className="text-white/60 text-base max-w-xl mx-auto">
              Diseñada en Colombia. Probada en las carreteras más exigentes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/products/cycling"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5A36] text-white text-sm font-bold tracking-wide rounded-full hover:bg-[#FF5A36]/90 transition-all hover:gap-3"
              >
                Ver badana de ciclismo
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/products/running"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-bold tracking-wide rounded-full hover:border-[#FF5A36] hover:text-[#FF5A36] transition-all"
              >
                Ver badana de running
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

// ============================================
// COMPONENTES INTERNOS
// ============================================

function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}) {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== 'page' && value) params.set(key, value);
    });
    params.set('page', String(page));
    return `/blog?${params.toString()}`;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-16">
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1)}
          className="px-4 py-2 text-sm border border-white/10 rounded-full text-white/70 hover:border-[#FF5A36] hover:text-[#FF5A36] transition-colors"
        >
          ← Anterior
        </Link>
      )}

      <span className="px-4 py-2 text-sm text-white/40">
        Página {currentPage} de {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={buildUrl(currentPage + 1)}
          className="px-4 py-2 text-sm border border-white/10 rounded-full text-white/70 hover:border-[#FF5A36] hover:text-[#FF5A36] transition-colors"
        >
          Siguiente →
        </Link>
      )}
    </nav>
  );
}

function EmptyState() {
  return (
    <section className="text-center py-20">
      <div className="max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-white">
          Aún no hay artículos publicados
        </h2>
        <p className="text-white/60">
          Estamos preparando contenido científico y guías para ti. Vuelve
          pronto.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 text-[#FF5A36] hover:underline text-sm"
        >
          ← Volver a la tienda
        </Link>
      </div>
    </section>
  );
}