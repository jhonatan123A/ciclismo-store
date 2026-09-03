import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ciclismo Store',
  description: 'Tu tienda de ciclismo profesional',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}