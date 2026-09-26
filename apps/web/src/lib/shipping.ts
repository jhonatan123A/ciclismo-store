/**
 * Sistema de cálculo de envíos BESTIGE
 * 
 * Política:
 * - Envío GRATIS desde $250.000
 * - Pago: $10.000 a $25.000 según zona
 * - Cobertura: 3 niveles
 */

import { ShippingTier } from './colombia';

export const ENVIO_GRATIS_DESDE = 250000; // $250.000 COP

// Costos por tier (en COP)
export const COSTOS_ENVIO: Record<ShippingTier, number> = {
  1: 10000,  // Ciudades principales - $10.000
  2: 15000,  // Ciudades intermedias - $15.000
  3: 18000,  // Municipios con punto - $18.000
  4: 25000,  // Zonas rurales - $25.000
};

// Tiempos de entrega por tier (días hábiles)
export const TIEMPOS_ENTREGA: Record<ShippingTier, string> = {
  1: '1-2 días hábiles',
  2: '2-3 días hábiles',
  3: '3-4 días hábiles',
  4: '4-6 días hábiles',
};

// Descripción del método de entrega por tier
export const METODO_ENTREGA: Record<ShippingTier, string> = {
  1: 'Domicilio',
  2: 'Domicilio',
  3: 'Punto de recogida',
  4: 'Punto de recogida en ciudad cercana',
};

export interface ShippingInfo {
  costo: number;
  esGratis: boolean;
  tier: ShippingTier;
  tiempoEntrega: string;
  metodoEntrega: string;
  mensaje: string;
}

/**
 * Calcula el costo de envío según el subtotal y la zona
 */
export function calcularEnvio(
  subtotal: number,
  tier: ShippingTier
): ShippingInfo {
  // Envío gratis desde $250.000
  if (subtotal >= ENVIO_GRATIS_DESDE) {
    return {
      costo: 0,
      esGratis: true,
      tier,
      tiempoEntrega: TIEMPOS_ENTREGA[tier],
      metodoEntrega: METODO_ENTREGA[tier],
      mensaje: '🎉 ¡Envío GRATIS por compra superior a $250.000!',
    };
  }

  const costo = COSTOS_ENVIO[tier];
  const falta = ENVIO_GRATIS_DESDE - subtotal;

  return {
    costo,
    esGratis: false,
    tier,
    tiempoEntrega: TIEMPOS_ENTREGA[tier],
    metodoEntrega: METODO_ENTREGA[tier],
    mensaje: `Agrega $${falta.toLocaleString('es-CO')} más para envío GRATIS`,
  };
}

/**
 * Calcula el total final con envío
 */
export function calcularTotal(subtotal: number, tier: ShippingTier): {
  subtotal: number;
  envio: number;
  total: number;
} {
  const envioInfo = calcularEnvio(subtotal, tier);
  return {
    subtotal,
    envio: envioInfo.costo,
    total: subtotal + envioInfo.costo,
  };
}

/**
 * Obtiene el color del tier para UI
 */
export function getTierColor(tier: ShippingTier): string {
  switch (tier) {
    case 1:
      return '#FF5A36'; // Naranja (premium)
    case 2:
      return '#38BDF8'; // Cyan
    case 3:
      return '#E8B94A'; // Dorado
    case 4:
      return '#C17A4B'; // Cobre
  }
}

/**
 * Obtiene el ícono del tier
 */
export function getTierIcon(tier: ShippingTier): string {
  switch (tier) {
    case 1:
      return '🚀'; // Express
    case 2:
      return '📦'; // Estándar
    case 3:
      return '🏪'; // Punto
    case 4:
      return '📍'; // Ciudad cercana
  }
}