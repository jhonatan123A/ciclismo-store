import pino from 'pino';

const redactOptions = [
  'password',
  'passwordHash',
  'token',
  'authorization',
  '*.password',
  '*.passwordHash',
  '*.token',
  '*.authorization',
  'headers.authorization',
  'body.password',
  'body.passwordHash',
  'body.token',
];

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  redact: {
    paths: redactOptions,
    remove: true,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    env: process.env.NODE_ENV || 'development',
    service: 'ciclismo-api',
  },
  serializers: {
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
  transport: process.env.NODE_ENV !== 'production'
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
});

export default logger;