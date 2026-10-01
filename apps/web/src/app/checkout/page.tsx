'use client';

import { useState, useEffect, useRef } from 'react';
import { useCartStore } from '@/lib/cart-store';
import Link from 'next/link';
import { ArrowLeft, Lock, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { PaymentMethods } from '@/components/checkout/PaymentMethods';
import { ShippingForm } from '@/components/checkout/ShippingForm';
import { ShippingSummary } from '@/components/checkout/ShippingSummary';
import { useCheckoutStore } from '@/lib/checkout-store';
import { calcularEnvio } from '@/lib/shipping';
import { OrderSuccess } from '@/components/checkout/OrderSuccess';
import { trackBeginCheckout, trackPurchase } from '@/lib/analytics';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const subtotal = getTotalPrice();
  const { shipping, shippingTier } = useCheckoutStore();
  const [isComplete, setIsComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);
  const [isShippingValid, setIsShippingValid] = useState(false);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  // Snapshot inmutable para preservar los datos de la compra al vaciar el carrito
  const [finalOrderDetails, setFinalOrderDetails] = useState<{
    items: typeof items;
    total: number;
  }>({ items: [], total: 0 });

  // ✅ Control para no disparar begin_checkout varias veces
  const beginCheckoutTracked = useRef(false);

  // Cálculo del envío: Ajustado para garantizar envío gratis en cualquier monto
  const calculoBase = isShippingValid
    ? calcularEnvio(subtotal, shippingTier)
    : {
        costo: 0,
        esGratis: true,
        tier: shippingTier,
        tiempoEntrega: '',
        metodoEntrega: '',
        mensaje: '',
      };

  const envioInfo = {
    ...calculoBase,
    costo: 0,
    esGratis: true,
  };

  const totalPrice = subtotal + envioInfo.costo;

  useEffect(() => {
    console.log('Subtotal:', subtotal);
    console.log('Envío:', envioInfo.costo);
    console.log('Total:', totalPrice);
    console.log('Items:', items.length);
  }, [subtotal, envioInfo.costo, totalPrice, items]);

  // ✅ Trackear begin_checkout (una sola vez por sesión de checkout)
  useEffect(() => {
    if (items.length > 0 && !beginCheckoutTracked.current) {
      beginCheckoutTracked.current = true;
      trackBeginCheckout(
        items.map((item) => ({
          item_id: item.productId,
          item_name: item.name,
          item_category: item.category,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        totalPrice
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  // ============================
  // CREAR ORDEN PENDING EN EL BACKEND (antes de pagar)
  // ============================
  const createPendingOrder = async (
    orderItems: typeof items,
    orderSubtotal: number,
    orderTotal: number
  ): Promise<{ orderNumber: string } | null> => {
    try {
      setIsSavingOrder(true);

      const orderData = {
        customerName: shipping.fullName,
        customerEmail: shipping.email,
        customerPhone: shipping.phone,
        shippingAddress: {
          documentType: shipping.documentType,
          documentId: shipping.documentId,
          personType: shipping.personType,
          taxRegime: shipping.taxRegime,
          department: shipping.department,
          city: shipping.city,
          address: shipping.address,
          neighborhood: shipping.neighborhood,
          references: shipping.references || '',
          zipCode: shipping.zipCode || '',
        },
        billingAddress: {
          documentType: shipping.documentType,
          documentId: shipping.documentId,
          personType: shipping.personType,
          taxRegime: shipping.taxRegime,
          department: shipping.department,
          city: shipping.city,
          address: shipping.address,
          neighborhood: shipping.neighborhood,
          references: shipping.references || '',
          zipCode: shipping.zipCode || '',
        },
        items: orderItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: item.image,
        })),
        subtotal: orderSubtotal,
        shippingCost: envioInfo.costo,
        total: orderTotal,
        paymentMethod: 'wompi',
      };

      console.log('📦 Enviando orden al backend:', orderData);

      const apiUrl = process.env.NODE_ENV === 'production'
        ? 'https://ciclismo-api.onrender.com/api/v1'
        : 'http://localhost:4000/api/v1';

      const response = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Error del backend:', errorData);
        throw new Error(errorData.error || 'Error al crear la orden');
      }

      const result = await response.json();
      console.log('✅ Orden PENDING creada:', result.orderNumber);

      setIsSavingOrder(false);
      return { orderNumber: result.orderNumber };
    } catch (error) {
      console.error('❌ Error creando orden:', error);
      setIsSavingOrder(false);
      return null;
    }
  };

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
      <OrderSuccess
        orderNumber={completedOrder?.orderNumber || completedOrder?.id || 'N/A'}
        customerName={shipping.fullName}
        customerEmail={shipping.email}
        total={completedOrder?.total ?? finalOrderDetails.total}
        items={completedOrder?.items || finalOrderDetails.items}
        shippingAddress={completedOrder?.shippingAddress || {
          department: shipping.department,
          city: shipping.city,
          address: shipping.address,
          neighborhood: shipping.neighborhood,
          references: shipping.references || '',
          zipCode: shipping.zipCode || '',
        }}
      />
    );
  }

  // ============================
  // CALLBACKS DE PAGO
  // ============================
  const handlePaymentSuccess = async (transactionId: string) => {
    console.log('✅ Pago exitoso. Transacción:', transactionId);

    const currentItems = useCartStore.getState().items;
    const currentSubtotal = currentItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const currentTotal = currentSubtotal + envioInfo.costo;

    // Guardar snapshot local del total y los items antes de borrar el store
    setFinalOrderDetails({
      items: [...currentItems],
      total: currentTotal,
    });

    // ✅ Trackear purchase (la venta real)
    trackPurchase({
      transactionId,
      items: currentItems.map((item) => ({
        item_id: item.productId,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      })),
      total: currentTotal,
      shipping: envioInfo.costo,
    });

    // ✅ La orden YA existe (creada antes de abrir Wompi).
    // El webhook de Wompi la actualizará a PAID en el backend.
    clearCart();
    setIsComplete(true);
  };

  const handlePaymentError = (error: string) => {
    console.error('❌ Error de pago:', error);
    alert(error);
  };

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
          {/* COLUMNA IZQUIERDA: DIRECCIÓN + PRODUCTOS */}
          <div className="lg:col-span-2 space-y-6">
            {/* FORMULARIO DE ENVÍO */}
            <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <ShippingForm subtotal={subtotal} onValidityChange={setIsShippingValid} />
            </div>

            {/* RESUMEN DEL PEDIDO */}
            <div className="space-y-4">
              <h2 className="text-eyebrow text-white/60 mb-4">Resumen del pedido</h2>

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
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center text-center p-4 rounded-xl border border-[#FF5A36]/20 bg-[#FF5A36]/[0.02] hover:border-[#FF5A36]/40 transition-all">
                <Lock className="w-4 h-4 text-[#FF5A36] mb-2" />
                <span className="text-[9px] text-white/60 tracking-[0.15em] uppercase">Pago seguro</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-xl border border-[#38BDF8]/20 bg-[#38BDF8]/[0.02] hover:border-[#38BDF8]/40 transition-all">
                <Truck className="w-4 h-4 text-[#38BDF8] mb-2" />
                <span className="text-[9px] text-white/60 tracking-[0.15em] uppercase">Envío nacional</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-xl border border-[#E8B94A]/20 bg-[#E8B94A]/[0.02] hover:border-[#E8B94A]/40 transition-all">
                <ShieldCheck className="w-4 h-4 text-[#E8B94A] mb-2" />
                <span className="text-[9px] text-white/60 tracking-[0.15em] uppercase">Garantía 30 días</span>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: PAGO */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 p-6 rounded-2xl border border-white/10 bg-white/[0.02] relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF5A36]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <p className="text-eyebrow text-white/40 mb-5">Resumen total</p>

                {/* Resumen del envío */}
                <div className="mb-5">
                  <ShippingSummary subtotal={subtotal} />
                </div>

                {/* Desglose de precios */}
                <div className="space-y-2.5 text-sm pb-5 border-b border-white/10 mb-6">
                  <div className="flex justify-between text-white/60">
                    <span className="text-xs tracking-wider">Subtotal</span>
                    <span>${subtotal.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span className="text-xs tracking-wider">Envío</span>
                    <span className={envioInfo.esGratis ? 'text-[#FF5A36] font-medium' : ''}>
                      {!isShippingValid
                        ? 'Por calcular'
                        : envioInfo.esGratis
                        ? 'GRATIS'
                        : `$${envioInfo.costo.toLocaleString('es-CO')}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pb-6">
                  <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Total</span>
                  <span className="text-white text-2xl font-bold">
                    ${totalPrice.toLocaleString('es-CO')}
                  </span>
                </div>

                {/* Aviso si falta dirección */}
                {!isShippingValid && (
                  <div className="mb-4 p-4 rounded-lg border border-[#FF5A36]/30 bg-[#FF5A36]/[0.05] text-center">
                    <p className="text-[11px] text-[#FF5A36] tracking-wide font-medium mb-1">
                      ⚠️ COMPLETA TU DIRECCIÓN DE ENVÍO
                    </p>
                    <p className="text-[10px] text-white/50">
                      Necesitamos estos datos para enviarte el pedido
                    </p>
                  </div>
                )}

                {/* Aviso guardando orden */}
                {isSavingOrder && (
                  <div className="mb-4 p-4 rounded-lg border border-[#E8B94A]/30 bg-[#E8B94A]/[0.05] text-center">
                    <p className="text-[11px] text-[#E8B94A] tracking-wide font-medium">
                      📦 Guardando tu pedido...
                    </p>
                  </div>
                )}

                {/* SELECTOR DE MÉTODO DE PAGO */}
                <div className={!isShippingValid ? 'pointer-events-none opacity-40' : ''}>
                  <PaymentMethods
                    totalPrice={totalPrice}
                    customerEmail={shipping.email || 'cliente@bestige.com'}
                    customerName={shipping.fullName || 'Cliente Bestige'}
                    customerPhone={shipping.phone}
                    onBeforePayment={async () => {
                      const currentItems = useCartStore.getState().items;
                      const currentSubtotal = currentItems.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      );
                      const currentTotal = currentSubtotal + envioInfo.costo;
                      return await createPendingOrder(currentItems, currentSubtotal, currentTotal);
                    }}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentError={handlePaymentError}
                  />
                </div>

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