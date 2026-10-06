// ============================================
// CONVERSIÓN DE PRECIOS BESTIGE
// ============================================

/**
 * Tipo de cambio COP → USD
 * 
 * Fijo por ahora. Cuando queramos conversión en vivo,
 * reemplazamos por un fetch a una API.
 */
const USD_EXCHANGE_RATE = 3200;

/**
 * Convierte un precio en COP a USD aproximado.
 */
export function copToUsd(cop: number): number {
  return Math.round(cop / USD_EXCHANGE_RATE);
}

/**
 * Formatea un precio en COP con el equivalente en USD.
 * 
 * Ejemplo: formatPriceWithUsd(640000) → "$640.000 COP (~$200 USD)"
 */
export function formatPriceWithUsd(cop: number): string {
  const copFormatted = cop.toLocaleString('es-CO');
  const usd = copToUsd(cop);
  return `$${copFormatted} COP (~$${usd} USD)`;
}

/**
 * Formatea solo COP.
 */
export function formatCop(cop: number): string {
  return `$${cop.toLocaleString('es-CO')}`;
}