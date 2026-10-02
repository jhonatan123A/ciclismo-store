import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BESTIGE — Tecnología Somatosensorial',
    short_name: 'BESTIGE',
    description:
      'Prendas de running y ciclismo con tecnología somatosensorial italiana. Activación muscular, estabilidad y protección.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#FF5A36',
    orientation: 'portrait',
    lang: 'es-CO',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}