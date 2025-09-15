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
      id: "mumbai-fashion",
      name: "Priya Sharma",
      title: "Founder & CEO",
      company: "Mumbai Fashion Boutique",
      industry: "Retail & Fashion",
      companySize: "25 employees",
      quote: "We went from parents leaving us for 'better' schools to having a waiting list of families who specifically choose us because of our communication and organization. It's completely transformed our reputation in the community.",
      rating: 5,
      results: [
        { metric: "Revenue Growth", improvement: "400%", icon: TrendingUp },
        { metric: "Repeat Customers", improvement: "70%", icon: Users },
        { metric: "Customer Value", improvement: "₹45K annual", icon: Building2 }
      ]
    },
    {
      id: "delhi-school",
      name: "Dr. Rajesh Kumar",
      title: "Principal",
      company: "Delhi CBSE School",
      industry: "Education",
      companySize: "150 staff members",
      quote: "In-sync transformed our parent communication completely. We went from 500 students to 1,250 with waiting lists. Parents now feel valued and informed about their child's education journey.",
      rating: 5,
      results: [
        { metric: "Enrollment Growth", improvement: "250%", icon: TrendingUp },
        { metric: "Parent Satisfaction", improvement: "95%", icon: Users },
        { metric: "Additional Revenue", improvement: "₹1.5 Crore", icon: Building2 }
      ]
    },
    {
      id: "healthcare-clinic",
      name: "Dr. Anita Patel",
      title: "Medical Director",
      company: "Wellness Care Clinic",
      industry: "Healthcare",
      companySize: "40 staff members",
      quote: "Patient follow-up used to be our biggest challenge. Now we have automated appointment reminders, treatment tracking, and patient satisfaction surveys. Our patient retention improved dramatically.",
      rating: 5,
      results: [
        { metric: "Patient Retention", improvement: "85%", icon: Users },
        { metric: "Appointment Shows", improvement: "60% increase", icon: TrendingUp },
        { metric: "Staff Efficiency", improvement: "40% time saved", icon: Building2 }
      ]
    },
    {
      id: "manufacturing-company",
      name: "Vikram Singh",
      title: "Operations Manager",
      company: "Precision Engineering Ltd",
      industry: "Manufacturing",
      companySize: "200 employees",
      quote: "Field force management was chaotic before In-sync. Now we track our 80+ field engineers in real-time, optimize routes, and eliminated fake expense claims. Productivity is up 30%.",
      rating: 5,
      results: [
        { metric: "Field Productivity", improvement: "30%", icon: TrendingUp },
        { metric: "Expense Claims", improvement: "45% reduction", icon: Building2 },
        { metric: "Customer Satisfaction", improvement: "92%", icon: Users }
      ]
    },
    {
      id: "financial-services",
      name: "Neha Gupta",
      title: "Branch Manager",
      company: "Capital Finance Solutions",
      industry: "Financial Services",
      companySize: "60 employees",
      quote: "Loan processing used to take weeks with manual follow-ups. In-sync automated our entire customer journey from application to disbursement. Processing time reduced from 15 days to 3 days.",
      rating: 5,
      results: [
        { metric: "Processing Time", improvement: "80% faster", icon: TrendingUp },
        { metric: "Customer Complaints", improvement: "90% reduction", icon: Users },
        { metric: "Loan Approvals", improvement: "65% increase", icon: Building2 }
      ]
    },
    {
      id: "real-estate",
      name: "Amit Khanna",
      title: "Managing Director",
      company: "Premium Properties",
      industry: "Real Estate",
      companySize: "35 employees",
      quote: "Lead management was our biggest pain point. Prospects would slip through cracks, follow-ups were inconsistent. In-sync gave us complete visibility - our conversion rate doubled in 6 months.",
      rating: 5,
      results: [
        { metric: "Lead Conversion", improvement: "100% increase", icon: TrendingUp },
        { metric: "Follow-up Consistency", improvement: "95%", icon: Users },
        { metric: "Sales Cycle", improvement: "40% shorter", icon: Building2 }
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