'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { PostCategory } from '@/lib/posts-api';
import { getCategoryLabel } from '@/lib/posts-api';

const CATEGORIES: PostCategory[] = [
  'TECNOLOGIA',
  'GUIAS',
  'COMPARATIVAS',
];

export function BlogFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') as PostCategory | null;

  const handleCategoryClick = (category: PostCategory | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    params.delete('page'); // resetear paginación
    router.push(`/blog${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => handleCategoryClick(null)}
        className={`px-4 py-2 text-xs tracking-widest uppercase rounded-full border transition-all ${
          !currentCategory
            ? 'bg-gradient-to-r from-[#BFAE85] to-[#8F7E45] border-[#BFAE85] text-black font-bold'
            : 'bg-transparent border-white/10 text-white/50 hover:border-[#BFAE85]/40 hover:text-white'
        }`}
      >
        Todos
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryClick(cat)}
          className={`px-4 py-2 text-xs tracking-widest uppercase rounded-full border transition-all ${
            currentCategory === cat
              ? 'bg-gradient-to-r from-[#BFAE85] to-[#8F7E45] border-[#BFAE85] text-black font-bold'
              : 'bg-transparent border-white/10 text-white/50 hover:border-[#BFAE85]/40 hover:text-white'
          }`}
        >
          {getCategoryLabel(cat)}
        </button>
      ))}
    </div>
  );
}