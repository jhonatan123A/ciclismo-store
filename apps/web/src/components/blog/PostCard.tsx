import Link from 'next/link';
import Image from 'next/image';
import { Clock, Eye } from 'lucide-react';
import type { PostListItem } from '@/lib/posts-api';
import { formatPostDate, getCategoryLabel } from '@/lib/posts-api';

interface PostCardProps {
  post: PostListItem;
  /** Si es true, se muestra en formato grande (artículo principal) */
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const href = `/blog/${post.slug}`;

  if (featured) {
    return (
      <Link
        href={href}
        className="group block relative overflow-hidden rounded-2xl bg-[#0F0F12] border border-white/5 transition-all duration-500 hover:border-[#FF5A36]/40 hover:shadow-[0_0_40px_-10px_rgba(255,90,54,0.4)]"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1f] to-[#0F0F12]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        <div className="p-8 md:p-10 space-y-4">
          <div className="flex items-center gap-3 text-xs tracking-widest uppercase">
            <span className="text-[#FF5A36]">
              {getCategoryLabel(post.category)}
            </span>
            <span className="text-white/30">·</span>
            <span className="text-white/50">
              Artículo destacado
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight group-hover:text-[#FF5A36] transition-colors">
            {post.title}
          </h2>

          <p className="text-white/60 text-base leading-relaxed max-w-2xl">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 text-xs text-white/40 pt-2">
            <span>Por {post.authorName}</span>
            <span>·</span>
            {post.readingTime && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.readingTime} min
              </span>
            )}
            {post.publishedAt && (
              <>
                <span>·</span>
                <span>{formatPostDate(post.publishedAt)}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group block relative overflow-hidden rounded-xl bg-[#0F0F12] border border-white/5 transition-all duration-500 hover:border-[#FF5A36]/40 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1f] to-[#0F0F12]" />
        )}
      </div>

      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase">
          <span className="text-[#FF5A36]">
            {getCategoryLabel(post.category)}
          </span>
        </div>

        <h3 className="text-xl font-bold tracking-tight text-white leading-snug group-hover:text-[#FF5A36] transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-3 text-[11px] text-white/40 pt-2">
          {post.readingTime && (
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.readingTime} min
            </span>
          )}
          {post.showViews && post.views > 0 && (
            <>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Eye size={11} />
                {post.views}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}