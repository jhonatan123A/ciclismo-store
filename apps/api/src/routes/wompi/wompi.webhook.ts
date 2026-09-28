import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { logger } from '../../lib/logger/logger';
import { prisma } from '../../lib/prisma/client';
import { sendOrderEmails } from '../../lib/email/send-order-emails';

const router = Router();

// ============================================
// VALIDACIÓN DE FIRMA DE WOMPI (BLINDADA)
// ============================================
// Algoritmo oficial de Wompi:
// SHA256( valores según signature.properties + timestamp + events_secret )
//
// Referencia: https://docs.wompi.co/docs/colombia/eventos/
function validateWompiSignature(event: any): boolean {
  try {
    const eventsSecret = process.env.WOMPI_EVENTS_SECRET?.trim();

    if (!eventsSecret) {
      logger.error('❌ WOMPI_EVENTS_SECRET no configurada');
      return false;
    }

    const { signature, timestamp } = event;

    if (!signature?.checksum || !signature?.properties || timestamp === undefined) {
      logger.error(
        {
          hasChecksum: !!signature?.checksum,
          hasProperties: !!signature?.properties,
          timestamp,
        },
        '❌ Firma incompleta'
      );
      return false;
    }

    // ─── 1. LIMPIAR EL CHECKSUM RECIBIDO ────────────────────────
    // Wompi a veces envía el checksum con espacios o caracteres
    // invisibles si se copia/pega mal. Lo limpiamos.
    const receivedChecksum = String(signature.checksum)
      .trim()
      .replace(/[\u200B-\u200D\uFEFF]/g, '');

    // 🔍 Forense: ver exactamente qué llegó
    logger.info(
      {
        checksum_length: receivedChecksum.length,
        checksum_raw: JSON.stringify(signature.checksum),
        checksum_first_10: receivedChecksum.substring(0, 10),
        checksum_last_10: receivedChecksum.substring(receivedChecksum.length - 10),
        checksum_charCodes: [...receivedChecksum].map((c) => c.charCodeAt(0)),
        properties: signature.properties,
        timestamp,
        timestamp_type: typeof timestamp,
        secretPrefix: eventsSecret.substring(0, 12) + '...',
        secretLength: eventsSecret.length,
      },
      '🔍 FORENSICS — checksum recibido'
    );

    // Un SHA256 SIEMPRE tiene 64 caracteres hex. Si no, algo está mal.
    if (receivedChecksum.length !== 64) {
      logger.error(
        {
          length: receivedChecksum.length,
          raw: JSON.stringify(signature.checksum),
        },
        '❌ Checksum recibido no tiene 64 caracteres (no es un SHA256 válido). ' +
          'Posible: secret incorrecto, ambiente cruzado, o Wompi envió basura.'
      );
      return false;
    }

    // ─── 2. EXTRAER VALORES EN EL ORDEN DE signature.properties ─
    const rawValues: any[] = [];
    const valuesForLog: string[] = [];

    for (const property of signature.properties) {
      const parts = property.split('.');
      let value: any = event;

      for (const part of parts) {
        value = value?.[part];
      }

      if (value === undefined || value === null) {
        logger.error({ property }, '❌ Propiedad no encontrada en el webhook');
        return false;
      }

      rawValues.push(value);
      valuesForLog.push(`${property}=${String(value)} (${typeof value})`);
    }

    const values = rawValues.map((v) => String(v).trim()).join('');

    // ─── 3. CONSTRUIR LA CADENA A HASHEAR ───────────────────────
    // Orden oficial: valores + timestamp + events_secret
    const stringToHash = values + String(timestamp).trim() + eventsSecret;

    logger.info(
      {
        valuesForLog,
        valuesConcatenated: values,
        stringToHash,
        stringToHashLength: stringToHash.length,
      },
      '🔍 DEBUG FIRMA — string completo a hashear'
    );

    // ─── 4. CALCULAR SHA256 ─────────────────────────────────────
    const calculatedChecksum = crypto
      .createHash('sha256')
      .update(stringToHash)
      .digest('hex');

    const isValid = calculatedChecksum === receivedChecksum;

    logger.info(
      {
        expected: receivedChecksum,
        calculated: calculatedChecksum,
        match: isValid,
      },
      isValid
        ? '✅ FIRMA VÁLIDA'
        : '❌ FIRMA INVÁLIDA — comparación final'
    );

    if (!isValid) {
      logger.warn(
        {
          expected: receivedChecksum,
          calculated: calculatedChecksum,
          valuesUsed: {
            id: event?.data?.transaction?.id,
            status: event?.data?.transaction?.status,
            amount_in_cents: event?.data?.transaction?.amount_in_cents,
            timestamp,
          },
        },
        '🚫 Firma de webhook inválida'
      );
    }

    return isValid;
  } catch (error: any) {
    logger.error(
      { error: error?.message, stack: error?.stack },
      '❌ Error validando firma de Wompi'
    );
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

    // 1. Validar firma
    if (!validateWompiSignature(event)) {
      logger.warn('🚫 Webhook rechazado: firma inválida');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // 2. Solo procesar transaction.updated
    if (event.event !== 'transaction.updated') {
      logger.info(
        { event: event.event },
        '⏭️  Evento ignorado (no es transaction.updated)'
      );
      return res.status(200).json({ received: true, ignored: true });
    }

    const transaction = event.data?.transaction;
    if (!transaction) {
      logger.warn('⚠️  Webhook sin datos de transacción');
      return res.status(200).json({ received: true });
    }

    const {
      reference,
      status: wompiStatus,
      id: transactionId,
      amount_in_cents,
    } = transaction;

    logger.info(
      { reference, wompiStatus, transactionId, amount_in_cents },
      '📊 Procesando transacción de Wompi'
    );

    // 3. Buscar la orden por referencia
    const order = await prisma.order.findFirst({
      where: { paymentId: reference },
      include: { items: true },
    });

    if (!order) {
      logger.warn({ reference }, '⚠️  Orden no encontrada para esta referencia');
      return res.status(200).json({ received: true, orderFound: false });
    }

    // 4. Mapear estado
    const { status, paymentStatus } = mapWompiStatusToOrderStatus(wompiStatus);

    // 5. Idempotencia
    if (order.status === status && order.paymentStatus === paymentStatus) {
      logger.info({ reference }, '✅ Orden ya estaba en el estado correcto');
      return res.status(200).json({ received: true, alreadyProcessed: true });
    }

    // 6. Actualizar orden
    const metadata = (order.metadata as any) || {};
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status,
        paymentStatus,
        paymentId: transactionId,
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

    // 7. Emails si fue aprobado (solo la primera vez)
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
        logger.info(
          { orderNumber: order.orderNumber },
          '✅ Emails enviados desde webhook'
        );
      } catch (emailError) {
        logger.error(
          { emailError },
          '❌ Error enviando emails desde webhook'
        );
      }
    }

    return res.status(200).json({ received: true, processed: true });
  } catch (error: any) {
    logger.error(
      { error: error?.message, stack: error?.stack },
      '❌ Error procesando webhook Wompi'
    );
    return res.status(200).json({ received: true, error: 'Processing failed' });
  }
});

export default router;