/**
 * Utilidades para generar enlaces de WhatsApp
 */

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573123902958';

interface OrderWhatsAppData {
  orderNumber: string;
  customerName: string;
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    size?: string;
    color?: string;
  }>;
}

/**
 * Genera un enlace de WhatsApp con mensaje pre-llenado del pedido
 */
export function generateOrderWhatsAppLink(data: OrderWhatsAppData): string {
  const itemsText = data.items
    .map(
      (item) =>
        `• ${item.name}${item.size ? ` - Talla ${item.size}` : ''}${
          item.color ? ` - ${item.color}` : ''
        } x${item.quantity}`
    )
    .join('\n');

  const message = `¡Hola BESTIGE! 👋

Acabo de realizar un pedido y quiero confirmar los detalles:

📦 *Pedido:* ${data.orderNumber}
👤 *Nombre:* ${data.customerName}
💰 *Total:* $${data.total.toLocaleString('es-CO')} COP

*Productos:*
${itemsText}

¿Me pueden confirmar el estado de mi pedido? ¡Gracias!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Genera un enlace de WhatsApp general (sin pedido específico)
 */
export function generateGeneralWhatsAppLink(message?: string): string {
  const defaultMessage = message || '¡Hola BESTIGE! Necesito ayuda con mi pedido.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultMessage)}`;
}

/**
 * Abre WhatsApp en nueva pestaña
 */
export function openWhatsApp(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}