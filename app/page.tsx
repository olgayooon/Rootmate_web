import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import PlantsSection from '@/components/PlantsSection';
import GiftSection from '@/components/GiftSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <PlantsSection />
        <GiftSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
