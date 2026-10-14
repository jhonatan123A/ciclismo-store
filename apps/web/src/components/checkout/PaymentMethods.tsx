'use client';

import { useState } from 'react';
import { CreditCard, Globe, MessageCircle } from 'lucide-react';
import { WompiButton } from './WompiButton';

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

// ✅ WhatsApp de atención internacional (mismo del footer y ShippingForm)
const WHATSAPP_NUMBER = '573236398318';

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

  // ✅ Link de WhatsApp para compra internacional
  const internationalWhatsAppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hola BESTIGE 👋 Quiero hacer una compra internacional. ¿Me pueden ayudar a completarla?'
  )}`;

  return (
    <div className="space-y-4">
      {/* Tabs de método de pago */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-white/5 border border-white/10">
        <button
          onClick={() => setMethod('wompi')}
          className={`
            flex items-center justify-center gap-2 py-3 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all
            ${method === 'wompi'
              ? 'bg-gradient-to-r from-[#BFAE85] to-[#8F7E45] text-black shadow-[0_0_30px_rgba(191,174,133,0.3)]'
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
              ? 'bg-[#BFAE85]/10 text-[#BFAE85] border border-[#BFAE85]/30'
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
            <span className="text-[#BFAE85] font-medium">Pago local Colombia:</span>{' '}
            Tarjetas débito/crédito, PSE, Nequi y Bancolombia. Procesado de forma segura por Wompi.
          </p>
        ) : (
          <p className="text-[10px] text-white/50 leading-relaxed tracking-wide">
            <span className="text-[#BFAE85] font-medium">Compra internacional:</span>{' '}
            PayPal estará disponible muy pronto. Mientras tanto, escríbenos por WhatsApp y te ayudamos a completar tu compra.
          </p>
        )}
      </div>

      {/* Contenido según método */}
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
        <div className="rounded-2xl border border-[#BFAE85]/20 bg-[#BFAE85]/[0.03] p-5 space-y-4">
          {/* Título */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#BFAE85]/70 font-semibold mb-2">
              Compra internacional
            </p>
            <h3 className="text-white font-bold text-base leading-snug">
              Termina tu compra por WhatsApp.
            </h3>
          </div>

          {/* Texto explicativo */}
          <p className="text-[11px] text-white/60 leading-relaxed">
            Te acompañamos paso a paso para completar el pago internacional y coordinar el envío de tu equipamiento BESTIGE.
          </p>

          {/* Botón WhatsApp */}
          <a
            href={internationalWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-[10px] tracking-[0.2em] uppercase font-semibold transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            Contactar por WhatsApp
          </a>

          {/* Badge */}
          <div className="flex items-center justify-center pt-2 border-t border-white/10">
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#BFAE85]/60">
              PayPal · Próximamente
            </span>
          </div>
        </div>
      )}
    </div>
  );
}