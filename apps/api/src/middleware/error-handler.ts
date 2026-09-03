import { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger/logger';
import { env } from '../config/env';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  
  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isOperational = err instanceof AppError && err.isOperational;
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  
  logger.error({
    error: {
      name: err.name,
      message: err.message,
      stack: env.NODE_ENV === 'production' ? undefined : err.stack,
      ...(err instanceof AppError && { statusCode: err.statusCode }),
    },
    req: {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    },
  });
  
  res.status(statusCode).json({
    error: {
      message: env.NODE_ENV === 'production' 
        ? (isOperational ? err.message : 'Internal server error')
        : err.message,
      ...(env.NODE_ENV !== 'production' && { stack: err.stack }),
    },
  });
}

export function asyncHandler(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}