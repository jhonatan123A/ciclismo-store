/**
 * Helper para trackear eventos en Google Analytics 4 y Meta Pixel.
 * Todos los eventos son opcionales: si GA o Meta no están cargados, no pasa nada.
 */

'use client';

// Tipos de eventos
export interface AnalyticsItem {
  item_id: string;      // productId
  item_name: string;    // nombre del producto
  item_category?: string; // "running" | "cycling"
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// ============================================
// HELPERS INTERNOS
// ============================================

function safeGtag(...args: any[]) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag(...args);
  }
}

function safeFbq(...args: any[]) {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq === 'function') {
    window.fbq(...args);
  }
}

// ============================================
// EVENTOS DE GOOGLE ANALYTICS 4
// ============================================

/**
 * Ver un producto.
 */
export function trackViewItem(product: {
  id: string;
  name: string;
  category: string;
  price: number;
}) {
  safeGtag('event', 'view_item', {
    currency: 'COP',
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: 1,
      },
    ],
  });

  safeFbq('track', 'ViewContent', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    value: product.price,
    currency: 'COP',
  });
}

/**
 * Agregar al carrito.
 */
export function trackAddToCart(item: AnalyticsItem) {
  safeGtag('event', 'add_to_cart', {
    currency: 'COP',
    value: item.price * item.quantity,
    items: [item],
  });

  safeFbq('track', 'AddToCart', {
    content_ids: [item.item_id],
    content_name: item.item_name,
    content_type: 'product',
    value: item.price * item.quantity,
    currency: 'COP',
  });
}

/**
 * Ver el carrito.
 */
export function trackViewCart(items: AnalyticsItem[], total: number) {
  safeGtag('event', 'view_cart', {
    currency: 'COP',
    value: total,
    items,
  });
}

/**
 * Iniciar checkout.
 */
export function trackBeginCheckout(items: AnalyticsItem[], total: number) {
  safeGtag('event', 'begin_checkout', {
    currency: 'COP',
    value: total,
    items,
  });

  safeFbq('track', 'InitiateCheckout', {
    content_ids: items.map((i) => i.item_id),
    value: total,
    currency: 'COP',
    num_items: items.length,
  });
}

/**
 * Agregar info de envío.
 */
export function trackAddShippingInfo(items: AnalyticsItem[], total: number) {
  safeGtag('event', 'add_shipping_info', {
    currency: 'COP',
    value: total,
    shipping_tier: 'standard',
    items,
  });
}

/**
 * Agregar info de pago.
 */
export function trackAddPaymentInfo(items: AnalyticsItem[], total: number, paymentMethod: string) {
  safeGtag('event', 'add_payment_info', {
    currency: 'COP',
    value: total,
    payment_type: paymentMethod,
    items,
  });

  safeFbq('track', 'AddPaymentInfo', {
    value: total,
    currency: 'COP',
    content_ids: items.map((i) => i.item_id),
  });
}

/**
 * Compra completada.
 */
export function trackPurchase(data: {
  transactionId: string;
  items: AnalyticsItem[];
  total: number;
  shipping?: number;
  tax?: number;
  coupon?: string;
}) {
  safeGtag('event', 'purchase', {
    transaction_id: data.transactionId,
    currency: 'COP',
    value: data.total,
    shipping: data.shipping || 0,
    tax: data.tax || 0,
    coupon: data.coupon || '',
    items: data.items,
  });

  safeFbq('track', 'Purchase', {
    value: data.total,
    currency: 'COP',
    content_ids: data.items.map((i) => i.item_id),
    num_items: data.items.reduce((sum, i) => sum + i.quantity, 0),
  });
}