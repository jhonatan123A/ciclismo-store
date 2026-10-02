import type { Metadata } from 'next';
import ProductClient from './ProductClient';

const BASE_URL = 'https://www.bestige-somatosensory-norbertowilches.com';

export const metadata: Metadata = {
  title: 'Badana de Running BESTIGE — Activación Muscular y Recuperación',
  description: 'Badana de running con tecnología somatosensorial italiana. Activa tu musculatura, mejora la estabilidad y optimiza la recuperación. Envío gratis en Colombia.',
  keywords: [
    'badana de running',
    'ropa running colombia',
    'running premium',
    'activación muscular running',
    'recuperación muscular',
    'kinesio taping running',
    'bestige running',
  ],
  alternates: {
    canonical: '/products/running',
  },
  openGraph: {
    title: 'Badana de Running BESTIGE — Activación Muscular y Recuperación',
    description: 'Tecnología somatosensorial italiana. Activación muscular, estabilidad y recuperación optimizada.',
    url: `${BASE_URL}/products/running`,
    type: 'website',
    images: [
      {
        url: '/images/products/running/running-main.jpg',
        width: 1200,
        height: 1200,
        alt: 'Badana de Running BESTIGE',
      },
    ],
  },
};

const productSchema = {
  '@context': 'https://schema.org/',
  '@type': 'Product',
  name: 'Badana de Running BESTIGE',
  description:
    'Badana de running con tecnología somatosensorial italiana. Activa tu musculatura, mejora la estabilidad y optimiza la recuperación.',
  image: [
    `${BASE_URL}/images/products/running/running-main.jpg`,
    `${BASE_URL}/images/products/running/running-detail1.jpg`,
  ],
  brand: {
    '@type': 'Brand',
    name: 'BESTIGE',
  },
  sku: 'BESTIGE-RUNNING-001',
  // ✅ NUEVO: Rating real (2 reviews, promedio 5.0)
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '2',
    bestRating: '5',
    worstRating: '1',
  },
  offers: {
    '@type': 'Offer',
    url: `${BASE_URL}/products/running`,
    priceCurrency: 'COP',
    price: '399000',
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    seller: {
      '@type': 'Organization',
      name: 'FITHAB INNOVATION CI SAS',
    },
    // ✅ NUEVO: Detalles de envío (gratis en Colombia)
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingRate: {
        '@type': 'MonetaryAmount',
        value: '0',
        currency: 'COP',
      },
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: 'CO',
      },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: {
          '@type': 'QuantitativeValue',
          minValue: 1,
          maxValue: 2,
          unitCode: 'DAY',
        },
        transitTime: {
          '@type': 'QuantitativeValue',
          minValue: 3,
          maxValue: 7,
          unitCode: 'DAY',
        },
      },
    },
    // ✅ NUEVO: Política de devoluciones (30 días)
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'CO',
      returnPolicyCategory:
        'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 30,
      returnMethod: 'https://schema.org/ReturnByMail',
      returnFees: 'https://schema.org/FreeReturn',
    },
  },
};

export default function RunningProductPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductClient />
    </>
  );
}