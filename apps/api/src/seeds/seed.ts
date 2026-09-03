import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { env } from '../config/env';
import { logger } from '../lib/logger/logger';

const prisma = new PrismaClient();

async function seed() {
  logger.info('🌱 Starting seed...');
  
  try {
    // ============================================
    // 1. Crear usuario ADMIN
    // ============================================
    const adminEmail = env.ADMIN_EMAIL || 'admin@ciclismo.com';
    const adminPasswordHash = env.ADMIN_PASSWORD_HASH || await bcrypt.hash('Admin123!', 12);
    
    const admin = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        passwordHash: adminPasswordHash,
        firstName: 'Admin',
        lastName: 'Ciclismo',
        role: 'ADMIN',
        emailVerified: true,
      },
    });
    
    logger.info({ adminId: admin.id, email: admin.email }, '✅ Admin user created');

    // ============================================
    // 2. Crear usuario de prueba (CUSTOMER)
    // ============================================
    const testPassword = await bcrypt.hash('Test123!', 12);
    
    const testUser = await prisma.user.upsert({
      where: { email: 'test@ciclismo.com' },
      update: {},
      create: {
        email: 'test@ciclismo.com',
        passwordHash: testPassword,
        firstName: 'Test',
        lastName: 'User',
        role: 'CUSTOMER',
        emailVerified: true,
      },
    });
    
    logger.info({ userId: testUser.id, email: testUser.email }, '✅ Test user created');

    // ============================================
    // 3. Crear CATEGORÍAS
    // ============================================
    const categories = [
      { 
        name: 'Bicicletas', 
        slug: 'bicicletas', 
        description: 'Bicicletas de alta gama para ciclismo de ruta y montaña' 
      },
      { 
        name: 'Accesorios', 
        slug: 'accesorios', 
        description: 'Accesorios y complementos para ciclismo' 
      },
      { 
        name: 'Ropa', 
        slug: 'ropa', 
        description: 'Ropa técnica y casual para ciclismo' 
      },
      { 
        name: 'Componentes', 
        slug: 'componentes', 
        description: 'Componentes y repuestos para bicicletas' 
      },
      { 
        name: 'Cascos', 
        slug: 'cascos', 
        description: 'Cascos de seguridad para ciclismo' 
      },
    ];
    
    for (const cat of categories) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: cat,
      });
    }
    
    logger.info('✅ Categories created');

    // ============================================
    // 4. Crear PRODUCTOS de ejemplo
    // ============================================
    const categoryBicicletas = await prisma.category.findUnique({
      where: { slug: 'bicicletas' },
    });
    
    if (categoryBicicletas) {
      const products = [
        {
          name: 'Bicicleta Ruta Pro Carbon 2024',
          slug: 'bicicleta-ruta-pro-carbon-2024',
          description: 'Bicicleta de ruta profesional con cuadro de carbono ultraligero',
          longDescription: 'Cuadro de carbono T800, grupo Shimano Ultegra Di2, ruedas de carbono de 50mm.',
          price: 2999.99,
          compareAtPrice: 3499.99,
          stock: 10,
          images: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800'],
          tags: ['ruta', 'carbono', 'profesional'],
          status: 'PUBLISHED',
          categoryId: categoryBicicletas.id,
        },
        {
          name: 'Bicicleta MTB Enduro 2024',
          slug: 'bicicleta-mtb-enduro-2024',
          description: 'Bicicleta de montaña para enduro y descenso',
          price: 2499.99,
          compareAtPrice: 2899.99,
          stock: 8,
          images: ['https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800'],
          tags: ['mtb', 'enduro', 'montaña'],
          status: 'PUBLISHED',
          categoryId: categoryBicicletas.id,
        },
        {
          name: 'Bicicleta Urbana Eléctrica',
          slug: 'bicicleta-urbana-electrica',
          description: 'Bicicleta eléctrica para ciudad con motor de 250W',
          price: 1999.99,
          stock: 5,
          images: ['https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800'],
          tags: ['urbana', 'eléctrica', 'ciudad'],
          status: 'PUBLISHED',
          categoryId: categoryBicicletas.id,
        },
      ];
      
      for (const product of products) {
        await prisma.product.upsert({
          where: { slug: product.slug },
          update: {},
          create: product,
        });
      }
      
      logger.info('✅ Bicycle products created');
    }

    // ============================================
    // 5. Resumen final
    // ============================================
    const totalProducts = await prisma.product.count();
    const totalCategories = await prisma.category.count();
    const totalUsers = await prisma.user.count();
    
    logger.info({
      totalUsers,
      totalCategories,
      totalProducts,
    }, '🎉 Seed completed successfully!');
    
  } catch (error) {
    logger.error({ error }, '❌ Seed failed');
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed();