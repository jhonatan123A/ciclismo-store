'use client';

import { useEffect } from 'react';
import { useCheckoutStore } from '@/lib/checkout-store';
import { DEPARTAMENTOS_COLOMBIA, getCiudadesPorDepartamento } from '@/lib/colombia';
import { calcularEnvio, getTierColor, getTierIcon } from '@/lib/shipping';
import { User, Phone, Mail, MapPin, Building, Home, Compass, Hash, FileText, Info } from 'lucide-react';

interface ShippingFormProps {
  subtotal: number;
  onValidityChange?: (isValid: boolean) => void;
}

export function ShippingForm({ subtotal, onValidityChange }: ShippingFormProps) {
  const { shipping, shippingTier, setShipping, isShippingComplete } = useCheckoutStore();

  useEffect(() => {
    onValidityChange?.(isShippingComplete());
  }, [shipping, isShippingComplete, onValidityChange]);

  const ciudades = getCiudadesPorDepartamento(shipping.department);
  const envioInfo = shipping.department && shipping.city 
    ? calcularEnvio(subtotal, shippingTier) 
    : null;

  const inputClass = `
    w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm text-white 
    placeholder:text-white/30 focus:outline-none focus:border-[#FF5A36]/50 focus:bg-white/[0.04] 
    transition-all
  `;

  const labelClass = 'text-[10px] tracking-[0.15em] uppercase text-white/50 mb-2 flex items-center gap-2';

  return (
    <div className="space-y-6">
      {/* Título */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-[#FF5A36]/10 border border-[#FF5A36]/20 flex items-center justify-center text-[#FF5A36]">
          <MapPin className="w-4 h-4" />
        </div>
        <div>
          <p className="text-eyebrow text-[#FF5A36]">Paso 1 de 2</p>
          <h2 className="text-white font-bold text-base">Dirección de envío</h2>
        </div>
      </div>

      {/* Nombre completo */}
      <div>
        <label className={labelClass}>
          <User className="w-3 h-3" />
          Nombre completo del destinatario
        </label>
        <input
          type="text"
          value={shipping.fullName}
          onChange={(e) => setShipping({ fullName: e.target.value })}
          placeholder="Ej: Juan Pérez García"
          className={inputClass}
        />
      </div>

      {/* Teléfono y Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            <Phone className="w-3 h-3" />
            Teléfono / WhatsApp
          </label>
          <input
            type="tel"
            value={shipping.phone}
            onChange={(e) => setShipping({ phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
            placeholder="3001234567"
            className={inputClass}
            maxLength={10}
          />
        </div>
        <div>
          <label className={labelClass}>
            <Mail className="w-3 h-3" />
            Correo electrónico
          </label>
          <input
            type="email"
            value={shipping.email}
            onChange={(e) => setShipping({ email: e.target.value })}
            placeholder="tucorreo@ejemplo.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Departamento y Ciudad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            <Building className="w-3 h-3" />
            Departamento
          </label>
          <select
            value={shipping.department}
            onChange={(e) => setShipping({ department: e.target.value, city: '' })}
            className={inputClass}
          >
            <option value="" className="bg-[#0A0A0A]">
              Selecciona un departamento
            </option>
            {DEPARTAMENTOS_COLOMBIA.map((d) => (
              <option key={d.codigo} value={d.nombre} className="bg-[#0A0A0A]">
                {d.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>
            <MapPin className="w-3 h-3" />
            Ciudad / Municipio
          </label>
          <select
            value={shipping.city}
            onChange={(e) => setShipping({ city: e.target.value })}
            disabled={!shipping.department}
            className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <option value="" className="bg-[#0A0A0A]">
              {shipping.department ? 'Selecciona una ciudad' : 'Primero elige un departamento'}
            </option>
            {ciudades.map((c) => (
              <option key={c.nombre} value={c.nombre} className="bg-[#0A0A0A]">
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Info de envío según tier */}
      {envioInfo && (
        <div
          className="p-4 rounded-lg border relative overflow-hidden"
          style={{
            borderColor: `${getTierColor(shippingTier)}40`,
            background: `linear-gradient(135deg, ${getTierColor(shippingTier)}10, transparent)`,
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">{getTierIcon(shippingTier)}</span>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm mb-1">
                {envioInfo.metodoEntrega}
              </p>
              <p className="text-white/60 text-xs mb-2">
                {envioInfo.tiempoEntrega}
              </p>
              <div className="flex items-baseline gap-2">
                {envioInfo.esGratis ? (
                  <span className="text-[#FF5A36] font-bold text-base">GRATIS</span>
                ) : (
                  <span className="text-white font-bold text-base">
                    ${envioInfo.costo.toLocaleString('es-CO')}
                  </span>
                )}
              </div>
              {!envioInfo.esGratis && (
                <p className="text-[10px] text-[#E8B94A] mt-2 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  {envioInfo.mensaje}
                </p>
              )}
              {envioInfo.esGratis && (
                <p className="text-[10px] text-[#FF5A36] mt-2">
                  {envioInfo.mensaje}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dirección */}
      <div>
        <label className={labelClass}>
          <Home className="w-3 h-3" />
          Dirección (calle, carrera, número)
        </label>
        <input
          type="text"
          value={shipping.address}
          onChange={(e) => setShipping({ address: e.target.value })}
          placeholder="Ej: Calle 123 #45-67, Apto 301"
          className={inputClass}
        />
      </div>

      {/* Barrio y Código Postal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            <Compass className="w-3 h-3" />
            Barrio
          </label>
          <input
            type="text"
            value={shipping.neighborhood}
            onChange={(e) => setShipping({ neighborhood: e.target.value })}
            placeholder="Ej: Chapinero Alto"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            <Hash className="w-3 h-3" />
            Código postal (opcional)
          </label>
          <input
            type="text"
            value={shipping.zipCode || ''}
            onChange={(e) => setShipping({ zipCode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
            placeholder="110111"
            className={inputClass}
            maxLength={6}
          />
        </div>
      </div>

      {/* Referencias */}
      <div>
        <label className={labelClass}>
          <FileText className="w-3 h-3" />
          Referencias para el repartidor (opcional)
        </label>
        <textarea
          value={shipping.references}
          onChange={(e) => setShipping({ references: e.target.value })}
          placeholder="Ej: Casa blanca con rejas negras, frente al parque"
          rows={2}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Nota de validación */}
      {!isShippingComplete() && (
        <div className="p-3 rounded-lg border border-[#FF5A36]/20 bg-[#FF5A36]/[0.02]">
          <p className="text-[10px] text-white/50 tracking-wide">
            ⚠️ Completa todos los campos obligatorios para continuar al pago
          </p>
        </div>
      )}
    </div>
  );
}