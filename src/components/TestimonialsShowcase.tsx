import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Quote,
  Star,
  TrendingUp,
  Users,
  Building2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  quote: string;
  results: {
    metric: string;
    improvement: string;
    icon: React.ElementType;
  }[];
  rating: number;
  image?: string;
  companySize: string;
}

const TestimonialsShowcase = ({ className = "" }: { className?: string }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: "ecofy",
      name: "Shraboni Fernandes",
      title: "CMO",
      company: "Ecofy",
      industry: "Financial Services",
      companySize: "NBFC with 8 state operations",
      quote: "In-Sync is an easy-to-use solution that has made our communication scaling simple. Their service team and standards are exceptional.",
      rating: 5,
      results: [
        { metric: "Communication Volume", improvement: "317%", icon: TrendingUp },
        { metric: "Message Response Rates", improvement: "6X", icon: Users },
        { metric: "Monthly Messages", improvement: "30K+", icon: Building2 }
      ]
    },
    {
      id: "bima-leap",
      name: "Vivek Gaur",
      title: "Head of Business Operations",
      company: "BIMA LEAP",
      industry: "Insurance Brokerage",
      companySize: "Motherson Group subsidiary",
      quote: "In-Sync has simplified the business processes for us. I am able to measure agent performance on a day-to-day basis with agile reporting system.",
      rating: 5,
      results: [
        { metric: "Call Utilization", improvement: "53X", icon: TrendingUp },
        { metric: "Agent Productivity", improvement: "3X", icon: Users },
        { metric: "Monthly Communications", improvement: "200K+", icon: Building2 }
      ]
    },
    {
      id: "aliceblue",
      name: "Vijayalakshmi R",
      title: "Head of Business Operations",
      company: "AliceBlue",
      industry: "Stock Brokerage",
      companySize: "SEBI approved stockbroker",
      quote: "In-Sync is unique, simple to use and effective. It made a very difficult business problem of managing productivity of WFH teams easy. Thanks In-Sync team!",
      rating: 5,
      results: [
        { metric: "Call Volume", improvement: "133%", icon: TrendingUp },
        { metric: "Outbound Cost Reduction", improvement: "42%", icon: Building2 },
        { metric: "Monthly Communications", improvement: "200K+", icon: Users }
      ]
    },
    {
      id: "rupeeboss",
      name: "Ilika Bhattacharya",
      title: "Project Lead",
      company: "RupeeBoss",
      industry: "Financial Services",
      companySize: "NBFC with 12 state operations",
      quote: "In-Sync is a capable and versatile system. The product team took good care to understand and map our processes well so that there has been minimal training issues during the transition. Well done.",
      rating: 5,
      results: [
        { metric: "System Cost", improvement: "<60%", icon: Building2 },
        { metric: "Implementation Time", improvement: "1 month", icon: TrendingUp },
        { metric: "Training Issues", improvement: "Minimal", icon: Users }
      ]
    },
    {
      id: "carportal",
      name: "Shikeb Ahmed",
      title: "Founder",
      company: "Carportal",
      industry: "Automotive Tech",
      companySize: "Digital lead generation platform",
      quote: "In-Sync has converted our business process online and we are benefitted with it. The team is very supportive.",
      rating: 5,
      results: [
        { metric: "Inbound Leads Handled", improvement: "900", icon: Users },
        { metric: "Agent Productivity", improvement: "3X", icon: TrendingUp },
        { metric: "Lead Verification Time", improvement: "<3.4 mins", icon: Building2 }
      ]
    },
    {
      id: "audi-kolkata",
      name: "Kashif Shaikh",
      title: "CEO",
      company: "Audi Kolkata",
      industry: "Automotive Services",
      companySize: "Authorized Audi dealership",
      quote: "EchoApp has made our use of multi-channel engagement better.",
      rating: 5,
      results: [
        { metric: "Service Scheduling", improvement: "15%", icon: Building2 },
        { metric: "Brand Engagement", improvement: "3X", icon: TrendingUp },
        { metric: "Monthly Communications", improvement: "200K+", icon: Users }
      ]
    }
  ];

  const currentTestimonialData = testimonials[currentTestimonial];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Quote className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Success Stories</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See how businesses across India transformed their operations with In-Sync
        </p>
      </div>

      <div className="relative">
        {/* Main Testimonial Card */}
        <Card className="mb-8 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Quote Section */}
              <div className="p-8 lg:p-12 bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="space-y-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(currentTestimonialData.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <Quote className="w-12 h-12 text-primary/30 mb-4" />
                  
                  <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed">
                    "{currentTestimonialData.quote}"
                  </blockquote>
                  
                  <div className="pt-6 border-t border-border/50">
                    <div className="font-semibold text-lg">{currentTestimonialData.name}</div>
                    <div className="text-muted-foreground">{currentTestimonialData.title}</div>
                    <div className="font-medium text-primary">{currentTestimonialData.company}</div>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {currentTestimonialData.industry}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {currentTestimonialData.companySize}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="p-8 lg:p-12 bg-card">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Measurable Results
                  </h3>
                  
                  <div className="space-y-6">
                    {currentTestimonialData.results.map((result, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <result.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground">{result.metric}</div>
                          <div className="text-2xl font-bold text-primary">{result.improvement}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-border/50">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="text-sm text-green-800 font-medium mb-1">
                        Time to See Results
                      </div>
                      <div className="text-green-700">
                        First improvements visible within 30 days
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial 
                    ? 'bg-primary w-8' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Industry Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                index === currentTestimonial ? 'ring-2 ring-primary bg-primary/5' : ''
              }`}
              onClick={() => goToTestimonial(index)}
            >
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Building2 className="w-4 h-4 text-primary" />
                </div>
                <div className="text-xs font-medium">{testimonial.industry}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {testimonial.results[0].improvement}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl">
        <h3 className="text-2xl font-bold mb-4">Ready to Join These Success Stories?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          See how In-Sync can transform your business operations and deliver measurable results in just 30 days
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">
            Start Your Success Story
          </Button>
          <Button variant="outline" size="lg">
            See More Case Studies
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsShowcase;