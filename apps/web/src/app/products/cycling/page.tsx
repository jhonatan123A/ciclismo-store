import type { Metadata } from 'next';
import ProductClient from './ProductClient';

const BASE_URL = 'https://www.bestige-somatosensory-norbertowilches.com';

export const metadata: Metadata = {
  title: 'Badana de Ciclismo BESTIGE — Protección contra Caídas',
  description: 'Badana de ciclismo con tecnología somatosensorial italiana y protección patentada contra caídas. Activación muscular, estabilidad y seguridad al pedalear. Envío gratis en Colombia.',
  keywords: [
    'badana de ciclismo',
    'ropa ciclismo colombia',
    'ciclismo premium',
    'protección contra caídas ciclismo',
    'kinesio taping ciclismo',
    'bestige ciclismo',
  ],
  alternates: {
    canonical: '/products/cycling',
  },
  openGraph: {
    title: 'Badana de Ciclismo BESTIGE — Protección contra Caídas',
    description: 'Tecnología somatosensorial italiana + protección contra caídas. Activación muscular y estabilidad.',
    url: `${BASE_URL}/products/cycling`,
    type: 'website',
    images: [
      {
        url: '/images/products/cycling/cycling-main.jpg',
        width: 1200,
        height: 1200,
        alt: 'Badana de Ciclismo BESTIGE',
      },
    ],
  },
};

const productSchema = {
  '@context': 'https://schema.org/',
  '@type': 'Product',
  name: 'Badana de Ciclismo BESTIGE',
  description:
    'Badana de ciclismo con tecnología somatosensorial italiana y protección patentada contra caídas. Activación muscular, estabilidad y seguridad al pedalear.',
  image: [
    `${BASE_URL}/images/products/cycling/cycling-main.jpg`,
    `${BASE_URL}/images/products/cycling/cycling-detail1.jpg`,
  ],
  brand: {
    '@type': 'Brand',
    name: 'BESTIGE',
  },
  sku: 'BESTIGE-CYCLING-001',
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
    url: `${BASE_URL}/products/cycling`,
    priceCurrency: 'COP',
    price: '486400',
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

export default function CyclingProductPage() {
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