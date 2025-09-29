import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeaturesOverview from "@/components/FeaturesOverview";
import IndustryResults from "@/components/IndustryResults";
import BusinessAssessment from "@/components/BusinessAssessment";
import ROICalculator from "@/components/ROICalculator";
import CRMShowcase from "@/components/CRMShowcase";
import TestimonialsShowcase from "@/components/TestimonialsShowcase";
import StepByStepGuide from "@/components/StepByStepGuide";
import FeaturedWhitepaper from "@/components/FeaturedWhitepaper";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo');
    if (scrollTo === 'features-overview') {
      // Small delay to ensure page is rendered
      setTimeout(() => {
        const element = document.getElementById('features-overview');
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  }, [searchParams]);
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        
        <FeaturesOverview />
        
        <IndustryResults />
        
        {/* ROI Calculator */}
        <section className="py-20 bg-background" id="features-overview">
          <div className="container mx-auto px-4">
            <ROICalculator />
          </div>
        </section>
        
        {/* Business Assessment Quiz */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <BusinessAssessment />
          </div>
        </section>
        
        <CRMShowcase />
        
        {/* Featured Whitepaper */}
        <FeaturedWhitepaper />
        
        {/* Success Stories */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <TestimonialsShowcase />
          </div>
        </section>
        
        {/* Implementation Guide */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <StepByStepGuide />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
