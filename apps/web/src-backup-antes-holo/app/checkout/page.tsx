'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Lock, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();
  const [isComplete, setIsComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Debug: Verificar estado de PayPal
  useEffect(() => {
    console.log('PayPal Status:', { isPending, isResolved, isRejected });
    console.log('Total Price:', totalPrice);
    console.log('Items:', items.length);
  }, [isPending, isResolved, isRejected, totalPrice, items]);

  if (items.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <p className="text-eyebrow text-[#FF7A5C] mb-6 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#FF7A5C]" />
            Checkout
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Carrito vacío
          </h1>
          <p className="text-white/40 text-sm mb-10 leading-relaxed">
            Agrega productos para continuar con el checkout.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-gray-100 transition-all"
          >
            <ArrowLeft className="w-3 h-3" />
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[#FF7A5C]/10 border border-[#FF7A5C]/30 flex items-center justify-center mx-auto mb-8">
            <Check className="w-8 h-8 text-[#FF7A5C]" />
          </div>
          <p className="text-eyebrow text-[#FF7A5C] mb-4">Pago confirmado</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¡Gracias por tu compra!
          </h1>
          <p className="text-white/50 text-sm mb-10 leading-relaxed">
            Tu pedido ha sido procesado correctamente. Recibirás un correo de confirmación con el número de seguimiento.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-gray-100 transition-all"
          >
            Volver al inicio
            <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 text-[11px] tracking-[0.2em] uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver al carrito
        </Link>

        {/* Header */}
        <div className="mb-10 pb-6 border-b border-white/10">
          <p className="text-eyebrow text-[#FF7A5C] mb-3 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#FF7A5C]" />
            Checkout seguro
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Finalizar compra
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Resumen del pedido */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-eyebrow text-white/60 mb-4">Tu pedido</h2>

            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02]"
              >
                <div className="w-20 h-20 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/products/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-white font-medium text-sm mb-1.5">{item.name}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-white/40 tracking-wider uppercase">
                      <span>Talla {item.size}</span>
                      <span className="w-1 h-1 bg-white/20 rounded-full" />
                      <span>{item.color}</span>
                      <span className="w-1 h-1 bg-white/20 rounded-full" />
                      <span>Cantidad {item.quantity}</span>
                    </div>
                  </div>
                  <span className="text-white font-semibold text-sm mt-2">
                    ${(item.price * item.quantity).toLocaleString('es-CO')}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              <div className="flex flex-col items-center text-center p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <Lock className="w-4 h-4 text-[#FF7A5C] mb-2" />
                <span className="text-[9px] text-white/60 tracking-[0.15em] uppercase">Pago seguro</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <Truck className="w-4 h-4 text-[#FF7A5C] mb-2" />
                <span className="text-[9px] text-white/60 tracking-[0.15em] uppercase">Envío gratis</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <ShieldCheck className="w-4 h-4 text-[#FF7A5C] mb-2" />
                <span className="text-[9px] text-white/60 tracking-[0.15em] uppercase">Garantía 30 días</span>
              </div>
            </div>
          </div>

          {/* Pago */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <p className="text-eyebrow text-white/40 mb-5">Resumen total</p>

              {/* Subtotal y envío */}
              <div className="space-y-2.5 text-sm pb-5 border-b border-white/10 mb-6">
                <div className="flex justify-between text-white/60">
                  <span className="text-xs tracking-wider">Subtotal</span>
                  <span>${totalPrice.toLocaleString('es-CO')}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span className="text-xs tracking-wider">Envío</span>
                  <span className="text-[#FF7A5C]">Gratis</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between pb-6">
                <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Total</span>
                <span className="text-white text-2xl font-bold">
                  ${totalPrice.toLocaleString('es-CO')}
                </span>
              </div>

              {/* Estado de PayPal */}
              {isPending && (
                <div className="flex items-center justify-center py-8">
                  <div className="w-5 h-5 border-2 border-[#FF7A5C] border-t-transparent rounded-full animate-spin" />
                  <span className="ml-3 text-white/40 text-xs tracking-wider">Cargando PayPal...</span>
                </div>
              )}

              {isRejected && (
                <div className="text-center py-4 rounded-lg border border-red-500/20 bg-red-500/5 mb-4">
                  <p className="text-red-400 text-xs mb-1">Error al cargar PayPal</p>
                  <p className="text-white/40 text-[10px]">Verifica tu conexión a Internet</p>
                </div>
              )}

              {isResolved && (
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
                      console.log('Creando orden...');
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
                      console.log('Pago aprobado:', data);
                      setIsProcessing(true);

                      if (!actions.order) {
                        console.error('actions.order no está disponible');
                        setIsProcessing(false);
                        alert('Error al procesar el pago. Intenta nuevamente.');
                        return;
                      }

                      try {
                        const details = await actions.order.capture();
                        console.log('Captura completada:', details);
                        setIsProcessing(false);
                        clearCart();
                        setIsComplete(true);
                      } catch (error) {
                        console.error('Error en captura:', error);
                        setIsProcessing(false);
                        alert('Error al capturar el pago. Por favor, intenta nuevamente.');
                      }
                    }}
                    onError={(err) => {
                      console.error('Error en PayPal:', err);
                      alert('Error al procesar el pago. Por favor, intenta nuevamente.');
                      setIsProcessing(false);
                    }}
                    onCancel={() => {
                      console.log('Pago cancelado');
                      setIsProcessing(false);
                    }}
                  />
                  {isProcessing && (
                    <div className="flex items-center justify-center mt-4">
                      <div className="w-4 h-4 border-2 border-[#FF7A5C] border-t-transparent rounded-full animate-spin" />
                      <span className="ml-2 text-white/40 text-xs">Procesando pago...</span>
                    </div>
                  )}
                </>
              )}

              <p className="text-[10px] text-white/30 text-center mt-6 leading-relaxed tracking-wide">
                Al realizar el pago aceptas nuestros{' '}
                <Link href="/terminos" className="text-white/50 hover:text-white underline transition-colors">
                  términos y condiciones
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}