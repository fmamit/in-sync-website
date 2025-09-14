import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import crmLeadsView from "@/assets/crm-leads-new.png";
import crmDetailView from "@/assets/crm-detail-new.png";
import autodialerView from "@/assets/autodialer-new.png";
import dripMarketingView from "@/assets/drip-marketing-new.png";

const CRMShowcase = () => {
  const crmFeatures = [
    {
      id: "crm-leads",
      image: crmLeadsView,
      title: "CRM & Leads Management",
      description: "Advanced CRM with lead tracking, filtering, and comprehensive customer data management"
    },
    {
      id: "customer-support",
      image: crmDetailView,
      title: "Customer Support Hub",
      description: "Complete customer support workflow with ticket management, timeline tracking, and team collaboration"
    },
    {
      id: "auto-dialler",
      image: autodialerView,
      title: "Auto Dialler",
      description: "Automated calling campaigns with progress tracking, agent assignment, and bulk upload capabilities"
    },
    {
      id: "drip-marketing",
      image: dripMarketingView,
      title: "Automated Marketing",
      description: "Multi-channel drip campaigns with WhatsApp, SMS, and Email integration for maximum reach"
    }
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps'
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 bg-gradient-to-r from-emerald-50/25 via-teal-50/15 to-cyan-50/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            See{" "}
            <span className="text-purple-600">
              In-Sync CRM
            </span>{" "}
            in Action
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Experience our intuitive interface designed for modern sales teams
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {crmFeatures.map((feature, index) => (
                <div 
                  key={feature.id} 
                  className={`flex-[0_0_85%] md:flex-[0_0_70%] lg:flex-[0_0_60%] pl-4 transition-all duration-500 ${
                    index === selectedIndex ? 'scale-110 z-10' : 'scale-90 opacity-75'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-primary/10 bg-white">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="text-center px-4">
                      <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg border-primary/20"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg border-primary/20"
            onClick={scrollNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {crmFeatures.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CRMShowcase;