import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PayPalProvider } from '@/providers/PayPalProvider';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { TermsModal } from '@/components/legal/TermsModal';
import { CookiesBanner } from '@/components/legal/CookiesBanner';

export const metadata: Metadata = {
  title: 'BESTIGE — Tecnología Somatosensorial',
  description: 'Innovación textil para running y ciclismo. Tecnología italiana patentada que conecta con tu piel.',
  keywords: 'bestige, somatosensorial, running, ciclismo, tecnología textil, deporte',
  authors: [{ name: 'BESTIGE' }],
  openGraph: {
    title: 'BESTIGE — Tecnología Somatosensorial',
    description: 'Tu cuerpo ya sabe. Ahora puedes sentirlo.',
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
      <body className="bg-black text-white antialiased min-h-screen relative overflow-x-hidden font-display">
        {/* FONDO PREMIUM GLOBAL (sutil, se ve detrás de todo) */}
        <div className="fixed inset-0 w-screen h-screen -z-20 bg-black">
          {/* Gradiente radial naranja BESTIGE (arriba izquierda) */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 800px 600px at 15% 20%, rgba(255, 122, 92, 0.06) 0%, transparent 60%),
                radial-gradient(ellipse 900px 700px at 85% 80%, rgba(125, 211, 252, 0.05) 0%, transparent 60%),
                radial-gradient(ellipse 700px 500px at 50% 50%, rgba(255, 90, 95, 0.03) 0%, transparent 70%)
              `,
            }}
          />

          {/* Efecto de viñeta (oscurece los bordes) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.5) 100%)',
            }}
          />

          {/* Textura de ruido sutil para look premium */}
          <div
            className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <SmoothScrollProvider>
          <PayPalProvider>
            {/* Modal de Términos y Condiciones - aparece al entrar */}
            <TermsModal />

            {/* Header con navegación */}
            <Header />

            {/* Contenido de la página */}
            <main className="relative z-10 min-h-screen">{children}</main>

            {/* Footer con links legales */}
            <Footer />

            {/* Banner de Cookies - aparece después del modal */}
            <CookiesBanner />
          </PayPalProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}