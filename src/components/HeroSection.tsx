import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import insyncDiagram from "@/assets/insync-diagram.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-accent/20 py-20 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
            One Platform,{" "}
            <span className="text-green-600">
              Endless Possibilities
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered CRM with no-code customization. Unlimited users. 
            20+ integrations. Field force automation. Built for every industry.
          </p>

          {/* Hero Visual */}
          <div className="mb-12 flex justify-center">
            <div className="relative max-w-md mx-auto">
              <img 
                src={`${insyncDiagram}?t=${Date.now()}`}
                alt="In-Sync Platform Integration Diagram"
                className="w-full h-auto hover:scale-105 transition-transform duration-500"
                onError={(e) => console.error('Image failed to load:', e)}
                onLoad={() => console.log('Image loaded successfully')}
              />
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-105 transition-all">
              Explore Full Platform
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="group border-primary/20 hover:bg-primary/5">
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Start Free Trial
            </Button>
          </div>

          {/* Proof Banner */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold">500K+ calls handled</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold">20MM+ messages</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold text-secondary">99.8% cost reduction proven</span>
              </div>
            </div>
          </div>

          {/* Client Logos Placeholder */}
          <div>
            <p className="text-sm text-muted-foreground mb-6">Trusted by leading brands worldwide</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 items-center opacity-60">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-12 bg-muted/50 rounded-lg flex items-center justify-center">
                  <div className="w-16 h-6 bg-muted rounded"></div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">And 1240+ more organizations across 75 countries</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;