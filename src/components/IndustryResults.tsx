import { useEffect, useState } from "react";
import { MapPin, Users, Zap, Bot, ArrowRight, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DemoRequestModal from "@/components/DemoRequestModal";

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
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600",
      delay: "delay-100"
    },
    {
      icon: Users,
      value: "2500+",
      label: "Clients Managed",
      description: "CarTrends Distribution",
      color: "from-green-500 to-green-600",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-600",
      delay: "delay-200"
    },
    {
      icon: Zap,
      value: "100%",
      label: "Real-time Sync",
      description: "All Client Systems",
      color: "from-yellow-500 to-orange-500",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-600",
      delay: "delay-300"
    },
    {
      icon: Bot,
      value: "24/7",
      label: "AI Automation",
      description: "Continuous Operations",
      color: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-600",
      delay: "delay-500"
    }
  ];

  const CountingNumber = ({ value, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    
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
    <section className="py-28 lg:py-36 relative overflow-hidden section-light">
      {/* Background Elements */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 lg:mb-24">
          <div className="badge-premium mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-foreground font-body">Proven Track Record</span>
          </div>
          
          <h2 className="heading-section text-foreground mb-8 font-heading">
            Industry-Leading
            <span className="block text-muted-foreground mt-2">
              Results
            </span>
          </h2>
          
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
            Join the ecosystem of successful businesses already transformed by In-Sync. 
            Real numbers, real results, real transformation.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card 
                key={index} 
                className={`relative overflow-hidden card-premium group ${stat.delay} ${
                  isVisible ? 'animate-fade-in translate-y-0' : 'translate-y-8 opacity-0'
                }`}
              >
                {/* Gradient Top Border */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="p-8">
                  {/* Icon with styled background */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.iconBg} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${stat.iconColor}`} />
                  </div>

                  {/* Stat Value */}
                  <div className="mb-4">
                    <div className="text-4xl md:text-5xl font-bold text-foreground mb-2 font-mono tracking-tight">
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
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass-card inline-block rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-lg font-medium">Ready to transform your business?</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <DemoRequestModal
                trigger={
                  <Button 
                    size="lg" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 rounded-xl btn-glow btn-premium group"
                  >
                    <Clock className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Schedule Demo
                  </Button>
                }
              />
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Get started FREE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Setup in 1-2 days</span>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider-accent" />
    </section>
  );
};

export default IndustryResults;
