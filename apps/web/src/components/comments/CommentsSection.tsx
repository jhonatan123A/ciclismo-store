'use client';

import { useState } from 'react';
import { MessagesSquare } from 'lucide-react';
import { CommentsList } from './CommentsList';
import { CommentForm } from './CommentForm';
import type { PostComment } from '@/lib/posts-api';

interface CommentsSectionProps {
  postSlug: string;
  initialComments: PostComment[];
}

export function CommentsSection({
  postSlug,
  initialComments,
}: CommentsSectionProps) {
  const [comments, setComments] = useState<PostComment[]>(initialComments);

  return (
    <section className="space-y-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <MessagesSquare size={22} className="text-[#FF5A36]" />
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
          Comentarios
          {comments.length > 0 && (
            <span className="text-white/40 text-lg font-normal ml-2">
              ({comments.length})
            </span>
          )}
        </h2>
      </div>

      {/* Lista de comentarios */}
      <CommentsList comments={comments} />

      {/* Formulario */}
      <div className="pt-6">
        <CommentForm postSlug={postSlug} />
      </div>
    </section>
  );
}