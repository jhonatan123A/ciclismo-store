import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PostHeader } from '@/components/blog/PostHeader';
import { PostContent } from '@/components/blog/PostContent';
import { PostCard } from '@/components/blog/PostCard';
import { NeuralFrame } from '@/components/neural/NeuralFrame';
import { BlogReadingTip } from '@/components/conversion/BlogReadingTip';
import {
  getPostBySlug,
  getRelatedPosts,
  listComments,
} from '@/lib/posts-api';
import { CommentsSection } from '@/components/comments/CommentsSection';

// ============================================
// TIPOS
// ============================================

interface PageProps {
  params: {
    slug: string;
  };
}

// ============================================
// METADATA DINÁMICA (SEO)
// ============================================

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug, { countView: false }).catch(
    () => null
  );

  if (!post) {
    return {
      title: 'Artículo no encontrado | BESTIGE',
    };
  }

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;

  return {
    title: `${title} | Blog BESTIGE`,
    description,
    keywords: post.keywords.length > 0 ? post.keywords : undefined,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      authors: [post.authorName],
      images: post.coverImage
        ? [{ url: post.coverImage, alt: post.coverImageAlt || title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

// ============================================
// PÁGINA
// ============================================

export default async function PostPage({ params }: PageProps) {
  // Cargar post + relacionados + comentarios en paralelo
  const [post, relatedPosts, comments] = await Promise.all([
    getPostBySlug(params.slug, { countView: true }).catch(() => null),
    getRelatedPosts(params.slug, 3).catch(() => []),
    listComments(params.slug).catch(() => []),
  ]);

  if (!post) {
    notFound();
  }

  // Schema.org para SEO (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: post.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BESTIGE',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.bestige-somatosensory-norbertowilches.com/images/brand/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.bestige-somatosensory-norbertowilches.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NeuralFrame />

      <main className="min-h-screen pt-24 pb-32 px-6 relative">
        {/* Fondo neuronal sutil */}
        <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FF5A36]/5 via-transparent to-transparent" />
        </div>

        <article className="relative max-w-3xl mx-auto">
          {/* HEADER */}
          <PostHeader post={post} />

          {/* CONTENIDO (Markdown) */}
          <div className="mt-16">
            <PostContent content={post.content} />
          </div>

          {/* COMENTARIOS */}
          <div className="mt-24 pt-16 border-t border-white/5">
            <CommentsSection
              postSlug={post.slug}
              initialComments={comments}
            />
          </div>

          {/* CTA DESTACADO */}
          <section className="mt-24 py-16 px-8 rounded-2xl bg-gradient-to-br from-[#0F0F12] to-[#050505] border border-[#FF5A36]/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,90,54,0.15),_transparent_60%)]" />
            <div className="relative text-center space-y-6">
              <p className="text-[#FF5A36] text-xs tracking-[0.3em] uppercase font-medium">
                Conoce BESTIGE
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                La única del mundo con tecnología somatosensorial interna
              </h2>
              <p className="text-white/60 text-base max-w-xl mx-auto">
                Diseñada por y para deportistas. Probada en condiciones reales
                en Colombia, Europa y Norteamérica.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/products/cycling"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5A36] text-white text-sm font-bold tracking-wide rounded-full hover:bg-[#FF5A36]/90 transition-all hover:gap-3"
                >
                  Badana de ciclismo
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/products/running"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-bold tracking-wide rounded-full hover:border-[#FF5A36] hover:text-[#FF5A36] transition-all"
                >
                  Badana de running
                </Link>
              </div>
            </div>
          </section>
        </article>

        {/* ARTÍCULOS RELACIONADOS */}
        {relatedPosts.length > 0 && (
          <section className="relative max-w-6xl mx-auto mt-24 pt-16 border-t border-white/5">
            <div className="mb-10">
              <p className="text-[#FF5A36] text-xs tracking-[0.3em] uppercase font-medium mb-3">
                Sigue leyendo
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                Artículos relacionados
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <PostCard key={related.id} post={related} />
              ))}
            </div>
          </section>
        )}

        {/* ✅ Tips flotantes durante la lectura del blog */}
        <BlogReadingTip />
      </main>
    </>
  );
}