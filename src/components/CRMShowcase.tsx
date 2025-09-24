import React from "react";
import { Play, TrendingUp, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import crm2 from "@/assets/crm-2.png";

const CRMShowcase = () => {
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

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
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
                <Button variant="outline" size="lg">
                  Start Free Trial
                </Button>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="lg:col-span-3 relative">
              <div className="relative rounded-2xl overflow-hidden bg-card border shadow-xl">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={crm2}
                    alt="In-Sync CRM Dashboard"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Overlay for interactivity */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="lg" className="shadow-2xl">
                    <Play className="w-6 h-6 mr-2" />
                    See It In Action
                  </Button>
                </div>
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