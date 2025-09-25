import React, { useState } from "react";
import { Play, TrendingUp, Users, Clock, Phone, MessageSquare, Mail, Bot, Target, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import crm2 from "@/assets/crm-2.png";
import crmLeadsNew from "@/assets/crm-leads-new.png";
import crmDetailView from "@/assets/crm-detail-view.png";
import aiVoice2 from "@/assets/ai-voice-2.png";
import autodialer2 from "@/assets/autodialer-2.png";
import dripMarketing2 from "@/assets/drip-marketing-2.png";
import ticketing2 from "@/assets/ticketing-2.png";
import whatsapp2 from "@/assets/whatsapp-2.png";

const CRMShowcase = () => {
  const [activeScreen, setActiveScreen] = useState("overview");

  const screens = [
    {
      id: "overview",
      title: "CRM Dashboard",
      description: "Complete customer overview with real-time analytics",
      image: crm2,
      icon: TrendingUp,
      features: ["360° Customer View", "Real-time Analytics", "Performance Metrics"]
    },
    {
      id: "leads",
      title: "Lead Management", 
      description: "Smart lead scoring and automated qualification",
      image: crmLeadsNew,
      icon: Target,
      features: ["Automated Lead Scoring", "Pipeline Management", "Conversion Tracking"]
    },
    {
      id: "details",
      title: "Customer Details",
      description: "Detailed customer profiles with complete history",
      image: crmDetailView,
      icon: Users,
      features: ["Complete History", "Interaction Timeline", "Custom Fields"]
    },
    {
      id: "ai-voice",
      title: "AI Voice Assistant",
      description: "24/7 AI-powered customer conversations",
      image: aiVoice2,
      icon: Bot,
      features: ["Natural Conversations", "Lead Qualification", "24/7 Availability"]
    },
    {
      id: "autodialer",
      title: "Smart Dialer",
      description: "Intelligent calling campaigns with high connect rates",
      image: autodialer2,
      icon: Phone,
      features: ["Smart Timing", "High Connect Rates", "Compliance Ready"]
    },
    {
      id: "marketing",
      title: "Drip Marketing",
      description: "Automated marketing campaigns that convert",
      image: dripMarketing2,
      icon: Mail,
      features: ["Trigger-based Campaigns", "Personalization", "ROI Tracking"]
    },
    {
      id: "support",
      title: "Customer Support",
      description: "Streamlined ticketing and support workflows",
      image: ticketing2,
      icon: Headphones,
      features: ["Smart Routing", "SLA Management", "Customer Satisfaction"]
    },
    {
      id: "whatsapp",
      title: "WhatsApp Integration",
      description: "Native WhatsApp business messaging",
      image: whatsapp2,
      icon: MessageSquare,
      features: ["Business API", "Rich Media", "Automated Responses"]
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "300% More Qualified Leads",
      description: "AI-powered lead qualification and automated follow-ups"
    },
    {
      icon: Clock,
      title: "15 Hours Saved Weekly", 
      description: "Automated workflows eliminate repetitive tasks"
    },
    {
      icon: Users,
      title: "96% Customer Satisfaction",
      description: "Unified communication hub delights customers"
    }
  ];

  const activeScreenData = screens.find(screen => screen.id === activeScreen) || screens[0];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              In-Sync CRM
            </span>{" "}
            Transform Your Business
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Experience the complete customer management solution that helps thousands of businesses grow faster and serve customers better.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            
            {/* Left: Benefits */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Real Results for Real Businesses</h3>
                <p className="text-muted-foreground mb-8">
                  Join thousands of companies already using In-Sync CRM to streamline operations, 
                  boost sales, and deliver exceptional customer experiences.
                </p>
              </div>

              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <Card key={index} className="p-6 border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2">{benefit.title}</h4>
                          <p className="text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="hover-scale">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Live Demo
                </Button>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="lg:col-span-3 relative">
              
              {/* Screen Navigation */}
              <div className="mb-6">
                <Tabs value={activeScreen} onValueChange={setActiveScreen} className="w-full">
                  <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-1 h-auto p-1">
                    {screens.map((screen) => {
                      const IconComponent = screen.icon;
                      return (
                        <TabsTrigger
                          key={screen.id}
                          value={screen.id}
                          className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          <IconComponent className="w-4 h-4" />
                          <span className="text-xs hidden sm:block">{screen.title.split(' ')[0]}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                  
                  {/* Screen Content */}
                  {screens.map((screen) => (
                    <TabsContent key={screen.id} value={screen.id} className="mt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xl font-semibold mb-2">{screen.title}</h4>
                          <p className="text-muted-foreground">{screen.description}</p>
                        </div>
                        
                        {/* Screenshot */}
                        <div className="relative rounded-2xl overflow-hidden bg-card border shadow-xl">
                          <div className="aspect-[16/10] overflow-hidden">
                            <img
                              src={screen.image}
                              alt={screen.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          
                          {/* Overlay for interactivity */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Button size="lg" className="shadow-2xl">
                              <Play className="w-6 h-6 mr-2" />
                              See {screen.title} Live
                            </Button>
                          </div>
                        </div>
                        
                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {screen.features.map((feature, index) => (
                            <div key={index} className="bg-secondary/50 rounded-lg p-3 text-center">
                              <span className="text-sm font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-6 -left-6 bg-card border rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-green-600">94%</div>
                <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
              </div>

              <div className="absolute -top-6 -right-6 bg-card border rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-muted-foreground">Happy Businesses</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CRMShowcase;