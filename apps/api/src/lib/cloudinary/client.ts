import { v2 as cloudinary } from 'cloudinary';
import { logger } from '../logger/logger';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  logger.warn('⚠️  CLOUDINARY_CLOUD_NAME no configurado. Reviews con foto fallarán.');
}

/**
 * Sube una imagen a Cloudinary.
 * @param fileBuffer El buffer del archivo
 * @returns La URL pública de la imagen
 */
export async function uploadReviewImage(fileBuffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'bestige/reviews',
        resource_type: 'image',
        // ✅ CAMBIO: NO recortar. Mantener proporción original.
        // - `crop: 'scale'` mantiene la proporción y solo redimensiona si excede el máximo.
        // - Máximo 1200px de ancho (fotos de móvil suelen ser 3000px+).
        // - `quality: 'auto:good'` balance entre calidad y peso.
        // - `fetch_format: 'auto'` sirve WebP/AVIF a navegadores modernos.
        transformation: [
          { width: 1200, height: 1200, crop: 'scale' },
          { quality: 'auto:good' },
          { fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) {
          logger.error({ error }, '❌ Error subiendo imagen a Cloudinary');
          return reject(error);
        }
        if (!result) {
          return reject(new Error('Cloudinary no devolvió resultado'));
        }
        resolve(result.secure_url);
      }
    );

    uploadStream.end(fileBuffer);
  });
}

export { cloudinary };