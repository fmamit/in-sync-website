import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";

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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
            One Platform,{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Endless Possibilities
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered CRM with no-code customization. Unlimited users. 
            20+ integrations. Field force automation. Built for every industry.
          </p>

          {/* Hero Visual Placeholder */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center border border-primary/20">
                <div className="w-32 h-32 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <div className="text-white font-bold text-2xl">IN-SYNC</div>
                </div>
              </div>
              {/* Spoke elements */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                <div className="w-16 h-16 bg-card border border-border rounded-lg flex items-center justify-center shadow-lg">
                  <div className="w-8 h-8 bg-primary/20 rounded"></div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4">
                <div className="w-16 h-16 bg-card border border-border rounded-lg flex items-center justify-center shadow-lg">
                  <div className="w-8 h-8 bg-secondary/20 rounded"></div>
                </div>
              </div>
              <div className="absolute top-1/2 left-0 transform -translate-x-4 -translate-y-1/2">
                <div className="w-16 h-16 bg-card border border-border rounded-lg flex items-center justify-center shadow-lg">
                  <div className="w-8 h-8 bg-primary/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transform hover:scale-105 transition-all">
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