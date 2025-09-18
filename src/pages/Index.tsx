import HeroSection from "@/components/HeroSection";
import FeaturesOverview from "@/components/FeaturesOverview";
import BusinessAssessment from "@/components/BusinessAssessment";
import ROICalculator from "@/components/ROICalculator";
import CRMShowcase from "@/components/CRMShowcase";
import TestimonialsShowcase from "@/components/TestimonialsShowcase";
import StepByStepGuide from "@/components/StepByStepGuide";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        
        <FeaturesOverview />
        
        {/* Business Assessment Quiz */}
        <section className="py-20 bg-gradient-to-b from-slate-50/30 to-background">
          <div className="container mx-auto px-4">
            <BusinessAssessment />
          </div>
        </section>
        
        {/* ROI Calculator */}
        <section className="py-20 bg-gradient-to-b from-background to-slate-50/30">
          <div className="container mx-auto px-4">
            <ROICalculator />
          </div>
        </section>
        
        <CRMShowcase />
        
        {/* Success Stories */}
        <section className="py-20 bg-gradient-to-b from-slate-50/30 to-background">
          <div className="container mx-auto px-4">
            <TestimonialsShowcase />
          </div>
        </section>
        
        {/* Implementation Guide */}
        <section className="py-20 bg-gradient-to-b from-background to-slate-50/30">
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
