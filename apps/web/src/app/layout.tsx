import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PayPalProvider } from '@/providers/PayPalProvider';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { TermsModal } from '@/components/legal/TermsModal';
import { CookiesBanner } from '@/components/legal/CookiesBanner';
import { WelcomeModal } from '@/components/conversion/WelcomeModal';
import { NeuralFrame } from '@/components/neural/NeuralFrame';
import { NeuralBackground } from '@/components/neural/NeuralBackground';

const GA_MEASUREMENT_ID = 'G-SQ3P0E4YFS';
const META_PIXEL_ID = '1412178441062317';

const BASE_URL = 'https://www.bestige-somatosensory-norbertowilches.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'BESTIGE — Tecnología Somatosensorial',
  description: 'Innovación textil para running y ciclismo. Tecnología italiana patentada que conecta con tu piel.',
  keywords: 'bestige, somatosensorial, running, ciclismo, tecnología textil, deporte',
  authors: [{ name: 'BESTIGE' }],
  // ✅ Verificación de Google Search Console
  verification: {
    google: 'A3Hfq6MlxFhqxjlLnLDhnLVefvtV8z-zFDNxiqjgHZw',
  },
  // ✅ Open Graph (WhatsApp, Facebook, LinkedIn, etc.)
  openGraph: {
    title: 'BESTIGE — Tecnología Somatosensorial',
    description: 'Tu cuerpo ya sabe. Ahora puedes sentirlo.',
    type: 'website',
    locale: 'es_CO',
    url: BASE_URL,
    siteName: 'BESTIGE',
    images: [
      {
        url: `${BASE_URL}/images/brand/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'BESTIGE — Tecnología Somatosensorial',
      },
    ],
  },
  // ✅ Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'BESTIGE — Tecnología Somatosensorial',
    description: 'Tu cuerpo ya sabe. Ahora puedes sentirlo.',
    images: [`${BASE_URL}/images/brand/og-image.jpg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        {/* ✅ Google Search Console verification (meta tag directo) */}
        <meta
          name="google-site-verification"
          content="A3Hfq6MlxFhqxjlLnLDhnLVefvtV8z-zFDNxiqjgHZw"
        />

        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body className="bg-black text-white antialiased min-h-screen relative overflow-x-hidden font-display">
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {/* FONDO NEURONAL (nueva red de nodos dorados) */}
        <NeuralBackground />

        {/* FONDO PREMIUM GLOBAL (tu diseño original) */}
        <div className="fixed inset-0 w-screen h-screen -z-20 bg-black">
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

          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.5) 100%)',
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* MARCO HUD PERIMETRAL (nuevo) */}
        <NeuralFrame />

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

            {/* Modal de Bienvenida - aparece la primera visita */}
            <WelcomeModal />
          </PayPalProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}