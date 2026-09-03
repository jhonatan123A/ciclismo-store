import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { asyncHandler, AppError } from '../../middleware/error-handler';
import { prisma } from '../../lib/prisma/client';
import { logger } from '../../lib/logger/logger';
import { env } from '../../config/env';
import { loginSchema, registerSchema } from '../../schemas/auth.schema';

const router = Router();

// POST /api/v1/auth/login
router.post('/login', asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);
  
  const user = await prisma.user.findUnique({
    where: { email },
  });
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    logger.warn({ email }, 'Failed login attempt');
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // CORREGIDO: jwt.sign correctamente con 3 parámetros
  const token = jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    env.JWT_SECRET,
    { 
      expiresIn: env.JWT_EXPIRATION || '7d' 
    }
  );
  
  // Guardar sesión
  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
  
  logger.info({ userId: user.id, email: user.email }, 'User logged in');
  
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  });
}));

// POST /api/v1/auth/register
router.post('/register', asyncHandler(async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = registerSchema.parse(req.body);
  
  const existing = await prisma.user.findUnique({
    where: { email },
  });
  
  if (existing) {
    return res.status(409).json({ error: 'User already exists' });
  }
  
  const passwordHash = await bcrypt.hash(password, 12);
  
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      firstName,
      lastName,
      role: 'CUSTOMER',
    },
  });
  
  logger.info({ userId: user.id, email: user.email }, 'User registered');
  
  res.status(201).json({
    message: 'User created successfully',
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
}));

// POST /api/v1/auth/logout
router.post('/logout', asyncHandler(async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (token) {
    await prisma.session.deleteMany({
      where: { token },
    });
  }
  
  res.json({ message: 'Logged out successfully' });
}));

// GET /api/v1/auth/me
router.get('/me', asyncHandler(async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const session = await prisma.session.findUnique({
    where: { token },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
        },
      },
    },
  });
  
  if (!session || session.expiresAt < new Date()) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
  
  res.json(session.user);
}));

export default router;