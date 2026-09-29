import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { logger } from './lib/logger/logger';
import { errorHandler } from './middleware/error-handler';
import authRoutes from './routes/auth/auth.controller';
import productRoutes from './routes/products/products.controller';
import orderRoutes from './routes/orders/orders.controller';
import wompiRoutes from './routes/wompi/wompi.webhook';
import { prisma } from './lib/prisma/client';

const app = express();

// ✅ Confiar en el proxy de Render (necesario para express-rate-limit)
app.set('trust proxy', 1);

// ============================================
// 1. SEGURIDAD (OWASP Top 10 2025)
// ============================================

// Helmet - Cabeceras de seguridad
// ✅ CSP ajustada para permitir Wompi y PayPal
app.use(helmet({
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: [
        "'self'",
        "data:",
        "https://cdn.ciclismo-store.com",
        "https://checkout.wompi.co",
        "https://*.wompi.co",
        "https://www.paypal.com",
        "https://*.paypal.com",
        "https://www.paypalobjects.com",
      ],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://checkout.wompi.co",
        "https://*.wompi.co",
        "https://www.paypal.com",
        "https://*.paypal.com",
        "https://www.paypalobjects.com",
      ],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: [
        "'self'",
        "https://checkout.wompi.co",
        "https://*.wompi.co",
        "https://*.paypal.com",
        "https://*.paypalobjects.com",
        "https://ciclismo-api.onrender.com",
        "https://bestige-somatosensory-norbertowilches.com",
        "https://www.bestige-somatosensory-norbertowilches.com",
      ],
      frameSrc: [
        "'self'",
        "https://checkout.wompi.co",
        "https://*.wompi.co",
        "https://*.paypal.com",
      ],
      formAction: [
        "'self'",
        "https://checkout.wompi.co",
        "https://*.wompi.co",
        "https://*.paypal.com",
      ],
    },
  },
  // ✅ Permitir recursos cross-origin (necesario para Wompi y PayPal)
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  crossOriginOpenerPolicy: false,
}));

// Compresión
app.use(compression());

// CORS
app.use(cors({
  origin: env.ALLOWED_ORIGINS,
  credentials: true,
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.',
});
app.use('/api', limiter);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================
// 2. RUTAS
// ============================================

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: env.NODE_ENV,
  });
});

// Ready check (con DB)
app.get('/ready', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ready', database: 'connected' });
  } catch (error) {
    res.status(503).json({ status: 'not ready', database: 'disconnected' });
  }
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/wompi', wompiRoutes);

// ============================================
// 3. MANEJADOR DE ERRORES
// ============================================
app.use(errorHandler);

// ============================================
// 4. INICIAR SERVIDOR (con Graceful Shutdown)
// ============================================
const server = app.listen(env.PORT, () => {
  logger.info({
    port: env.PORT,
    env: env.NODE_ENV,
    version: process.env.npm_package_version,
  }, '🚀 Server started');
});

// Graceful Shutdown
const shutdown = async (signal: string) => {
  logger.info({ signal }, 'Received shutdown signal');
  
  server.close(async () => {
    logger.info('HTTP server closed');
    
    try {
      await prisma.$disconnect();
      logger.info('Database connections closed');
    } catch (error) {
      logger.error({ error }, 'Error closing database connections');
    }
    
    process.exit(0);
  });
  
  // Forzar cierre después de 10 segundos
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export default app;