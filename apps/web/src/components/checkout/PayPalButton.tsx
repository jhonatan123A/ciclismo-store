'use client';

import { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Loader2 } from 'lucide-react';

interface PayPalButtonProps {
  totalPrice: number;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

export function PayPalButton({ totalPrice, onSuccess, onError }: PayPalButtonProps) {
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();
  const [isProcessing, setIsProcessing] = useState(false);

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-5 h-5 animate-spin text-[#38BDF8]" />
        <span className="ml-3 text-white/40 text-xs tracking-wider">
          Cargando PayPal...
        </span>
      </div>
    );
  }

  if (isRejected) {
    return (
      <div className="text-center py-4 rounded-lg border border-red-500/20 bg-red-500/5">
        <p className="text-red-400 text-xs mb-1">Error al cargar PayPal</p>
        <p className="text-white/40 text-[10px]">Verifica tu conexión</p>
      </div>
    );
  }

  if (!isResolved) return null;

  return (
    <>
      <PayPalButtons
        style={{
          layout: 'vertical',
          color: 'white',
          shape: 'pill',
          label: 'paypal',
          height: 45,
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: (totalPrice / 4000).toFixed(2),
                  currency_code: 'USD',
                },
                description: 'Compra BESTIGE',
              },
            ],
            intent: 'CAPTURE',
          });
        }}
        onApprove={async (data, actions) => {
          setIsProcessing(true);

          if (!actions.order) {
            setIsProcessing(false);
            onError('Error al procesar el pago. Intenta nuevamente.');
            return;
          }

          try {
            const details = await actions.order.capture();
            console.log('PayPal captura completada:', details);
            setIsProcessing(false);
            onSuccess?.(details.id || data.orderID || 'paypal-success');
          } catch (error) {
            console.error('Error en captura PayPal:', error);
            setIsProcessing(false);
            onError('Error al capturar el pago. Intenta nuevamente.');
          }
        }}
        onError={(err) => {
          console.error('Error PayPal:', err);
          onError('Error al procesar el pago con PayPal.');
          setIsProcessing(false);
        }}
        onCancel={() => {
          setIsProcessing(false);
        }}
      />

      {isProcessing && (
        <div className="flex items-center justify-center mt-4">
          <Loader2 className="w-4 h-4 animate-spin text-[#38BDF8]" />
          <span className="ml-2 text-white/40 text-xs">Procesando pago...</span>
        </div>
      )}
    </>
  );
}