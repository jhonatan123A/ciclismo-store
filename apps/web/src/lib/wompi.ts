/**
 * Utilidades para Wompi
 * Documentación: https://docs.wompi.co
 */

const WOMPI_API_URL = process.env.NEXT_PUBLIC_WOMPI_ENV === 'production'
  ? 'https://production.wompi.co/v1'
  : 'https://sandbox.wompi.co/v1';

interface WompiTransactionParams {
  amountInCents: number;
  currency: 'COP';
  customerEmail: string;
  reference: string;
  redirectUrl: string;
  customerData?: {
    fullName?: string;
    phoneNumber?: string;
    legalId?: string;
    legalIdType?: string;
  };
  shippingAddress?: {
    addressLine1: string;
    city: string;
    region: string;
    country: string;
    phoneNumber: string;
  };
}

interface WompiSignatureResponse {
  signature: string;
  publicKey: string;
  amountInCents: number;
  currency: string;
  reference: string;
  redirectUrl: string;
}

/**
 * Genera la firma de integridad para una transacción Wompi
 * Esta firma se genera del lado del servidor por seguridad
 */
export async function generateWompiSignature(
  reference: string,
  amountInCents: number,
  currency: string = 'COP'
): Promise<string> {
  const privateKey = process.env.WOMPI_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error('WOMPI_PRIVATE_KEY no está configurada');
  }

  // Concatenar según lo exige Wompi
  const concatenated = `${reference}${amountInCents}${currency}${privateKey}`;

  // Generar SHA256
  const encoder = new TextEncoder();
  const data = encoder.encode(concatenated);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

/**
 * Genera una referencia única para la transacción
 */
export function generateReference(prefix: string = 'BESTIGE'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Convierte pesos colombianos a centavos
 */
export function toCents(amountInPesos: number): number {
  return Math.round(amountInPesos * 100);
}

/**
 * Verifica la firma del webhook de Wompi
 */
export async function verifyWompiWebhook(
  event: any,
  receivedSignature: string
): Promise<boolean> {
  const eventsSecret = process.env.WOMPI_EVENTS_SECRET;
  if (!eventsSecret) {
    throw new Error('WOMPI_EVENTS_SECRET no está configurado');
  }

  // Wompi usa SHA256 de (properties + timestamp + events_secret)
  const { signature } = event;
  if (!signature) return false;

  const { checksum, properties } = signature;

  // Extraer valores de las propiedades
  const values = properties.map((prop: string) => {
    const keys = prop.split('.');
    let value: any = event.data;
    for (const key of keys) {
      value = value?.[key];
    }
    return String(value);
  });

  const concatenated = `${values.join('')}${event.timestamp}${eventsSecret}`;

  const encoder = new TextEncoder();
  const data = encoder.encode(concatenated);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex === checksum;
}

/**
 * Consulta el estado de una transacción por ID
 */
export async function getWompiTransaction(transactionId: string): Promise<any> {
  const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;
  if (!publicKey) {
    throw new Error('NEXT_PUBLIC_WOMPI_PUBLIC_KEY no está configurada');
  }

  const response = await fetch(`${WOMPI_API_URL}/transactions/${transactionId}`, {
    headers: {
      Authorization: `Bearer ${publicKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error al consultar transacción: ${response.statusText}`);
  }

  return response.json();
}