import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ShippingAddress, INITIAL_SHIPPING_ADDRESS } from './order-types';
import { ShippingTier, getTierMunicipio } from './colombia';

interface CheckoutStore {
  shipping: ShippingAddress;
  shippingTier: ShippingTier;
  setShipping: (data: Partial<ShippingAddress>) => void;
  resetShipping: () => void;
  isShippingComplete: () => boolean;
  updateTier: () => void;
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set, get) => ({
      shipping: INITIAL_SHIPPING_ADDRESS,
      shippingTier: 1,

      setShipping: (data) => {
        set({ shipping: { ...get().shipping, ...data } });
        // Actualizar tier cuando cambia el municipio (asíncrono para evitar warnings de React)
        setTimeout(() => get().updateTier(), 0);
      },

      updateTier: () => {
        const { shipping } = get();
        if (shipping.department && shipping.city) {
          const tier = getTierMunicipio(shipping.department, shipping.city);
          set({ shippingTier: tier });
        }
      },

      resetShipping: () => {
        set({ shipping: INITIAL_SHIPPING_ADDRESS, shippingTier: 1 });
      },

      isShippingComplete: () => {
        const s = get().shipping;
        // ✅ Validación de documento según tipo (reglas simples y legales)
        const docId = s.documentId?.replace(/\D/g, '') || '';
        const docIdClean = s.documentId?.trim() || '';
        let isDocumentValid = false;

        switch (s.documentType) {
          case 'CC':
            isDocumentValid = /^\d{6,10}$/.test(docId);
            break;
          case 'CE':
            isDocumentValid = /^[A-Za-z0-9]{6,12}$/.test(docIdClean);
            break;
          case 'NIT':
            isDocumentValid = /^\d{9,10}$/.test(docId);
            break;
          case 'PA':
            isDocumentValid = /^[A-Za-z0-9]{6,15}$/.test(docIdClean);
            break;
          default:
            isDocumentValid = false;
        }

        return !!(
          s.fullName &&
          s.phone &&
          s.phone.length === 10 &&
          s.email &&
          s.email.includes('@') &&
          s.documentType &&
          isDocumentValid &&
          s.personType &&
          s.taxRegime &&
          s.department &&
          s.city &&
          s.address &&
          s.neighborhood
        );
      },
    }),
    {
      name: 'bestige-checkout',
    }
  )
);