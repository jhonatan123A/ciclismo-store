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
        transformation: [
          { width: 800, height: 800, crop: 'limit' },
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