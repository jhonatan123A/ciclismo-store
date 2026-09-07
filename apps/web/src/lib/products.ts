export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'running' | 'cycling';
  description: string;
  longDescription: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  sizes: string[];
  colors: string[];
  technology: string;
  benefits: string[];
  features: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Banda de Running BESTIGE',
    slug: 'banda-running',
    category: 'running',
    description: 'Tecnología somatosensorial para activación muscular y recuperación',
    longDescription: 'Las prendas para running están diseñadas para activar la musculatura durante el ejercicio, mejorar la estabilidad muscular, favorecer el drenaje de líquidos y metabolitos, reducir la fatiga y optimizar la recuperación.',
    price: 399000,
    originalPrice: 529000,
    discount: 24,
    images: [
      '/images/products/running/running-main.jpg',
      '/images/products/running/running-detail1.jpg',
      '/images/products/running/running-detail2.jpg',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Negro', 'Gris', 'Café'],
    technology: 'Somatosensorial - Tecnología italiana que conecta con la piel enviando señales al sistema somatosensorial',
    benefits: [
      'Activación muscular durante el ejercicio',
      'Mejora la estabilidad muscular',
      'Favorece el drenaje de líquidos y metabolitos',
      'Reduce la fatiga y optimiza la recuperación',
    ],
    features: [
      'Tecnología patentada BESTIGE',
      'Inspirada en principios de Kinesio Taping',
      'Zonas de compresión integradas',
      'Libertad total de movimiento',
    ],
  },
  {
    id: '2',
    name: 'Banda de Ciclismo BESTIGE',
    slug: 'banda-ciclismo',
    category: 'cycling',
    description: 'Tecnología somatosensorial con protección contra caídas',
    longDescription: 'Además de los beneficios de activación, estabilidad y drenaje, BESTIGE incorpora una tecnología patentada de protección contra caídas, diseñada para disminuir la abrasión de la piel en caso de deslizamientos sobre el asfalto, brindando mayor seguridad al ciclista.',
    price: 399000,
    originalPrice: 529000,
    discount: 24,
    images: [
      '/images/products/cycling/cycling-main.jpg',
      '/images/products/cycling/cycling-detail1.jpg',
      '/images/products/cycling/cycling-detail2.jpg',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Negro', 'Gris', 'Café'],
    technology: 'Somatosensorial + Protección contra caídas - Tecnología italiana patentada',
    benefits: [
      'Activación muscular durante el ejercicio',
      'Mejora la estabilidad muscular',
      'Favorece el drenaje de líquidos y metabolitos',
      'Protección contra abrasión en caídas',
      'Mayor seguridad al ciclista',
    ],
    features: [
      'Tecnología patentada BESTIGE',
      'Inspirada en principios de Kinesio Taping',
      'Zonas de compresión integradas',
      'Protección contra caídas',
      'Libertad total de movimiento',
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: 'running' | 'cycling'): Product[] {
  return products.filter(p => p.category === category);
}