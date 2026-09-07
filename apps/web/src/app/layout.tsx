import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { PayPalProvider } from '@/providers/PayPalProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BESTIGE - Tecnología Somatosensorial',
  description: 'Innovación textil para running y ciclismo. Tecnología italiana patentada que conecta con tu piel.',
  keywords: 'bestige, somatosensorial, running, ciclismo, tecnología textil',
  openGraph: {
    title: 'BESTIGE - Tecnología Somatosensorial',
    description: 'Innovación textil para running y ciclismo',
    type: 'website',
    locale: 'es_CO',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <PayPalProvider>
          <Header />
          <main className="pt-20 min-h-screen">
            {children}
          </main>
        </PayPalProvider>
      </body>
    </html>
  );
}