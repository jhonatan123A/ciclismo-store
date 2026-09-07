'use client';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// Usar el Client ID de sandbox por defecto
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb';

const initialOptions = {
  clientId: CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
  components: 'buttons',
};

export function PayPalProvider({ children }: { children: React.ReactNode }) {
  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  );
}