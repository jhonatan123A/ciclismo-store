import { Resend } from 'resend';
import { logger } from '../logger/logger';

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Dominio verificado en Resend
const FROM_EMAIL = 'BESTIGE <pedidos@bestige-somatosensory-norbertowilches.com>';
const ADMIN_EMAIL = 'bestigesomatosensorial@gmail.com';

// ✅ Dominio público (para armar el link de acceso al pedido)
const SITE_URL = 'https://bestige-somatosensory-norbertowilches.com';

interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: any;
  items: any[];
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  paymentId: string;
  // ✅ NUEVO: token de acceso (opcional, para el email del cliente)
  accessToken?: string;
}

function formatAddress(addr: any): string {
  const parts: string[] = [];
  if (addr?.address || addr?.street) parts.push(addr.address || addr.street);
  if (addr?.neighborhood) parts.push(`Barrio ${addr.neighborhood}`);
  const cityState: string[] = [];
  if (addr?.city) cityState.push(addr.city);
  if (addr?.department || addr?.state) cityState.push(addr.department || addr.state);
  if (addr?.country) cityState.push(addr.country);
  if (cityState.length > 0) parts.push(cityState.join(', '));
  if (addr?.zipCode) parts.push(`CP: ${addr.zipCode}`);
  return parts.join('<br>');
}

export async function sendCustomerEmail(data: OrderEmailData) {
  try {
    const itemsHtml = data.items
      .map(
        (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">
            ${item.name || 'Producto BESTIGE'}<br>
            <span style="color: #666; font-size: 12px;">
              ${item.size ? `Talla ${item.size} · ` : ''}${item.color || 'Negro'} · Cantidad ${item.quantity}
            </span>
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">
            $${(item.price * item.quantity).toLocaleString('es-CO')}
          </td>
        </tr>
      `
      )
      .join('');

    const addressHtml = formatAddress(data.shippingAddress);

    // ✅ Link con el token (si existe)
    const trackingUrl = data.accessToken
      ? `${SITE_URL}/orders?token=${data.accessToken}`
      : null;

    const html = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="UTF-8"><title>Pedido confirmado - BESTIGE</title></head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
          <div style="background: #000; padding: 30px; text-align: center;">
            <h1 style="color: #fff; margin: 0; letter-spacing: 4px;">BESTIGE</h1>
            <p style="color: #FF5A36; font-size: 10px; letter-spacing: 2px; margin: 5px 0 0 0;">TECNOLOGÍA SOMATOSENSORIAL</p>
          </div>
          <div style="background: #fff; padding: 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="width: 60px; height: 60px; background: #FF5A36; border-radius: 50%; margin: 0 auto 15px; line-height: 60px; text-align: center;">
                <span style="color: #fff; font-size: 30px;">✓</span>
              </div>
              <h2 style="color: #000; margin: 0;">¡Gracias por tu compra!</h2>
              <p style="color: #666; margin: 10px 0 0 0;">Tu pedido ha sido confirmado</p>
            </div>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; color: #666; font-size: 12px;">NÚMERO DE PEDIDO</p>
              <p style="margin: 5px 0 0 0; color: #000; font-size: 18px; font-weight: bold;">${data.orderNumber}</p>
            </div>

            ${trackingUrl ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="${trackingUrl}" style="display: inline-block; background: #FF5A36; color: #fff; padding: 14px 30px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 14px;">
                Ver mi pedido
              </a>
              <p style="margin: 15px 0 0 0; color: #999; font-size: 11px;">
                O copia este enlace en tu navegador:<br>
                <span style="color: #666; word-break: break-all; font-size: 10px;">${trackingUrl}</span>
              </p>
              <p style="margin: 12px 0 0 0; color: #999; font-size: 11px;">
                Este enlace es válido por 90 días.
              </p>
            </div>
            ` : ''}

            <h3 style="color: #000; margin-top: 30px;">Detalle del pedido</h3>
            <table style="width: 100%; border-collapse: collapse;">${itemsHtml}</table>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #eee;">
              <p style="margin: 8px 0; color: #666;"><span>Subtotal</span> <span style="float:right; color: #000;">$${data.subtotal.toLocaleString('es-CO')}</span></p>
              <p style="margin: 8px 0; color: #666;"><span>Envío</span> <span style="float:right; color: #000;">${data.shippingCost === 0 ? 'GRATIS' : `$${data.shippingCost.toLocaleString('es-CO')}`}</span></p>
              <p style="margin: 15px 0 0 0; padding-top: 15px; border-top: 2px solid #000;"><strong>TOTAL</strong> <span style="float:right; color: #FF5A36; font-weight: bold; font-size: 20px;">$${data.total.toLocaleString('es-CO')}</span></p>
            </div>
            <h3 style="color: #000; margin-top: 30px;">Dirección de envío</h3>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
              <p style="margin: 0; color: #000;">${data.customerName}</p>
              <p style="margin: 5px 0; color: #666; font-size: 14px;">${addressHtml}${data.shippingAddress?.references ? `<br><em>Referencias: ${data.shippingAddress.references}</em>` : ''}</p>
              <p style="margin: 10px 0 0 0; color: #666; font-size: 12px;">Teléfono: ${data.customerPhone}</p>
            </div>
            <div style="margin-top: 30px; padding: 20px; background: #FFF5F0; border-radius: 8px; border-left: 4px solid #FF5A36;">
              <p style="margin: 0; color: #FF5A36; font-weight: bold;">¿Qué sigue?</p>
              <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">Prepararemos tu pedido y te enviaremos el número de guía por WhatsApp y correo cuando esté en camino.</p>
            </div>
          </div>
          <div style="background: #000; padding: 20px; text-align: center;">
            <p style="color: #666; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} BESTIGE · FITHAB INNOVATION CI SAS</p>
            <p style="color: #666; font-size: 11px; margin: 10px 0 0 0;">¿Preguntas? Escríbenos a bestigesomatosensorial@gmail.com</p>
          </div>
        </body>
      </html>
    `;

    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.customerEmail,
      subject: `✓ Pedido ${data.orderNumber} confirmado - BESTIGE`,
      html,
    });

    if (response.error) {
      logger.error({ error: response.error }, '❌ Resend devolvió un error al enviar al cliente');
      return false;
    }

    logger.info({ orderNumber: data.orderNumber }, '✅ Email cliente enviado');
    return true;
  } catch (error) {
    logger.error({ error }, '❌ Error enviando email al cliente');
    return false;
  }
}

export async function sendAdminEmail(data: OrderEmailData) {
  try {
    const itemsHtml = data.items
      .map(
        (item) => `
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">
          ${item.name || 'Producto'} - ${item.size ? `Talla ${item.size} - ` : ''}${item.color || 'Negro'} x${item.quantity}
        </td></tr>
      `
      )
      .join('');

    const addressHtml = formatAddress(data.shippingAddress);

    const html = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="UTF-8"><title>🎉 Nuevo pedido - BESTIGE</title></head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #FF5A36; color: #fff; padding: 20px; text-align: center; border-radius: 8px;">
            <h1 style="margin: 0;">🎉 ¡NUEVO PEDIDO!</h1>
            <p style="margin: 5px 0 0 0;">${data.orderNumber}</p>
          </div>
          <div style="background: #fff; border: 1px solid #eee; padding: 20px; margin-top: 20px; border-radius: 8px;">
            <h2 style="color: #000;">Cliente</h2>
            <p><strong>Nombre:</strong> ${data.customerName}</p>
            <p><strong>Email:</strong> ${data.customerEmail}</p>
            <p><strong>Teléfono:</strong> ${data.customerPhone}</p>
            <h2 style="color: #000; margin-top: 20px;">Dirección</h2>
            <p>${addressHtml}${data.shippingAddress?.references ? `<br>Referencias: ${data.shippingAddress.references}` : ''}</p>
            <h2 style="color: #000; margin-top: 20px;">Productos</h2>
            <table style="width: 100%; border-collapse: collapse;">${itemsHtml}</table>
            <h2 style="color: #000; margin-top: 20px;">Totales</h2>
            <p><strong>Subtotal:</strong> $${data.subtotal.toLocaleString('es-CO')}</p>
            <p><strong>Envío:</strong> $${data.shippingCost.toLocaleString('es-CO')}</p>
            <p style="font-size: 20px; color: #FF5A36;"><strong>TOTAL: $${data.total.toLocaleString('es-CO')}</strong></p>
            <h2 style="color: #000; margin-top: 20px;">Pago</h2>
            <p><strong>Método:</strong> ${data.paymentMethod.toUpperCase()}</p>
            <p><strong>ID:</strong> ${data.paymentId}</p>
          </div>
        </body>
      </html>
    `;

    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🎉 Nuevo pedido ${data.orderNumber} - $${data.total.toLocaleString('es-CO')}`,
      html,
    });

    if (response.error) {
      logger.error({ error: response.error }, '❌ Resend devolvió un error al enviar al admin');
      return false;
    }

    logger.info({ orderNumber: data.orderNumber }, '✅ Email admin enviado');
    return true;
  } catch (error) {
    logger.error({ error }, '❌ Error enviando email al admin');
    return false;
  }
}

export async function sendOrderEmails(data: OrderEmailData) {
  // Promise.allSettled asegura que la falla en un correo no cancele el otro
  await Promise.allSettled([sendCustomerEmail(data), sendAdminEmail(data)]);
}

// ============================================
// ✅ NUEVO: EMAILS DE CAMBIO DE ESTADO (PANEL DE ADMIN)
// ============================================

interface StatusUpdateData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  newStatus: string;             // PROCESSING, SHIPPED, DELIVERED, CANCELLED
  trackingNumber?: string;       // Solo cuando está SHIPPED
  accessToken?: string;          // Para el botón "Ver mi pedido"
}

// Textos amigables por estado
function getStatusCopy(status: string): {
  emoji: string;
  title: string;
  message: string;
  color: string;
} {
  switch (status) {
    case 'PROCESSING':
      return {
        emoji: '📦',
        title: '¡Estamos preparando tu pedido!',
        message: 'Tu pedido está siendo empacado y en breve será despachado.',
        color: '#E8B94A',
      };
    case 'SHIPPED':
      return {
        emoji: '🚚',
        title: '¡Tu pedido está en camino!',
        message: 'Tu pedido ha sido despachado y está en ruta hacia tu dirección.',
        color: '#38BDF8',
      };
    case 'DELIVERED':
      return {
        emoji: '✅',
        title: '¡Tu pedido fue entregado!',
        message: 'Esperamos que disfrutes tu compra. ¡Gracias por confiar en BESTIGE!',
        color: '#10B981',
      };
    case 'CANCELLED':
      return {
        emoji: '❌',
        title: 'Tu pedido fue cancelado',
        message: 'Si tienes dudas sobre esta cancelación, contáctanos por WhatsApp.',
        color: '#EF4444',
      };
    default:
      return {
        emoji: '📋',
        title: 'Actualización de tu pedido',
        message: `El estado de tu pedido cambió a: ${status}`,
        color: '#FF5A36',
      };
  }
}

export async function sendStatusUpdateEmail(data: StatusUpdateData) {
  try {
    const copy = getStatusCopy(data.newStatus);
    const trackingUrl = data.accessToken
      ? `${SITE_URL}/orders?token=${data.accessToken}`
      : null;

    const html = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="UTF-8"><title>Actualización de tu pedido - BESTIGE</title></head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
          <div style="background: #000; padding: 30px; text-align: center;">
            <h1 style="color: #fff; margin: 0; letter-spacing: 4px;">BESTIGE</h1>
            <p style="color: #FF5A36; font-size: 10px; letter-spacing: 2px; margin: 5px 0 0 0;">TECNOLOGÍA SOMATOSENSORIAL</p>
          </div>
          <div style="background: #fff; padding: 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="width: 60px; height: 60px; background: ${copy.color}; border-radius: 50%; margin: 0 auto 15px; line-height: 60px; text-align: center;">
                <span style="color: #fff; font-size: 30px;">${copy.emoji}</span>
              </div>
              <h2 style="color: #000; margin: 0;">${copy.title}</h2>
              <p style="color: #666; margin: 10px 0 0 0;">${copy.message}</p>
            </div>

            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; color: #666; font-size: 12px;">NÚMERO DE PEDIDO</p>
              <p style="margin: 5px 0 0 0; color: #000; font-size: 18px; font-weight: bold;">${data.orderNumber}</p>
            </div>

            ${data.trackingNumber ? `
            <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; border-left: 4px solid #38BDF8; margin-bottom: 20px;">
              <p style="margin: 0; color: #38BDF8; font-weight: bold; font-size: 14px;">NÚMERO DE GUÍA</p>
              <p style="margin: 8px 0 0 0; color: #000; font-size: 18px; font-weight: bold; font-family: monospace;">${data.trackingNumber}</p>
              <p style="margin: 8px 0 0 0; color: #666; font-size: 12px;">Puedes rastrear tu pedido con este número en el sitio web de la transportadora.</p>
            </div>
            ` : ''}

            ${trackingUrl ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="${trackingUrl}" style="display: inline-block; background: #FF5A36; color: #fff; padding: 14px 30px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 14px;">
                Ver mi pedido
              </a>
            </div>
            ` : ''}

            <div style="margin-top: 30px; padding: 20px; background: #FFF5F0; border-radius: 8px; border-left: 4px solid #FF5A36;">
              <p style="margin: 0; color: #FF5A36; font-weight: bold;">¿Preguntas?</p>
              <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">Escríbenos a bestigesomatosensorial@gmail.com y te ayudamos.</p>
            </div>
          </div>
          <div style="background: #000; padding: 20px; text-align: center;">
            <p style="color: #666; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} BESTIGE · FITHAB INNOVATION CI SAS</p>
          </div>
        </body>
      </html>
    `;

    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.customerEmail,
      subject: `${copy.emoji} ${copy.title} - Pedido ${data.orderNumber}`,
      html,
    });

    if (response.error) {
      logger.error({ error: response.error }, '❌ Resend devolvió un error al enviar status update');
      return false;
    }

    logger.info(
      { orderNumber: data.orderNumber, status: data.newStatus },
      '✅ Email de cambio de estado enviado'
    );
    return true;
  } catch (error) {
    logger.error({ error }, '❌ Error enviando email de cambio de estado');
    return false;
  }
}