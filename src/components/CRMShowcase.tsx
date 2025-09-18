import React, { useState, useEffect } from "react";
import { Play, ArrowRight, Sparkles, Users, TrendingUp, Clock, CheckCircle, Star, Quote, ChevronLeft, ChevronRight, BarChart3, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
  // Enhanced tour steps with user journey focus
  const tourSteps = [
    {
      id: "overview",
      title: "Welcome to In-Sync CRM",
      subtitle: "Your Complete Customer Management Solution",
      description: "Discover how In-Sync CRM transforms your customer relationships with AI-powered automation, unified communications, and intelligent workflows.",
      image: crm2,
      category: "Platform Overview",
      value: "360° Customer View",
      stats: { metric: "Customer Satisfaction", value: "94%" },
      pain_point: "Scattered customer data across multiple tools",
      solution: "Unified customer profiles with complete interaction history",
      cta: "Start Your Journey"
    },
    {
      id: "ai-voice-gargi",
      title: "Meet Gargi - Your AI Voice Assistant",
      subtitle: "Conversations That Convert",
      description: "Advanced AI that handles customer calls naturally, qualifies leads automatically, and never misses an opportunity. Available 24/7 with human-like conversations.",
      image: aiVoice2,
      category: "AI & Automation",
      value: "40% More Qualified Leads",
      stats: { metric: "Call Conversion Rate", value: "78%" },
      pain_point: "Missing calls = missed opportunities",
      solution: "AI handles every call with perfect consistency",
      cta: "See Gargi in Action"
    },
    {
      id: "crm-leads",
      title: "Smart Lead Management",
      subtitle: "From Lead to Loyal Customer",
      description: "Intelligent lead scoring, automated follow-ups, and complete visibility into your sales pipeline. Turn more prospects into paying customers.",
      image: crm2,
      category: "Sales Management",
      value: "3x Faster Sales Cycle",
      stats: { metric: "Lead Conversion", value: "65%" },
      pain_point: "Leads falling through the cracks",
      solution: "Automated nurturing with intelligent prioritization",
      cta: "Boost Your Sales"
    },
    {
      id: "autodialer",
      title: "Intelligent Auto Dialer",
      subtitle: "Scale Your Outreach Efforts",
      description: "Smart calling campaigns that adapt to customer behavior, optimize call timing, and maximize connection rates with built-in compliance features.",
      image: autodialer2,
      category: "Sales Management",
      value: "5x More Connections",
      stats: { metric: "Connect Rate", value: "85%" },
      pain_point: "Low connection rates waste time",
      solution: "AI-optimized calling at perfect timing",
      cta: "Maximize Connections"
    },
    {
      id: "omnichannel",
      title: "Unified Communications Hub",
      subtitle: "Every Channel, One Platform",
      description: "WhatsApp, SMS, Email, and Voice - all conversations flow into one intelligent inbox with context and history preserved.",
      image: whatsapp2,
      category: "Communication",
      value: "Seamless Customer Experience",
      stats: { metric: "Response Time", value: "< 2 min" },
      pain_point: "Customers reach out everywhere",
      solution: "One unified inbox for all communications",
      cta: "Unify Your Channels"
    },
    {
      id: "drip-marketing",
      title: "Automated Marketing Journeys",
      subtitle: "Nurture Every Lead Automatically",
      description: "Trigger-based campaigns that guide prospects through personalized journeys, delivering the right message at the perfect moment.",
      image: dripMarketing2,
      category: "Marketing",
      value: "10x Marketing ROI",
      stats: { metric: "Campaign Engagement", value: "92%" },
      pain_point: "Manual follow-ups don't scale",
      solution: "Intelligent automation that never stops working",
      cta: "Automate Success"
    },
    {
      id: "support-tickets",
      title: "Effortless Customer Support",
      subtitle: "Happy Customers, Every Time",
      description: "Intelligent ticket routing, SLA tracking, and comprehensive customer context ensure every support interaction exceeds expectations.",
      image: ticketing2,
      category: "Customer Service",
      value: "50% Faster Resolution",
      stats: { metric: "Customer Satisfaction", value: "96%" },
      pain_point: "Support tickets pile up",
      solution: "Smart prioritization and automated workflows",
      cta: "Deliver Excellence"
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Auto-advance functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % tourSteps.length);
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, tourSteps.length]);

  // Progress tracking
  useEffect(() => {
    setProgress(((currentStep + 1) / tourSteps.length) * 100);
  }, [currentStep, tourSteps.length]);

  const currentTourStep = tourSteps[currentStep];

  const nextStep = () => {
    setCurrentStep(prev => (prev + 1) % tourSteps.length);
  };

  const prevStep = () => {
    setCurrentStep(prev => (prev - 1 + tourSteps.length) % tourSteps.length);
  };

  const testimonials = [
    {
      text: "In-Sync CRM increased our lead conversion by 300% in just 3 months. The AI voice assistant is a game-changer!",
      author: "Sarah Johnson",
      company: "TechFlow Solutions",
      rating: 5
    },
    {
      text: "Finally, a CRM that actually helps us sell more. The automation saves us 15 hours per week.",
      author: "Michael Chen",
      company: "GrowthVine",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/5 to-primary/5 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black,transparent)]" />
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 relative">
        {/* Header Section with Social Proof */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Interactive Product Tour</span>
            <Badge variant="secondary" className="ml-2">
              <Star className="w-3 h-3 mr-1" />
              Trusted by 10,000+ Businesses
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            See{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              In-Sync CRM
            </span>{" "}
            Transform Your Business
          </h2>
          
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg mb-8 animate-fade-in">
            Take a guided tour through real features that are already helping thousands of businesses 
            increase sales, reduce costs, and delight customers. See exactly how it works for your industry.
          </p>

          {/* Key Benefits Preview */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>300% More Qualified Leads</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>15 Hours Saved Weekly</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-purple-500" />
              <span>96% Customer Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {tourSteps.length}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-xs"
              >
                {isAutoPlaying ? "Pause Tour" : "Auto Play"}
              </Button>
            </div>
          </div>
          <Progress value={progress} className="h-2 mb-4" />
          
          {/* Step Navigation Dots */}
          <div className="flex justify-center gap-2">
            {tourSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Tour Interface */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Tour Content - Left Side */}
            <div className="lg:col-span-5 space-y-6">
              <div className="animate-fade-in">
                <Badge variant="outline" className="mb-4">
                  {currentTourStep.category}
                </Badge>
                
                <h3 className="text-3xl font-bold mb-2">
                  {currentTourStep.title}
                </h3>
                
                <p className="text-xl text-primary mb-4">
                  {currentTourStep.subtitle}
                </p>
                
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {currentTourStep.description}
                </p>

                {/* Value Proposition */}
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg text-primary">
                        {currentTourStep.value}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <BarChart3 className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-muted-foreground">
                          {currentTourStep.stats.metric}
                        </span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {currentTourStep.stats.value}
                        </Badge>
                      </div>
                    </div>
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  
                  {/* Problem/Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="text-red-600">
                      <strong>Problem:</strong> {currentTourStep.pain_point}
                    </div>
                    <div className="text-green-600">
                      <strong>Solution:</strong> {currentTourStep.solution}
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="hover-scale">
                    <Play className="w-4 h-4 mr-2" />
                    {currentTourStep.cta}
                  </Button>
                  <Button variant="outline" size="lg">
                    Schedule Demo
                  </Button>
                </div>
              </div>
            </div>

            {/* Tour Visualization - Right Side */}
            <div className="lg:col-span-7">
              <div className="relative">
                {/* Main Display */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-card to-card/80 border shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                  
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={currentTourStep.image}
                      alt={currentTourStep.title}
                      className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    
                    {/* Interactive Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
                      <Button size="lg" className="shadow-2xl">
                        <Play className="w-6 h-6 mr-2" />
                        Watch Demo
                      </Button>
                    </div>
                  </div>

                  {/* Feature Highlights Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-background/95 backdrop-blur-sm rounded-lg p-4 border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-sm font-medium">Live Demo Available</span>
                        </div>
                        <Badge variant="secondary">
                          {currentTourStep.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between mt-6">
                  <Button
                    variant="ghost"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>No installation required • Instant access</span>
                  </div>
                  
                  <Button
                    onClick={nextStep}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Feature Grid */}
        <div className="mt-16">
          <h4 className="text-center text-lg font-semibold mb-8">Explore All Features</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {tourSteps.map((step, index) => (
              <div
                key={step.id}
                className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border group ${
                  currentStep === index
                    ? 'ring-2 ring-primary scale-105 shadow-lg'
                    : 'hover:scale-105 hover:shadow-md border-border/50'
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 transition-all duration-300 ${
                  currentStep === index
                    ? 'bg-primary/20'
                    : 'bg-black/40 group-hover:bg-black/20'
                }`} />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                  {currentStep === index ? (
                    <div className="text-white">
                      <Play className="w-6 h-6 mx-auto mb-1" />
                      <div className="text-xs font-medium">Playing</div>
                    </div>
                  ) : (
                    <div className="text-white opacity-80 group-hover:opacity-100 transition-opacity">
                      <div className="text-xs font-medium mb-1">{step.category}</div>
                      <div className="text-xs">{step.title}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">4.9/5 from 2,000+ reviews</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-xl p-6 border shadow-sm">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 border">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of businesses already using In-Sync CRM to increase sales, reduce costs, and delight customers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="hover-scale">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Book Personal Demo
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              ✓ No credit card required ✓ Setup in 5 minutes ✓ 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CRMShowcase;