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

  useEffect(() => {
    console.log('PayPal Status:', { isPending, isResolved, isRejected });
    console.log('Total Price:', totalPrice);
    console.log('Items:', items.length);
  }, [isPending, isResolved, isRejected, totalPrice, items]);

  // ============================
  // ESTADO 1: CARRITO VACÍO
  // ============================
  if (items.length === 0 && !isComplete) {
    return (
      <div className="relative min-h-screen pt-24 pb-16 px-6 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#FF5A36]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-md w-full text-center">
          <p className="text-eyebrow text-[#FF5A36] mb-6 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-gradient-to-r from-[#FF5A36] via-[#38BDF8] to-[#E8B94A]" />
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
            className="inline-flex items-center gap-3 px-7 py-3.5 btn-orange text-[10px] tracking-[0.2em] uppercase font-semibold"
          >
            <ArrowLeft className="w-3 h-3" />
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  // ============================
  // ESTADO 2: PAGO COMPLETADO
  // ============================
  if (isComplete) {
    return (
      <div className="relative min-h-screen pt-24 pb-16 px-6 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#FF5A36]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E8B94A]/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[#FF5A36]/10 border border-[#FF5A36]/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(255,90,54,0.3)]">
            <Check className="w-8 h-8 text-[#FF5A36]" />
          </div>
          <p className="text-eyebrow text-[#FF5A36] mb-4">Pago confirmado</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¡Gracias por tu compra!
          </h1>
          <p className="text-white/50 text-sm mb-10 leading-relaxed">
            Tu pedido ha sido procesado correctamente. Recibirás un correo de confirmación con el número de seguimiento.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-7 py-3.5 btn-orange text-[10px] tracking-[0.2em] uppercase font-semibold group"
          >
            Volver al inicio
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    );
  }

  // ============================
  // ESTADO 3: CHECKOUT CON ITEMS
  // ============================
  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-[#FF5A36]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#E8B94A]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-white/40 hover:text-[#FF5A36] transition-colors mb-10 text-[11px] tracking-[0.2em] uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver al carrito
        </Link>

        {/* Header */}
        <div className="mb-10 pb-6 border-b border-white/10">
          <p className="text-eyebrow text-[#FF5A36] mb-3 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-gradient-to-r from-[#FF5A36] via-[#38BDF8] to-[#E8B94A]" />
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
                className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#FF5A36]/20 transition-all"
              >
                <div className="w-20 h-20 rounded-lg bg-white/5 overflow-hidden flex-shrink-0 ring-1 ring-white/5">
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
                      <span className="w-1 h-1 bg-[#FF5A36] rounded-full" />
                      <span>{item.color}</span>
                      <span className="w-1 h-1 bg-[#FF5A36] rounded-full" />
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
              <div className="flex flex-col items-center text-center p-4 rounded-xl border border-[#FF5A36]/20 bg-[#FF5A36]/[0.02] hover:border-[#FF5A36]/40 transition-all">
                <Lock className="w-4 h-4 text-[#FF5A36] mb-2" />
                <span className="text-[9px] text-white/60 tracking-[0.15em] uppercase">Pago seguro</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-xl border border-[#38BDF8]/20 bg-[#38BDF8]/[0.02] hover:border-[#38BDF8]/40 transition-all">
                <Truck className="w-4 h-4 text-[#38BDF8] mb-2" />
                <span className="text-[9px] text-white/60 tracking-[0.15em] uppercase">Envío gratis</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-xl border border-[#E8B94A]/20 bg-[#E8B94A]/[0.02] hover:border-[#E8B94A]/40 transition-all">
                <ShieldCheck className="w-4 h-4 text-[#E8B94A] mb-2" />
                <span className="text-[9px] text-white/60 tracking-[0.15em] uppercase">Garantía 30 días</span>
              </div>
            </div>
          </div>

          {/* Pago */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 p-6 rounded-2xl border border-white/10 bg-white/[0.02] relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF5A36]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <p className="text-eyebrow text-white/40 mb-5">Resumen total</p>

                <div className="space-y-2.5 text-sm pb-5 border-b border-white/10 mb-6">
                  <div className="flex justify-between text-white/60">
                    <span className="text-xs tracking-wider">Subtotal</span>
                    <span>${totalPrice.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span className="text-xs tracking-wider">Envío</span>
                    <span className="text-[#FF5A36] font-medium">Gratis</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pb-6">
                  <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Total</span>
                  <span className="text-white text-2xl font-bold">
                    ${totalPrice.toLocaleString('es-CO')}
                  </span>
                </div>

                {isPending && (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-5 h-5 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin" />
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
                        <div className="w-4 h-4 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin" />
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
    </div>
  );
}