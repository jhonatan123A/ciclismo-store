'use client';

import { useEffect, useState } from 'react';
import { useCheckoutStore } from '@/lib/checkout-store';
import { DEPARTAMENTOS_COLOMBIA, getCiudadesPorDepartamento } from '@/lib/colombia';
import { calcularEnvio, getTierColor, getTierIcon } from '@/lib/shipping';
import { User, Phone, Mail, MapPin, Building, Home, Compass, Hash, FileText, Info, CreditCard, Globe } from 'lucide-react';

// ✅ WhatsApp de atención (mismo del footer)
const WHATSAPP_NUMBER = '573236398318';

interface ShippingFormProps {
  subtotal: number;
  onValidityChange?: (isValid: boolean) => void;
}

export function ShippingForm({ subtotal, onValidityChange }: ShippingFormProps) {
  const { shipping, shippingTier, setShipping, isShippingComplete } = useCheckoutStore();
  const [showInternational, setShowInternational] = useState(false);

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

  // ✅ WhatsApp para clientes fuera de Colombia
  const internationalWhatsAppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hola Bestige 👋 Vengo desde la web. Quiero comprar desde fuera de Colombia y coordinar el envío internacional.'
  )}`;

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
          value={shipping.fullName || ''}
          onChange={(e) => setShipping({ fullName: e.target.value })}
          placeholder="Ej: Juan Pérez García"
          className={inputClass}
        />
      </div>

      {/* Tipo de documento y Número de documento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            <CreditCard className="w-3 h-3" />
            Tipo de documento *
          </label>
          <select
            value={shipping.documentType || 'CC'}
            onChange={(e) => setShipping({ documentType: e.target.value as any, documentId: '' })}
            className={inputClass}
          >
            <option value="CC" className="bg-[#0A0A0A]">Cédula de ciudadanía (CC)</option>
            <option value="CE" className="bg-[#0A0A0A]">Cédula de extranjería (CE)</option>
            <option value="NIT" className="bg-[#0A0A0A]">NIT</option>
            <option value="PA" className="bg-[#0A0A0A]">Pasaporte</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>
            <Hash className="w-3 h-3" />
            Número de documento *
          </label>
          <input
            type="text"
            value={shipping.documentId || ''}
            onChange={(e) => {
              const raw = e.target.value;
              const filtered = (shipping.documentType === 'CC' || shipping.documentType === 'NIT')
                ? raw.replace(/\D/g, '')
                : raw.replace(/[^A-Za-z0-9]/g, '');
              setShipping({ documentId: filtered });
            }}
            placeholder={
              shipping.documentType === 'CC' ? '1234567890' :
              shipping.documentType === 'CE' ? 'E12345678' :
              shipping.documentType === 'NIT' ? '900123456' :
              'AB123456'
            }
            className={inputClass}
            maxLength={shipping.documentType === 'CC' ? 10 : shipping.documentType === 'NIT' ? 10 : shipping.documentType === 'CE' ? 12 : 15}
          />
        </div>
      </div>

      {/* Tipo de persona y Régimen fiscal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            <User className="w-3 h-3" />
            Tipo de persona *
          </label>
          <select
            value={shipping.personType || 'NATURAL'}
            onChange={(e) => setShipping({ personType: e.target.value as any })}
            className={inputClass}
          >
            <option value="NATURAL" className="bg-[#0A0A0A]">Persona Natural</option>
            <option value="JURIDICA" className="bg-[#0A0A0A]">Persona Jurídica</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>
            <FileText className="w-3 h-3" />
            Régimen fiscal *
          </label>
          <select
            value={shipping.taxRegime || 'NO_RESPONSABLE'}
            onChange={(e) => setShipping({ taxRegime: e.target.value as any })}
            className={inputClass}
          >
            <option value="NO_RESPONSABLE" className="bg-[#0A0A0A]">No responsable de IVA</option>
            <option value="RESPONSABLE" className="bg-[#0A0A0A]">Responsable de IVA</option>
            <option value="SIMPLE" className="bg-[#0A0A0A]">Régimen Simple de Tributación</option>
          </select>
        </div>
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
            value={shipping.phone || ''}
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
            value={shipping.email || ''}
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
            value={shipping.department || ''}
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
            value={shipping.city || ''}
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
          value={shipping.address || ''}
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
            value={shipping.neighborhood || ''}
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
          value={shipping.references || ''}
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

      {/* Bloque internacional */}
      <div className="pt-4 border-t border-white/10">
        {!showInternational ? (
          <button
            type="button"
            onClick={() => setShowInternational(true)}
            className="text-[11px] text-white/40 hover:text-[#38BDF8] transition-colors tracking-wide flex items-center gap-2 mx-auto"
          >
            <Globe className="w-3 h-3" />
            ¿Estás fuera de Colombia?
          </button>
        ) : (
          <div className="p-4 rounded-lg border border-[#38BDF8]/30 bg-[#38BDF8]/[0.05]">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-[#38BDF8] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-white text-sm font-medium mb-1">
                  Compras desde fuera de Colombia
                </p>
                <p className="text-white/60 text-xs mb-3 leading-relaxed">
                  Para coordinar tu envío internacional, escríbenos por WhatsApp y te ayudamos.
                </p>
                <a
                  href={internationalWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all"
                >
                  Contactar por WhatsApp
                </a>
              </div>
              <button
                type="button"
                onClick={() => setShowInternational(false)}
                className="text-white/30 hover:text-white/60 text-xs"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}