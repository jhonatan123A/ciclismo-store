import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/home/HeroSection';
import { TechnologySection } from '@/components/home/TechnologySection';
import { ProductShowcase } from '@/components/home/ProductShowcase';

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Header />
      <HeroSection />
      <TechnologySection />
      <ProductShowcase />
    </main>
  );
}