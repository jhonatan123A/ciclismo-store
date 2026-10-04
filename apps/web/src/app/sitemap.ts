import type { MetadataRoute } from 'next';

// ============================================
// CONFIG
// ============================================

const BASE_URL = 'https://www.bestige-somatosensory-norbertowilches.com';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ciclismo-api.onrender.com';

// ============================================
// TIPOS AUXILIARES
// ============================================

interface PostFromAPI {
  slug: string;
  publishedAt: string | null;
  updatedAt: string;
}

// ============================================
// HELPER: Cargar posts publicados
// ============================================

async function fetchPublishedPosts(): Promise<PostFromAPI[]> {
  try {
    const res = await fetch(`${API_URL}/api/v1/posts?limit=100`, {
      // Revalidar cada 1 hora
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    // Si el backend falla, el sitemap sigue funcionando con las URLs estáticas
    console.warn('⚠️ No se pudieron cargar posts para el sitemap:', error);
    return [];
  }
}

// ============================================
// SITEMAP
// ============================================

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ── URLs estáticas ────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/products/cycling`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/products/running`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/technology`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/nosotros`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/orders`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terminos`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacidad`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // ── URLs dinámicas (posts) ────────────────────────
  const posts = await fetchPublishedPosts();
  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => post.slug && post.publishedAt)
    .map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  // ── Unir todo ────────────────────────────────────
  return [...staticRoutes, ...postRoutes];
}