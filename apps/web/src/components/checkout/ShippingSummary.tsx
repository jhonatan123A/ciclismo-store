'use client';

import { Truck, MapPin } from 'lucide-react';
import { useCheckoutStore } from '@/lib/checkout-store';
import { calcularEnvio, getTierColor, getTierIcon } from '@/lib/shipping';

interface ShippingSummaryProps {
  subtotal: number;
}

export function ShippingSummary({ subtotal }: ShippingSummaryProps) {
  const { shipping, shippingTier, isShippingComplete } = useCheckoutStore();

  if (!isShippingComplete()) {
    return (
      <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-3 text-white/40">
          <Truck className="w-4 h-4" />
          <p className="text-xs tracking-wide">
            Completa tu dirección para calcular el envío
          </p>
        </div>
      </div>
    );
  }

  const envioInfo = calcularEnvio(subtotal, shippingTier);
  const color = getTierColor(shippingTier);

  return (
    <div className="space-y-3 p-4 rounded-lg border" style={{ borderColor: `${color}30`, background: `linear-gradient(135deg, ${color}05, transparent)` }}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-2">
          <span className="text-lg">{getTierIcon(shippingTier)}</span>
          <div>
            <p className="text-white text-xs font-medium">
              {envioInfo.metodoEntrega}
            </p>
            <p className="text-white/50 text-[10px] mt-0.5 flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5" />
              {shipping.city}, {shipping.department}
            </p>
            <p className="text-white/40 text-[10px] mt-1">
              {envioInfo.tiempoEntrega}
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          {envioInfo.esGratis ? (
            <span className="text-[#FF5A36] font-bold text-sm">GRATIS</span>
          ) : (
            <span className="text-white font-bold text-sm">
              ${envioInfo.costo.toLocaleString('es-CO')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}