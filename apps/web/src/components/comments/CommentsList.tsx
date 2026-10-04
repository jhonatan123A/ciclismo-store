import { MessageCircle } from 'lucide-react';
import type { PostComment } from '@/lib/posts-api';
import { formatPostDate } from '@/lib/posts-api';

interface CommentsListProps {
  comments: PostComment[];
}

export function CommentsList({ comments }: CommentsListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-12 px-6 rounded-2xl bg-[#0F0F12]/50 border border-white/5">
        <MessageCircle
          size={32}
          className="mx-auto text-white/20 mb-3"
        />
        <p className="text-white/50 text-sm">
          Aún no hay comentarios. Sé el primero en opinar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <article
          key={comment.id}
          className="p-6 rounded-2xl bg-[#0F0F12]/50 border border-white/5"
        >
          {/* Header del comentario */}
          <header className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FF5A36]/10 border border-[#FF5A36]/30 flex items-center justify-center">
                <span className="text-[#FF5A36] text-sm font-bold">
                  {comment.authorName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">
                  {comment.authorName}
                </p>
                <p className="text-white/40 text-xs">
                  {formatPostDate(comment.createdAt)}
                </p>
              </div>
            </div>
          </header>

          {/* Contenido */}
          <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </p>

          {/* Respuesta del admin */}
          {comment.adminReply && (
            <div className="mt-5 pl-4 border-l-2 border-[#FF5A36] bg-[#050505]/50 py-3 pr-4 rounded-r-lg">
              <p className="text-[#FF5A36] text-xs font-bold tracking-wider uppercase mb-2">
                Respuesta de BESTIGE
              </p>
              <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                {comment.adminReply}
              </p>
              {comment.adminRepliedAt && (
                <p className="text-white/30 text-xs mt-2">
                  {formatPostDate(comment.adminRepliedAt)}
                </p>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}