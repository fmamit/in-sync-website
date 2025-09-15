import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlayCircle,
  Pause,
  RotateCcw,
  Zap,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  MessageSquare,
  Phone,
  Target,
  BarChart3
} from "lucide-react";

interface BeforeAfterScenario {
  id: string;
  title: string;
  industry: string;
  metric: string;
  before: {
    value: string;
    description: string;
    problems: string[];
  };
  after: {
    value: string;
    description: string;
    improvements: string[];
  };
  icon: React.ElementType;
  color: string;
}

const InteractiveShowcase = ({ className = "" }: { className?: string }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentScenario, setCurrentScenario] = useState("revenue");
  const [showAfter, setShowAfter] = useState(false);

  const scenarios: BeforeAfterScenario[] = [
    {
      id: "revenue",
      title: "Revenue Growth",
      industry: "Retail Fashion",
      metric: "Monthly Revenue",
      before: {
        value: "₹25 Lakh",
        description: "Limited repeat customers, poor follow-up",
        problems: [
          "Customers buy once and never return",
          "No systematic follow-up process",
          "Inventory frequently out of stock",
          "Poor customer communication"
        ]
      },
      after: {
        value: "₹1.25 Crore",
        description: "Systematic customer engagement & retention",
        improvements: [
          "70% repeat customer rate",
          "Automated follow-up campaigns",
          "Real-time inventory management",
          "Multi-channel customer communication"
        ]
      },
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      id: "time-savings",
      title: "Time Efficiency",  
      industry: "Manufacturing",
      metric: "Daily Admin Work",
      before: {
        value: "6 Hours",
        description: "Manual data entry and paperwork",
        problems: [
          "Manual customer data entry",
          "Paper-based order tracking", 
          "Time-consuming report generation",
          "Disconnected communication tools"
        ]
      },
      after: {
        value: "1.5 Hours",
        description: "Automated processes and workflows",
        improvements: [
          "Automated data capture",
          "Digital workflow management",
          "One-click report generation", 
          "Integrated communication platform"
        ]
      },
      icon: Clock,
      color: "text-blue-600"
    },
    {
      id: "customer-satisfaction",
      title: "Customer Satisfaction",
      industry: "Healthcare",
      metric: "Patient Satisfaction Score",
      before: {
        value: "6.2/10",
        description: "Poor communication and long wait times",
        problems: [
          "Patients miss appointments frequently",
          "Long wait times for responses",
          "No appointment reminders",
          "Difficulty reaching staff"
        ]
      },
      after: {
        value: "9.1/10", 
        description: "Proactive communication and streamlined service",
        improvements: [
          "Automated appointment reminders",
          "Instant response to patient queries",
          "Real-time appointment scheduling",
          "Multi-channel patient communication"
        ]
      },
      icon: Users,
      color: "text-purple-600"
    },
    {
      id: "conversion-rate",
      title: "Lead Conversion",
      industry: "Real Estate",
      metric: "Lead to Sale Conversion",
      before: {
        value: "8%",
        description: "Inconsistent follow-up, leads slip through cracks",
        problems: [
          "Missed follow-up appointments",
          "Leads not properly tracked",
          "Inconsistent communication",
          "No systematic nurturing process"
        ]
      },
      after: {
        value: "24%",
        description: "Systematic lead nurturing and tracking",
        improvements: [
          "Automated lead scoring and prioritization",
          "Systematic follow-up sequences",
          "Complete lead interaction history",
          "Multi-touchpoint nurturing campaigns"
        ]
      },
      icon: Target,
      color: "text-orange-600"
    }
  ];

  const currentData = scenarios.find(s => s.id === currentScenario)!;

  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setShowAfter(false);
    
    // Show transformation animation
    setTimeout(() => {
      setShowAfter(true);
    }, 1000);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 3000);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setShowAfter(false);
  };

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Zap className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Interactive Transformation Showcase</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See the dramatic before and after results from real businesses. Click play to watch the transformation unfold.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Scenario Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Scenario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {scenarios.map((scenario) => (
                <Button
                  key={scenario.id}
                  variant={currentScenario === scenario.id ? "default" : "ghost"}
                  className="w-full justify-start text-left p-3 h-auto"
                  onClick={() => {
                    setCurrentScenario(scenario.id);
                    resetAnimation();
                  }}
                >
                  <div className="flex items-start gap-3">
                    <scenario.icon className={`w-5 h-5 mt-0.5 ${
                      currentScenario === scenario.id ? 'text-primary-foreground' : scenario.color
                    }`} />
                    <div>
                      <div className="font-medium text-sm">{scenario.title}</div>
                      <div className={`text-xs ${
                        currentScenario === scenario.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      }`}>
                        {scenario.industry}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Showcase */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <currentData.icon className={`w-6 h-6 ${currentData.color}`} />
                    {currentData.title} Transformation
                  </CardTitle>
                  <CardDescription>{currentData.industry} Industry</CardDescription>
                </div>
                <Badge variant="outline">{currentData.metric}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Animation Controls */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <Button
                  onClick={startAnimation}
                  disabled={isAnimating}
                  size="lg"
                  className="gap-2"
                >
                  {isAnimating ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Transforming...
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-4 h-4" />
                      Watch Transformation
                    </>
                  )}
                </Button>
                <Button
                  onClick={resetAnimation}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>

              {/* Before/After Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Before */}
                <Card className={`transition-all duration-1000 ${
                  isAnimating && !showAfter ? 'scale-105 ring-2 ring-red-500' : 
                  showAfter ? 'opacity-50' : ''
                }`}>
                  <CardHeader className="text-center">
                    <Badge variant="destructive" className="w-fit mx-auto mb-2">Before</Badge>
                    <div className="text-4xl font-bold text-red-600 mb-2">
                      {currentData.before.value}
                    </div>
                    <CardDescription>{currentData.before.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-red-700">Problems:</h4>
                      {currentData.before.problems.map((problem, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                          <span className="text-sm text-muted-foreground">{problem}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* After */}
                <Card className={`transition-all duration-1000 delay-1000 ${
                  showAfter ? 'scale-105 ring-2 ring-green-500' : 'opacity-50'
                }`}>
                  <CardHeader className="text-center">
                    <Badge variant="default" className="w-fit mx-auto mb-2 bg-green-600">After</Badge>
                    <div className={`text-4xl font-bold text-green-600 mb-2 transition-all duration-500 ${
                      showAfter ? 'animate-pulse' : ''
                    }`}>
                      {currentData.after.value}
                    </div>
                    <CardDescription>{currentData.after.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-green-700">Improvements:</h4>
                      {currentData.after.improvements.map((improvement, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                          <span className="text-sm text-muted-foreground">{improvement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Transformation Arrow */}
              <div className="flex justify-center my-8">
                <div className={`transition-all duration-1000 ${
                  isAnimating ? 'scale-110 text-primary' : 'text-muted-foreground'
                }`}>
                  <div className="text-6xl">→</div>
                </div>
              </div>

              {/* Results Summary */}
              {showAfter && (
                <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 animate-fade-in">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-green-800 mb-2">
                        Transformation Complete!
                      </h3>
                      <p className="text-green-700 mb-4">
                        This transformation typically occurs within 30-90 days of implementation
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                          <div className="font-semibold">Implementation Time</div>
                          <div className="text-sm text-green-700">30-90 days</div>
                        </div>
                        <div className="text-center">
                          <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                          <div className="font-semibold">First Results</div>
                          <div className="text-sm text-green-700">Within 2 weeks</div>
                        </div>
                        <div className="text-center">
                          <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
                          <div className="font-semibold">Full ROI</div>
                          <div className="text-sm text-green-700">3-6 months</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* All Scenarios Quick View */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>All Transformation Scenarios</CardTitle>
          <CardDescription>
            Quick overview of improvements across different industries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scenarios.map((scenario) => (
              <div key={scenario.id} className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <scenario.icon className={`w-8 h-8 ${scenario.color} mx-auto mb-3`} />
                <div className="font-semibold mb-1">{scenario.title}</div>
                <div className="text-sm text-muted-foreground mb-3">{scenario.industry}</div>
                <div className="space-y-1">
                  <div className="text-sm">
                    <span className="text-red-600">{scenario.before.value}</span>
                    <span className="mx-2">→</span>
                    <span className="text-green-600 font-semibold">{scenario.after.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl">
        <h3 className="text-2xl font-bold mb-4">Ready for Your Transformation?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join hundreds of businesses that have already experienced these dramatic improvements
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">
            Start Your Transformation
          </Button>
          <Button variant="outline" size="lg">
            Calculate Your Potential
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveShowcase;