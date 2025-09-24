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
    <section className="py-20 relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-white/5 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/10 animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Proven Track Record</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Industry-Leading
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Results
            </span>
          </h2>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
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
                className={`relative p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500 group ${stat.delay} ${
                  isVisible ? 'animate-fade-in translate-y-0' : 'translate-y-8 opacity-0'
                }`}
              >
                {/* Icon with gradient background */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Stat Value */}
                <div className="mb-4">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
                    <CountingNumber value={stat.value} />
                  </div>
                  <div className="text-lg font-semibold text-white/90 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-white/70">
                    {stat.description}
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-white/60" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-white/80 mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="text-lg font-medium">Ready to transform your business?</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <Clock className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Schedule Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 font-medium px-8 py-4 rounded-xl"
            >
              Start Free Trial
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>30-day free trial</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <span>Setup in 1-2 days</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default IndustryResults;