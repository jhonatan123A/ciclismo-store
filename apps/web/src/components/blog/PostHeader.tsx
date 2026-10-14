import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Eye } from 'lucide-react';
import type { Post } from '@/lib/posts-api';
import { formatPostDate, getCategoryLabel } from '@/lib/posts-api';

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="space-y-8">
      {/* Volver al blog */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#BFAE85] transition-colors"
      >
        <ArrowLeft size={16} />
        Volver al blog
      </Link>

      {/* Categoría */}
      <div className="flex items-center gap-3 text-xs tracking-widest uppercase">
        <span className="text-[#BFAE85] font-bold">
          {getCategoryLabel(post.category)}
        </span>
        {post.isMainArticle && (
          <>
            <span className="text-white/30">·</span>
            <span className="text-[#BFAE85]">Artículo destacado</span>
          </>
        )}
      </div>

      {/* Título */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 pb-2">
        <span>Por {post.authorName}</span>
        {post.readingTime && (
          <>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readingTime} min de lectura
            </span>
          </>
        )}
        {post.showViews && post.views > 0 && (
          <>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <Eye size={14} />
              {post.views} {post.views === 1 ? 'vista' : 'vistas'}
            </span>
          </>
        )}
        {post.publishedAt && (
          <>
            <span className="text-white/20">·</span>
            <span>{formatPostDate(post.publishedAt)}</span>
          </>
        )}
      </div>

      {/* Imagen de portada — natural, sin recorte */}
      {post.coverImage && (
        <div className="overflow-hidden rounded-2xl mt-8">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            width={1200}
            height={1600}
            className="w-full h-auto"
            priority
          />
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="px-3 py-1 text-xs rounded-full bg-[#0F0F12] border border-white/10 text-white/60 hover:border-[#BFAE85]/40 hover:text-[#BFAE85] transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}