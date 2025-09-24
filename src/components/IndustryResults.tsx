import React, { useEffect, useState } from "react";
import { MapPin, Users, Zap, Bot, ArrowRight, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const IndustryResults = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      icon: MapPin,
      value: "60+",
      label: "Cities Served",
      description: "Multi-city Operations",
      color: "from-blue-500 to-blue-600",
      delay: "delay-100"
    },
    {
      icon: Users,
      value: "2,500+",
      label: "Clients Managed",
      description: "CarTrends Distribution",
      color: "from-green-500 to-green-600",
      delay: "delay-200"
    },
    {
      icon: Zap,
      value: "100%",
      label: "Real-time Sync",
      description: "All Client Systems",
      color: "from-yellow-500 to-orange-500",
      delay: "delay-300"
    },
    {
      icon: Bot,
      value: "24/7",
      label: "AI Automation",
      description: "Continuous Operations",
      color: "from-purple-500 to-purple-600",
      delay: "delay-500"
    }
  ];

  const CountingNumber = ({ value, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    
    // Special case for "24/7" - don't animate, just display as is
    if (value === "24/7") {
      return <span>{value}</span>;
    }
    
    const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
    const suffix = value.replace(/\d/g, '');

    useEffect(() => {
      if (!isVisible) return;
      
      let start = 0;
      const end = numericValue;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [isVisible, numericValue, duration]);

    return <span>{count}{suffix}</span>;
  };

  return (
    <section className="py-20 relative overflow-hidden bg-muted/30">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
      
      {/* Minimal decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-foreground animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-foreground animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-6">
            <Sparkles className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Proven Track Record</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Industry-Leading
            <span className="block text-muted-foreground">
              Results
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join the ecosystem of successful businesses already transformed by In-Sync. 
            Real numbers, real results, real transformation.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card 
                key={index} 
                className={`relative p-8 bg-card border border-border hover:bg-accent/10 transition-all duration-500 group ${stat.delay} ${
                  isVisible ? 'animate-fade-in translate-y-0' : 'translate-y-8 opacity-0'
                }`}
              >
                {/* Icon with subtle background */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted border border-border mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-foreground" />
                </div>

                {/* Stat Value */}
                <div className="mb-4">
                  <div className="text-4xl md:text-5xl font-bold text-foreground mb-2 font-mono">
                    <CountingNumber value={stat.value} />
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="text-lg font-medium">Ready to transform your business?</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Clock className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Schedule Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border border-border text-foreground hover:bg-accent font-medium px-8 py-4 rounded-xl"
            >
              Start Free Trial
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>30-day free trial</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Setup in 1-2 days</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default IndustryResults;