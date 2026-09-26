import { Router, Request, Response } from 'express';
import { logger } from '../../lib/logger/logger';

const router = Router();

/**
 * Webhook de Wompi
 * Recibe notificaciones cuando un pago cambia de estado
 */
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const event = req.body;
    logger.info({ event: event.event }, '🎯 Webhook Wompi recibido');

    // Responder 200 OK (Wompi requiere esto)
    res.status(200).json({ received: true });
  } catch (error) {
    logger.error({ error }, '❌ Error procesando webhook Wompi');
    res.status(500).json({ error: 'Internal error' });
  }
});

export default router;