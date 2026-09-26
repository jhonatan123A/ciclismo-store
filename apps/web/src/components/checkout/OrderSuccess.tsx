'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Check,
  ArrowRight,
  MessageCircle,
  Package,
  Mail,
  Clock,
  MapPin,
  ShoppingBag,
} from 'lucide-react';
import { generateOrderWhatsAppLink } from '@/lib/whatsapp';

interface OrderSuccessProps {
  orderNumber?: string;
  customerName?: string;
  customerEmail?: string;
  total?: number;
  items?: Array<{
    name: string;
    quantity: number;
    size?: string;
    color?: string;
  }>;
  shippingAddress?: {
    city?: string;
    department?: string;
  };
}

export function OrderSuccess({
  orderNumber,
  customerName,
  customerEmail,
  total,
  items = [],
  shippingAddress,
}: OrderSuccessProps) {
  const whatsappLink = orderNumber
    ? generateOrderWhatsAppLink({
        orderNumber,
        customerName: customerName || 'Cliente',
        total: total || 0,
        items,
      })
    : '';

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 flex items-center justify-center overflow-hidden">
      {/* Glow triádico de fondo */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#FF5A36]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E8B94A]/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        {/* Ícono de éxito */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF5A36]/20 to-[#38BDF8]/20 border-2 border-[#FF5A36]/40 flex items-center justify-center mx-auto mb-6 shadow-[0_0_60px_rgba(255,90,54,0.4)]">
            <Check className="w-12 h-12 text-[#FF5A36]" />
          </div>
          <p className="text-eyebrow text-[#FF5A36] mb-3 tracking-[0.3em]">
            PAGO CONFIRMADO
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            ¡Gracias por tu compra!
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto">
            Tu pedido ha sido procesado correctamente. Recibirás un correo con el
            número de seguimiento.
          </p>
        </div>

        {/* Info del pedido */}
        {orderNumber && (
          <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Número de pedido */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FF5A36]/10 border border-[#FF5A36]/20 flex items-center justify-center text-[#FF5A36] flex-shrink-0">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">
                    NÚMERO DE PEDIDO
                  </p>
                  <p className="text-white font-bold text-sm break-all">
                    {orderNumber}
                  </p>
                </div>
              </div>

              {/* Total */}
              {total !== undefined && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8] flex-shrink-0">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">
                      TOTAL PAGADO
                    </p>
                    <p className="text-white font-bold text-sm">
                      ${total.toLocaleString('es-CO')} COP
                    </p>
                  </div>
                </div>
              )}

              {/* Email */}
              {customerEmail && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E8B94A]/10 border border-[#E8B94A]/20 flex items-center justify-center text-[#E8B94A] flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">
                      CONFIRMACIÓN ENVIADA A
                    </p>
                    <p className="text-white font-medium text-xs break-all">
                      {customerEmail}
                    </p>
                  </div>
                </div>
              )}

              {/* Envío */}
              {shippingAddress && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C17A4B]/10 border border-[#C17A4B]/20 flex items-center justify-center text-[#C17A4B] flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">
                      ENVÍO A
                    </p>
                    <p className="text-white font-medium text-xs">
                      {shippingAddress.city}
                      {shippingAddress.department && `, ${shippingAddress.department}`}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Tiempo estimado */}
            <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#FF5A36]" />
              <p className="text-white/60 text-xs">
                Recibirás el número de guía por WhatsApp y correo cuando tu pedido esté en camino.
              </p>
            </div>
          </div>
        )}

        {/* WhatsApp destacado */}
        <div className="p-6 rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 flex-shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-base mb-1">
                ¿Alguna duda con tu pedido?
              </h3>
              <p className="text-white/60 text-xs leading-relaxed mb-4">
                Escríbenos por WhatsApp y te atendemos al instante. El mensaje ya viene con los datos de tu pedido.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Contactar por WhatsApp
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 px-6 py-3 btn-orange text-[10px] tracking-[0.2em] uppercase font-semibold"
          >
            <Package className="w-3.5 h-3.5" />
            Ver mis pedidos
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold border border-white/10 hover:border-[#FF5A36]/40 transition-all"
          >
            Volver al inicio
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}