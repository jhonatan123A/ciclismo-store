'use client';

import { useState } from 'react';
import { CreditCard, Globe } from 'lucide-react';
import { WompiButton } from './WompiButton';
import { PayPalButton } from './PayPalButton';

interface PaymentMethodsProps {
  totalPrice: number;
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
  // ✅ NUEVA PROP: se pasa al WompiButton para crear la orden antes de pagar
  onBeforePayment?: () => Promise<{ orderNumber: string } | null>;
  onPaymentSuccess: (transactionId: string) => void;
  onPaymentError: (error: string) => void;
}

type PaymentMethod = 'wompi' | 'paypal';

export function PaymentMethods({
  totalPrice,
  customerEmail = 'cliente@bestige.com',
  customerName = 'Cliente Bestige',
  customerPhone,
  onBeforePayment,
  onPaymentSuccess,
  onPaymentError,
}: PaymentMethodsProps) {
  const [method, setMethod] = useState<PaymentMethod>('wompi');

  return (
    <div className="space-y-4">
      {/* Tabs de método de pago */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-white/5 border border-white/10">
        <button
          onClick={() => setMethod('wompi')}
          className={`
            flex items-center justify-center gap-2 py-3 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all
            ${method === 'wompi'
              ? 'bg-gradient-to-r from-[#FF5A36] to-[#C17A4B] text-white shadow-[0_0_30px_rgba(255,90,54,0.3)]'
              : 'text-white/60 hover:text-white'
            }
          `}
        >
          <CreditCard className="w-3.5 h-3.5" />
          Wompi
        </button>
        <button
          onClick={() => setMethod('paypal')}
          className={`
            flex items-center justify-center gap-2 py-3 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all
            ${method === 'paypal'
              ? 'bg-gradient-to-r from-[#38BDF8] to-[#E8B94A] text-white shadow-[0_0_30px_rgba(56,189,248,0.3)]'
              : 'text-white/60 hover:text-white'
            }
          `}
        >
          <Globe className="w-3.5 h-3.5" />
          PayPal
        </button>
      </div>

      {/* Info del método seleccionado */}
      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
        {method === 'wompi' ? (
          <p className="text-[10px] text-white/50 leading-relaxed tracking-wide">
            <span className="text-[#FF5A36] font-medium">Pago local Colombia:</span>{' '}
            Tarjetas débito/crédito, PSE, Nequi, Bancolombia. Procesado por Wompi.
          </p>
        ) : (
          <p className="text-[10px] text-white/50 leading-relaxed tracking-wide">
            <span className="text-[#38BDF8] font-medium">Pago internacional:</span>{' '}
            Tarjetas de crédito/débito y saldo PayPal. Procesado por PayPal.
          </p>
        )}
      </div>

      {/* Botón correspondiente */}
      {method === 'wompi' ? (
        <WompiButton
          amountInPesos={totalPrice}
          customerEmail={customerEmail}
          customerName={customerName}
          customerPhone={customerPhone}
          onBeforePayment={onBeforePayment}
          onSuccess={onPaymentSuccess}
          onError={onPaymentError}
        />
      ) : (
        <PayPalButton
          totalPrice={totalPrice}
          onSuccess={onPaymentSuccess}
          onError={onPaymentError}
        />
      )}
    </div>
  );
}