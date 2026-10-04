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
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#FF5A36] transition-colors"
      >
        <ArrowLeft size={16} />
        Volver al blog
      </Link>

      {/* Categoría */}
      <div className="flex items-center gap-3 text-xs tracking-widest uppercase">
        <span className="text-[#FF5A36] font-bold">
          {getCategoryLabel(post.category)}
        </span>
        {post.isMainArticle && (
          <>
            <span className="text-white/30">·</span>
            <span className="text-[#E8B94A]">Artículo destacado</span>
          </>
        )}
      </div>

      {/* Título */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05]">
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

      {/* Imagen de portada */}
      {post.coverImage && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mt-8">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
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
              className="px-3 py-1 text-xs rounded-full bg-[#0F0F12] border border-white/10 text-white/60 hover:border-[#FF5A36]/40 hover:text-[#FF5A36] transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}