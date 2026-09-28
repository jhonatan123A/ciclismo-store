import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { logger } from '../../lib/logger/logger';
import { prisma } from '../../lib/prisma/client';
import { sendOrderEmails } from '../../lib/email/send-order-emails';

const router = Router();

// ============================================
// VALIDACIÓN DE FIRMA DE WOMPI
// ============================================
// Wompi firma cada webhook con el "events_secret".
// Esto evita que alguien pueda enviar webhooks falsos.
function validateWompiSignature(event: any): boolean {
  try {
    const eventsSecret = process.env.WOMPI_EVENTS_SECRET;

    if (!eventsSecret) {
      logger.error('❌ WOMPI_EVENTS_SECRET no está configurada');
      return false;
    }

    const { signature, data, timestamp } = event;

    if (!signature?.checksum || !signature?.properties || !timestamp) {
      logger.error('❌ Webhook sin firma completa');
      return false;
    }

    // Extraer los valores que Wompi usó para firmar
    const properties = signature.properties as string[];
    const values = properties.map((prop) => {
      const keys = prop.split('.');
      let value: any = data;
      for (const key of keys) {
        value = value?.[key];
      }
      return value;
    });

    // Concatenar valores + timestamp + secret
    const concatenated = values.join('') + timestamp + eventsSecret;

    // Calcular SHA256
    const calculatedSignature = crypto
      .createHash('sha256')
      .update(concatenated)
      .digest('hex');

    const isValid = calculatedSignature === signature.checksum;

    if (!isValid) {
      logger.warn(
        { expected: signature.checksum, calculated: calculatedSignature },
        '🚫 Firma de webhook inválida'
      );
    }

    return isValid;
  } catch (error) {
    logger.error({ error }, '❌ Error validando firma de Wompi');
    return false;
  }
}

// ============================================
// MAPEO DE ESTADOS DE WOMPI → ESTADOS INTERNOS
// ============================================
function mapWompiStatusToOrderStatus(wompiStatus: string): {
  status: string;
  paymentStatus: string;
} {
  switch (wompiStatus) {
    case 'APPROVED':
      return { status: 'PAID', paymentStatus: 'approved' };
    case 'DECLINED':
      return { status: 'CANCELLED', paymentStatus: 'declined' };
    case 'VOIDED':
      return { status: 'CANCELLED', paymentStatus: 'voided' };
    case 'ERROR':
      return { status: 'CANCELLED', paymentStatus: 'error' };
    case 'PENDING':
    default:
      return { status: 'PENDING', paymentStatus: 'pending' };
  }
}

// ============================================
// WEBHOOK
// ============================================
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const event = req.body;

    logger.info(
      { event: event?.event, transactionId: event?.data?.transaction?.id },
      '🎯 Webhook Wompi recibido'
    );

    // 1. Validar que el webhook realmente viene de Wompi
    if (!validateWompiSignature(event)) {
      logger.warn('🚫 Webhook rechazado: firma inválida');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // 2. Solo procesar eventos de transacciones
    if (event.event !== 'transaction.updated') {
      logger.info({ event: event.event }, '⏭️  Evento ignorado (no es transaction.updated)');
      return res.status(200).json({ received: true, ignored: true });
    }

    const transaction = event.data?.transaction;
    if (!transaction) {
      logger.warn('⚠️  Webhook sin datos de transacción');
      return res.status(200).json({ received: true });
    }

    const { reference, status: wompiStatus, id: transactionId, amount_in_cents } = transaction;

    logger.info(
      { reference, wompiStatus, transactionId, amount_in_cents },
      '📊 Procesando transacción de Wompi'
    );

    // 3. Buscar la orden en la DB por referencia
    const order = await prisma.order.findFirst({
      where: { paymentId: reference },
      include: { items: true },
    });

    if (!order) {
      logger.warn({ reference }, '⚠️  Orden no encontrada para esta referencia');
      return res.status(200).json({ received: true, orderFound: false });
    }

    // 4. Mapear estado de Wompi → estado interno
    const { status, paymentStatus } = mapWompiStatusToOrderStatus(wompiStatus);

    // 5. Si ya está en el estado correcto, no hacer nada (idempotencia)
    if (order.status === status && order.paymentStatus === paymentStatus) {
      logger.info({ reference }, '✅ Orden ya estaba en el estado correcto');
      return res.status(200).json({ received: true, alreadyProcessed: true });
    }

    // 6. Actualizar la orden
    const metadata = (order.metadata as any) || {};
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        status,
        paymentStatus,
        paymentId: transactionId, // Guardar el ID real de la transacción de Wompi
        metadata: {
          ...metadata,
          wompiTransactionId: transactionId,
          wompiStatus,
          wompiUpdatedAt: new Date().toISOString(),
        },
      },
    });

    logger.info(
      { orderNumber: order.orderNumber, status, paymentStatus },
      '✅ Orden actualizada desde webhook'
    );

    // 7. Si el pago fue aprobado, enviar emails (solo la primera vez)
    if (wompiStatus === 'APPROVED' && order.status !== 'PAID') {
      try {
        await sendOrderEmails({
          orderNumber: order.orderNumber,
          customerName: metadata.customerName || 'Cliente',
          customerEmail: metadata.customerEmail || '',
          customerPhone: metadata.customerPhone || '',
          shippingAddress: order.shippingAddress,
          items: order.items.map((item) => ({
            name: item.productName || 'Producto',
            quantity: item.quantity,
            size: item.size || 'M',
            color: item.color || 'Negro',
            price: item.price,
          })),
          subtotal: order.subtotal,
          shippingCost: order.shipping,
          total: order.total,
          paymentMethod: order.paymentMethod,
          paymentId: transactionId,
        });
        logger.info({ orderNumber: order.orderNumber }, '✅ Emails enviados desde webhook');
      } catch (emailError) {
        logger.error({ emailError }, '❌ Error enviando emails desde webhook');
        // No hacemos throw: ya actualizamos la orden, el email es secundario
      }
    }

    return res.status(200).json({ received: true, processed: true });
  } catch (error) {
    logger.error({ error }, '❌ Error procesando webhook Wompi');
    // Respondemos 200 igual para que Wompi no reintente infinitamente
    return res.status(200).json({ received: true, error: 'Processing failed' });
  }
});

export default router;