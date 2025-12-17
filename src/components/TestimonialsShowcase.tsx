import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Quote,
  Star,
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
      rating: 5
    },
    {
      id: "bima-leap",
      name: "Vivek Gaur",
      title: "Head of Business Operations",
      company: "BIMA LEAP",
      industry: "Insurance Brokerage",
      companySize: "Motherson Group subsidiary",
      quote: "In-Sync has simplified the business processes for us. I am able to measure agent performance on a day-to-day basis with agile reporting system.",
      rating: 5
    },
    {
      id: "aliceblue",
      name: "Vijayalakshmi R",
      title: "Head of Business Operations",
      company: "AliceBlue",
      industry: "Stock Brokerage",
      companySize: "SEBI approved stockbroker",
      quote: "In-Sync is unique, simple to use and effective. It made a very difficult business problem of managing productivity of WFH teams easy. Thanks In-Sync team!",
      rating: 5
    },
    {
      id: "rupeeboss",
      name: "Ilika Bhattacharya",
      title: "Project Lead",
      company: "RupeeBoss",
      industry: "Financial Services",
      companySize: "NBFC with 12 state operations",
      quote: "In-Sync is a capable and versatile system. The product team took good care to understand and map our processes well so that there has been minimal training issues during the transition. Well done.",
      rating: 5
    },
    {
      id: "carportal",
      name: "Shikeb Ahmed",
      title: "Founder",
      company: "Carportal",
      industry: "Automotive Tech",
      companySize: "Digital lead generation platform",
      quote: "In-Sync has converted our business process online and we are benefitted with it. The team is very supportive.",
      rating: 5
    },
    {
      id: "audi-kolkata",
      name: "Kashif Shaikh",
      title: "CEO",
      company: "Audi Kolkata",
      industry: "Automotive Services",
      companySize: "Authorized Audi dealership",
      quote: "EchoApp has made our use of multi-channel engagement better.",
      rating: 5
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
          <Quote className="w-8 h-8 text-accent" />
          <h2 className="text-3xl font-bold text-foreground">Real Stories from Real People</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Here's what folks are saying about us (spoiler: they're pretty happy!) 
        </p>
      </div>

      <div className="relative">
        {/* Main Testimonial Card */}
        <Card className="mb-8 overflow-hidden">
          <CardContent className="p-8 lg:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(currentTestimonialData.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <Quote className="w-16 h-16 text-primary/20 mx-auto mb-6" />
              
              <blockquote className="text-xl lg:text-2xl text-foreground leading-relaxed mb-8">
                "{currentTestimonialData.quote}"
              </blockquote>
              
              <div className="space-y-2">
                <div className="font-semibold text-xl">{currentTestimonialData.name}</div>
                <div className="text-muted-foreground text-lg">{currentTestimonialData.title}</div>
                <div className="font-medium text-primary text-lg">{currentTestimonialData.company}</div>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <Badge variant="outline" className="text-sm">
                    {currentTestimonialData.industry}
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    {currentTestimonialData.companySize}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mb-8">
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
      </div>

      {/* CTA Section */}
      <div className="text-center mt-12 p-8 bg-primary rounded-2xl">
        <h3 className="text-2xl font-bold mb-4 text-primary-foreground">Want to be our next success story? 🚀</h3>
        <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
          Let's see how we can make your work life awesome in just 30 days
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
            Let's Get Started!
          </Button>
          <Button variant="outline" size="lg" className="border-white/30 text-primary-foreground hover:bg-white/10">
            Show Me More Stories
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsShowcase;