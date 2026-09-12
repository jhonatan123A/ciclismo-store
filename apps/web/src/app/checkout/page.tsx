'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';

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
      <div className="min-h-screen bg-black pt-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-2xl p-12">
            <h2 className="text-2xl text-white font-medium mb-2">Carrito vacío</h2>
            <p className="text-gray-400 mb-6">Agrega productos para continuar</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#FF7A5C] to-[#FF5A5F] hover:from-[#FF5A5F] hover:to-[#E63946] text-white rounded-xl font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-black pt-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass rounded-2xl p-12">
            <div className="w-20 h-20 bg-[#7DD3FC]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-[#7DD3FC]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">¡Pago Completado!</h2>
            <p className="text-gray-400 mb-6">
              Tu pedido ha sido procesado correctamente. Recibirás un correo de confirmación.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#FF7A5C] to-[#FF5A5F] hover:from-[#FF5A5F] hover:to-[#E63946] text-white rounded-xl font-medium transition-colors"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/cart"
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-400" />
          </Link>
          <h1 className="text-3xl font-bold text-white">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resumen del pedido */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Resumen del pedido</h2>
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 glass rounded-xl">
                <div className="w-16 h-16 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/products/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{item.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Talla: {item.size}</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    <span>Color: {item.color}</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    <span>Cantidad: {item.quantity}</span>
                  </div>
                  <div className="text-white font-semibold mt-1">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pago */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4">Total</h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-[#FF7A5C] to-[#7DD3FC] bg-clip-text text-transparent mb-6">
                ${totalPrice.toLocaleString()}
              </div>

              {/* Estado de PayPal */}
              {isPending && (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-4 border-[#FF7A5C] border-t-transparent rounded-full animate-spin" />
                  <span className="ml-3 text-gray-400">Cargando PayPal...</span>
                </div>
              )}

              {isRejected && (
                <div className="text-[#FF5A5F] text-center py-4">
                  <p>Error al cargar PayPal</p>
                  <p className="text-sm text-gray-400">Verifica tu conexión a Internet</p>
                </div>
              )}

              {isResolved && (
                <>
                  <PayPalButtons
                    style={{ 
                      layout: 'vertical',
                      color: 'gold',
                      shape: 'rect',
                      label: 'paypal',
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
                      <div className="w-5 h-5 border-2 border-[#FF7A5C] border-t-transparent rounded-full animate-spin" />
                      <span className="ml-2 text-gray-400">Procesando pago...</span>
                    </div>
                  )}
                </>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                Al realizar el pago aceptas nuestros términos y condiciones
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}