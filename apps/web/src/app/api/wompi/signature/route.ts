import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amountInCents, currency = 'COP', reference } = body;

    // ✅ AHORA: la reference es OBLIGATORIA y viene del frontend
    if (!reference || typeof reference !== 'string') {
      return NextResponse.json(
        { error: 'reference es requerida' },
        { status: 400 }
      );
    }

    const parsedAmount = Math.round(Number(amountInCents));

    if (!parsedAmount || parsedAmount <= 0) {
      return NextResponse.json(
        { error: 'amountInCents es requerido y debe ser mayor a 0' },
        { status: 400 }
      );
    }

    // Obtener Secreto de Integridad de Wompi
    const integrityKey = process.env.WOMPI_INTEGRITY_KEY;
    if (!integrityKey) {
      console.error('❌ WOMPI_INTEGRITY_KEY no está configurada');
      return NextResponse.json(
        { error: 'Llave de integridad no configurada en las variables de entorno' },
        { status: 500 }
      );
    }

    const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;
    if (!publicKey) {
      console.error('❌ NEXT_PUBLIC_WOMPI_PUBLIC_KEY no está configurada');
      return NextResponse.json(
        { error: 'Llave pública no configurada en las variables de entorno' },
        { status: 500 }
      );
    }

    // Concatenación según requerimiento Wompi: Reference + AmountInCents + Currency + IntegritySecret
    const amountStr = String(parsedAmount);
    const concatenated = `${reference}${amountStr}${currency}${integrityKey}`;

    // Generación del Hash SHA256
    const signature = crypto
      .createHash('sha256')
      .update(concatenated)
      .digest('hex');

    console.log('🔐 Firma Wompi Generada Con Éxito:');
    console.log('   Reference:', reference);
    console.log('   Amount (cents):', amountStr);
    console.log('   Currency:', currency);

    return NextResponse.json({
      signature,
      reference,
      amountInCents: parsedAmount,
      currency,
      publicKey,
    });
  } catch (error) {
    console.error('❌ Error generando firma Wompi:', error);
    return NextResponse.json(
      { error: 'Error al generar la firma' },
      { status: 500 }
    );
  }
}