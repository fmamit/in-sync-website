import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SEOHelmet from "@/components/SEOHelmet";
import HeroSection from "@/components/HeroSection";
import FeaturesOverview from "@/components/FeaturesOverview";
import IndustryResults from "@/components/IndustryResults";
import BusinessAssessment from "@/components/BusinessAssessment";
import ROICalculator from "@/components/ROICalculator";
import CRMShowcase from "@/components/CRMShowcase";
import TestimonialsShowcase from "@/components/TestimonialsShowcase";
import StepByStepGuide from "@/components/StepByStepGuide";
import AcademicWhitepaperShowcase from "@/components/AcademicWhitepaperShowcase";
import Footer from "@/components/Footer";
import { defaultSEOConfig, getOrganizationSchema, getSoftwareApplicationSchema } from "@/utils/seo";

const Index = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo');
    if (scrollTo === 'features-overview') {
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
  
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationSchema(),
      getSoftwareApplicationSchema()
    ]
  };

  return (
    <>
      <SEOHelmet 
        config={{
          ...defaultSEOConfig.home,
          structuredData
        }}
      />
      
      <div className="min-h-screen bg-background">
        <main>
          <HeroSection />
          <FeaturesOverview />
          <AcademicWhitepaperShowcase />
          <IndustryResults />
          
          <section className="py-24 bg-gradient-to-br from-orange-50/50 via-pink-50/50 to-accent/10 relative overflow-hidden" id="features-overview">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-accent/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2.5s' }}></div>
            <div className="container mx-auto px-4 relative z-10">
              <ROICalculator />
            </div>
          </section>
          
          <section className="py-24 bg-gradient-to-br from-green-50/50 via-primary/10 to-blue-50/50 relative overflow-hidden">
            <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-blue-400/25 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '3s' }}></div>
            <div className="container mx-auto px-4 relative z-10">
              <BusinessAssessment />
            </div>
          </section>
          
          <CRMShowcase />
          
          <section className="py-24 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-accent/10 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/25 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }}></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-accent/25 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '3.5s' }}></div>
            <div className="container mx-auto px-4 relative z-10">
              <TestimonialsShowcase />
            </div>
          </section>
          
          <section className="py-24 bg-gradient-to-br from-pink-50/50 via-rose-50/50 to-orange-50/50 relative overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
            <div className="container mx-auto px-4">
              <StepByStepGuide />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
