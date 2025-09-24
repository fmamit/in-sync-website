import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import OnboardingModal from "./OnboardingModal";
import { 
  Rocket,
  Target,
  TrendingUp,
  Zap,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowRight,
  BarChart3,
  MessageSquare,
  Settings,
  Star
} from "lucide-react";

interface JourneyStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  metrics: {
    label: string;
    value: string;
    change: string;
    color: string;
  }[];
  duration: string;
  status: 'completed' | 'current' | 'upcoming';
}

const PlatformJourney = ({ className = "" }: { className?: string }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const journeySteps: JourneyStep[] = [
    {
      id: 0,
      title: "Starting Point",
      description: "Manual processes, scattered data, missed opportunities",
      icon: Settings,
      metrics: [
        { label: "Lead Conversion", value: "12%", change: "baseline", color: "text-red-500" },
        { label: "Customer Satisfaction", value: "6.8/10", change: "baseline", color: "text-red-500" },
        { label: "Team Productivity", value: "45%", change: "baseline", color: "text-red-500" }
      ],
      duration: "Current State",
      status: 'completed'
    },
    {
      id: 1,
      title: "Quick Setup & Integration",
      description: "Seamless onboarding with existing tools and processes",
      icon: Rocket,
      metrics: [
        { label: "Setup Time", value: "2 days", change: "vs 2 weeks industry avg", color: "text-blue-500" },
        { label: "Data Migration", value: "100%", change: "zero data loss", color: "text-blue-500" },
        { label: "Team Training", value: "4 hours", change: "intuitive interface", color: "text-blue-500" }
      ],
      duration: "Week 1",
      status: activeStep >= 1 ? 'completed' : activeStep === 0 ? 'current' : 'upcoming'
    },
    {
      id: 2,
      title: "Automation Takes Effect",
      description: "Workflows streamlined, manual tasks eliminated, efficiency gains",
      icon: Zap,
      metrics: [
        { label: "Manual Tasks", value: "75%", change: "reduction", color: "text-green-500" },
        { label: "Response Time", value: "<2 min", change: "vs 4 hours before", color: "text-green-500" },
        { label: "Follow-up Rate", value: "95%", change: "vs 40% before", color: "text-green-500" }
      ],
      duration: "Week 2-4",
      status: activeStep >= 2 ? 'completed' : activeStep === 1 ? 'current' : 'upcoming'
    },
    {
      id: 3,
      title: "Customer Experience Boost",
      description: "Personalized interactions, faster responses, higher satisfaction",
      icon: Users,
      metrics: [
        { label: "Customer Satisfaction", value: "9.2/10", change: "+35% improvement", color: "text-purple-500" },
        { label: "Response Rate", value: "89%", change: "+120% increase", color: "text-purple-500" },
        { label: "Repeat Customers", value: "68%", change: "+85% growth", color: "text-purple-500" }
      ],
      duration: "Month 1-2",
      status: activeStep >= 3 ? 'completed' : activeStep === 2 ? 'current' : 'upcoming'
    },
    {
      id: 4,
      title: "Revenue Growth Acceleration",
      description: "Optimized sales funnel, better conversion, increased revenue",
      icon: TrendingUp,
      metrics: [
        { label: "Lead Conversion", value: "34%", change: "+183% increase", color: "text-emerald-500" },
        { label: "Sales Cycle", value: "18 days", change: "50% faster", color: "text-emerald-500" },
        { label: "Revenue Growth", value: "145%", change: "quarter over quarter", color: "text-emerald-500" }
      ],
      duration: "Month 2-3",
      status: activeStep >= 4 ? 'completed' : activeStep === 3 ? 'current' : 'upcoming'
    },
    {
      id: 5,
      title: "Optimized Operations",
      description: "Full platform utilization, predictive insights, sustainable growth",
      icon: Target,
      metrics: [
        { label: "ROI Achievement", value: "320%", change: "within 6 months", color: "text-yellow-500" },
        { label: "Team Productivity", value: "185%", change: "efficiency gain", color: "text-yellow-500" },
        { label: "Customer Lifetime Value", value: "240%", change: "increase", color: "text-yellow-500" }
      ],
      duration: "Month 4-6",
      status: activeStep >= 5 ? 'completed' : activeStep === 4 ? 'current' : 'upcoming'
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setActiveStep((prev) => {
          const next = (prev + 1) % journeySteps.length;
          setProgress((next / (journeySteps.length - 1)) * 100);
          return next;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, journeySteps.length]);

  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
    setProgress((stepIndex / (journeySteps.length - 1)) * 100);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const currentStep = journeySteps[activeStep];

  return (
    <div className={`max-w-7xl mx-auto ${className}`}>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Rocket className="w-8 h-8 text-primary" />
          <h2 className="text-4xl font-bold">Your Platform Journey</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Watch how In-Sync CRM transforms your business operations step-by-step, 
          with real metrics and timelines from actual implementations
        </p>
      </div>

      {/* Journey Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">Progress</span>
          <Button
            onClick={toggleAutoPlay}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            {isAutoPlaying ? (
              <>
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Auto Playing
              </>
            ) : (
              <>
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Play Journey
              </>
            )}
          </Button>
        </div>
        <Progress value={progress} className="h-3" />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">Start</span>
          <span className="text-xs text-muted-foreground">Full Transformation</span>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {journeySteps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <Button
              key={step.id}
              variant={activeStep === index ? "default" : "outline"}
              className="h-auto p-4 flex flex-col items-center gap-2 relative cursor-pointer"
              onClick={() => handleStepClick(index)}
            >
              {step.status === 'completed' && activeStep > index && (
                <CheckCircle className="absolute -top-2 -right-2 w-5 h-5 text-green-500 bg-white rounded-full" />
              )}
              <IconComponent className={`w-6 h-6 ${
                activeStep === index 
                  ? 'text-primary-foreground' 
                  : step.status === 'completed' ? 'text-green-500' : 'text-muted-foreground'
              }`} />
              <span className={`text-xs text-center font-medium ${
                activeStep === index ? 'text-primary-foreground' : ''
              }`}>
                {step.title}
              </span>
              <Badge 
                variant={activeStep === index ? "secondary" : "outline"} 
                className="text-xs"
              >
                {step.duration}
              </Badge>
            </Button>
          );
        })}
      </div>

      {/* Current Step Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Step Information */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-full">
                  <currentStep.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{currentStep.title}</h3>
                  <p className="text-muted-foreground text-lg">{currentStep.description}</p>
                  <Badge className="mt-3" variant="outline">
                    {currentStep.duration}
                  </Badge>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentStep.metrics.map((metric, index) => (
                  <Card key={index} className="p-4 border-2 hover:shadow-md transition-shadow">
                    <div className="text-center">
                      <div className={`text-3xl font-bold mb-2 ${metric.color}`}>
                        {metric.value}
                      </div>
                      <div className="font-medium text-sm mb-1">{metric.label}</div>
                      <div className="text-xs text-muted-foreground">{metric.change}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visual Progress Indicator */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-primary">
                      {Math.round((activeStep / (journeySteps.length - 1)) * 100)}%
                    </span>
                  </div>
                </div>
                {activeStep > 0 && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
              
              <h4 className="font-semibold mb-2">Journey Progress</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Step {activeStep + 1} of {journeySteps.length}
              </p>
              
              {activeStep < journeySteps.length - 1 && (
                <Button
                  onClick={() => handleStepClick(activeStep + 1)}
                  className="gap-2"
                  size="sm"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Stories Carousel */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <h3 className="text-xl font-bold text-center mb-6">Real Success Stories at This Stage</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                company: "TechCorp Solutions",
                industry: "Software Services",
                result: "300% ROI in 4 months",
                quote: "The automated workflows saved us 20 hours per week",
                avatar: "TC"
              },
              {
                company: "GreenLeaf Healthcare",
                industry: "Healthcare",
                result: "89% patient satisfaction",
                quote: "Patient communication became seamless and professional",
                avatar: "GH"
              },
              {
                company: "Metropolitan Realty",
                industry: "Real Estate",
                result: "45% faster closings",
                quote: "Lead nurturing is now completely automated and effective",
                avatar: "MR"
              }
            ].map((story, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {story.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{story.company}</div>
                    <div className="text-xs text-muted-foreground">{story.industry}</div>
                  </div>
                </div>
                <blockquote className="text-sm italic mb-3">"{story.quote}"</blockquote>
                <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                  <Star className="w-3 h-3 fill-current" />
                  {story.result}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="text-center p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl">
        <h3 className="text-3xl font-bold mb-4">Start Your Transformation Journey</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-lg">
          Join the hundreds of businesses already experiencing these results. 
          Your transformation begins with a single conversation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <OnboardingModal trigger={
            <Button size="lg" className="gap-2">
              <Rocket className="w-5 h-5" />
              Begin My Journey
            </Button>
          } />
          <Button variant="outline" size="lg" className="gap-2">
            <MessageSquare className="w-5 h-5" />
            Talk to an Expert
          </Button>
        </div>
        
        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            2-day setup
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            No contract lock-in
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Results in 2 weeks
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformJourney;