'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';

interface WompiButtonProps {
  amountInPesos: number;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  // ✅ NUEVA PROP: crea la orden y devuelve el orderNumber
  onBeforePayment?: () => Promise<{ orderNumber: string } | null>;
  onSuccess?: (transactionId: string) => void;
  onError?: (error: string) => void;
}

declare global {
  interface Window {
    WidgetCheckout: any;
  }
}

export function WompiButton({
  amountInPesos,
  customerEmail,
  customerName,
  customerPhone = '3000000000',
  onBeforePayment,   // ✅ NUEVA PROP
  onSuccess,
  onError,
}: WompiButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const scriptLoadedRef = useRef(false);

  // Cargar el script de Wompi una sola vez
  useEffect(() => {
    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    if (typeof window !== 'undefined' && window.WidgetCheckout) {
      setScriptReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.async = true;
    script.onload = () => {
      console.log('✅ Script de Wompi cargado exitosamente');
      setScriptReady(true);
    };
    script.onerror = () => {
      console.error('❌ Error cargando el script de Wompi');
      onError?.('Error al cargar la pasarela de pagos');
    };
    document.head.appendChild(script);
  }, [onError]);

  const handlePayment = async () => {
    if (!scriptReady || !window.WidgetCheckout) {
      onError?.('El sistema de pagos aún se está cargando. Intenta de nuevo.');
      return;
    }

    setIsLoading(true);

    try {
      const amountInCents = Math.round(amountInPesos * 100);

      // ✅ PASO A: Crear la orden en el backend ANTES de abrir Wompi
      if (!onBeforePayment) {
        throw new Error('onBeforePayment no configurado');
      }

      const orderResult = await onBeforePayment();
      if (!orderResult?.orderNumber) {
        throw new Error('No se pudo crear la orden. Intenta de nuevo.');
      }

      const orderNumber = orderResult.orderNumber;
      console.log('📦 Orden creada:', orderNumber);

      // ✅ PASO B: Pedir la firma SHA-256 usando el orderNumber como reference
      const response = await fetch('/api/wompi/signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amountInCents,
          currency: 'COP',
          reference: orderNumber,   // 👈 antes no se mandaba
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.signature || !data.publicKey || !data.reference) {
        throw new Error(data.error || 'Error al obtener las credenciales de pago');
      }

      const { signature, reference, publicKey } = data;
      const rawPhone = customerPhone.replace(/\D/g, '');
      const cleanPhone = rawPhone.length >= 10 ? rawPhone.slice(-10) : '3000000000';

      // 3. Instanciar el Widget usando transporte postMessage para evitar el 403 de CloudFront
      const checkout = new window.WidgetCheckout({
        currency: 'COP',
        amountInCents: amountInCents,
        reference: reference,
        publicKey: publicKey,
        signature: {
          integrity: signature,
        },
        bootstrapTransport: 'postmessage', // FIX: Evita que CloudFront bloquee la URL
        redirectUrl: `${window.location.origin}/checkout`,
        customerData: {
          email: customerEmail,
          fullName: customerName,
          phoneNumber: cleanPhone,
          phoneNumberPrefix: '+57',
        },
      });

      // 3. Abrir la ventana flotante de pago
      checkout.open((result: any) => {
        setIsLoading(false);
        const transaction = result?.transaction;

        if (!transaction) {
          onError?.('Pago no completado o ventana cerrada.');
          return;
        }

        if (transaction.status === 'APPROVED') {
          onSuccess?.(transaction.id);
        } else if (transaction.status === 'DECLINED') {
          onError?.('El pago fue rechazado. Por favor intenta con otro método.');
        } else if (transaction.status === 'VOIDED') {
          onError?.('El pago fue anulado.');
        } else {
          onError?.(`Estado de la transacción: ${transaction.status}`);
        }
      });
    } catch (error) {
      console.error('❌ Error en el pago Wompi:', error);
      setIsLoading(false);
      onError?.(error instanceof Error ? error.message : 'Error al procesar el pago');
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading || !scriptReady}
      className="
        w-full py-4 rounded-full font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300
        flex items-center justify-center gap-2
        bg-gradient-to-r from-[#FF5A36] to-[#C17A4B] text-white
        hover:shadow-[0_0_40px_rgba(255,90,54,0.4)]
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Abriendo Wompi...
        </>
      ) : !scriptReady ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Cargando Wompi...
        </>
      ) : (
        <>
          <ShieldCheck className="w-4 h-4" />
          Pagar con Wompi
        </>
      )}
    </button>
  );
}