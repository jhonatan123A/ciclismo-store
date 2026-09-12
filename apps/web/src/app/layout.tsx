import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { PayPalProvider } from '@/providers/PayPalProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BESTIGE - Tecnología Somatosensorial',
  description: 'Innovación textil para running y ciclismo. Tecnología italiana patentada que conecta con tu piel.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-black text-white antialiased min-h-screen relative overflow-x-hidden">
        {/* FONDO FULLSCREEN CON IMAGEN */}
        <div className="fixed inset-0 w-screen h-screen -z-20">
          <img 
            src="/images/backgrounds/hero-bg.jpg"
            alt="BESTIGE Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradiente superpuesto para darle profundidad */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FF7A5C]/20 via-transparent to-[#7DD3FC]/20" />
        </div>

        <PayPalProvider>
          <Header />
          <main className="pt-20 min-h-screen relative z-10">
            {children}
          </main>
        </PayPalProvider>
      </body>
    </html>
  );
}