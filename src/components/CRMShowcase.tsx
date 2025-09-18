import React, { useState } from "react";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import aiVoice2 from "@/assets/ai-voice-2.png";
import dripMarketing2 from "@/assets/drip-marketing-2.png";
import autodialer2 from "@/assets/autodialer-2.png";
import crm2 from "@/assets/crm-2.png";
import ticketing2 from "@/assets/ticketing-2.png";
import crmDescription2 from "@/assets/crm-description-2.png";
import email2 from "@/assets/email-2.png";
import whatsapp2 from "@/assets/whatsapp-2.png";
import sms2 from "@/assets/sms-2.png";

const CRMShowcase = () => {
  const crmFeatures = [
    {
      id: "ai-voice-gargi",
      image: aiVoice2,
      title: "Gargi AI Voice Assistant",
      description: "Advanced AI voice interface with natural language processing, voice selection, and real-time transcription capabilities",
      category: "AI & Automation"
    },
    {
      id: "crm-leads",
      image: crm2,
      title: "CRM & Leads Management",
      description: "Comprehensive CRM system with advanced filtering, lead tracking, and customer data management across all touchpoints",
      category: "Sales Management"
    },
    {
      id: "customer-support-tickets",
      image: ticketing2,
      title: "Customer Support Ticketing",
      description: "Complete ticketing system with categorization, priority flags, and detailed customer support workflow management",
      category: "Customer Service"
    },
    {
      id: "customer-support-details",
      image: crmDescription2,
      title: "Customer Support Details",
      description: "Detailed customer support case view with timeline tracking, interaction history, and comprehensive ticket management",
      category: "Customer Service"
    },
    {
      id: "autodialer",
      image: autodialer2,
      title: "Auto Dialler Campaigns",
      description: "Automated calling campaigns with progress tracking, agent assignment, bulk upload, and comprehensive campaign management",
      category: "Sales Management"
    },
    {
      id: "drip-marketing",
      image: dripMarketing2,
      title: "Drip Marketing Automation",
      description: "Multi-channel drip campaigns with journey management, trigger-based automation, and detailed analytics tracking",
      category: "Marketing"
    },
    {
      id: "email-messaging",
      image: email2,
      title: "Email Communication",
      description: "Integrated email platform with team collaboration, broadcast messaging, and comprehensive inbox management",
      category: "Communication"
    },
    {
      id: "whatsapp-business",
      image: whatsapp2,
      title: "WhatsApp Business Integration",
      description: "Native WhatsApp business messaging with contact management, media sharing, and seamless customer communication",
      category: "Communication"
    },
    {
      id: "sms-messaging",
      image: sms2,
      title: "SMS Communication Platform",
      description: "Complete SMS messaging solution with team inboxes, broadcast capabilities, and automated message scheduling",
      category: "Communication"
    }
  ];

  const [selectedFeature, setSelectedFeature] = useState(crmFeatures[0]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/5 to-primary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black,transparent)]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Interactive Demo</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            See{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              In-Sync CRM
            </span>{" "}
            in Action
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore our comprehensive platform through real interface previews. Click any feature below to see it in detail.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Feature List */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {crmFeatures.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    selectedFeature.id === feature.id
                      ? 'bg-primary/5 border-primary/20 shadow-lg'
                      : 'bg-card/50 border-border hover:bg-card hover:border-primary/10 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedFeature(feature)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      selectedFeature.id === feature.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                    }`}>
                      <Play className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-semibold transition-colors ${
                          selectedFeature.id === feature.id ? 'text-primary' : 'text-foreground'
                        }`}>
                          {feature.title}
                        </h4>
                        <ArrowRight className={`w-4 h-4 transition-all duration-300 ${
                          selectedFeature.id === feature.id || hoveredIndex === index
                            ? 'text-primary translate-x-1'
                            : 'text-muted-foreground'
                        }`} />
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                        {feature.category}
                      </span>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Display */}
          <div className="lg:col-span-3">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-card to-card/80 border shadow-2xl">
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={selectedFeature.image}
                    alt={selectedFeature.title}
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Feature Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/95 to-transparent backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xl mb-2">{selectedFeature.title}</h4>
                      <p className="text-muted-foreground">{selectedFeature.description}</p>
                    </div>
                    <Button size="sm" className="shrink-0 ml-4">
                      <Play className="w-4 h-4 mr-2" />
                      View Demo
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Floating indicators */}
              <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                {selectedFeature.category}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid Preview */}
        <div className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {crmFeatures.map((feature, index) => (
              <div
                key={`preview-${feature.id}`}
                className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border ${
                  selectedFeature.id === feature.id
                    ? 'ring-2 ring-primary scale-105 shadow-lg'
                    : 'hover:scale-105 hover:shadow-md border-border/50'
                }`}
                onClick={() => setSelectedFeature(feature)}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 transition-all duration-300 ${
                  selectedFeature.id === feature.id
                    ? 'bg-primary/20'
                    : 'bg-black/20 hover:bg-black/10'
                }`} />
                {selectedFeature.id === feature.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CRMShowcase;