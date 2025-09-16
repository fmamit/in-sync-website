import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Play,
  CheckCircle2,
  Clock,
  Users,
  Settings,
  Rocket,
  Database,
  MessageSquare,
  BarChart3,
  Target,
  ArrowRight,
  BookOpen
} from "lucide-react";

interface GuideStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  tasks: string[];
  deliverables: string[];
  tips: string[];
}

interface ImplementationPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  complexity: "beginner" | "intermediate" | "advanced";
  steps: GuideStep[];
  icon: React.ElementType;
}

const StepByStepGuide = ({ className = "" }: { className?: string }) => {
  const [selectedPath, setSelectedPath] = useState("quick-start");
  const [expandedStep, setExpandedStep] = useState<string>("step-1");

  const implementationPaths: ImplementationPath[] = [
    {
      id: "quick-start",
      title: "Quick Start (30-Day Launch)",
      description: "Get up and running with core features in just one month",
      duration: "30 days",
      complexity: "beginner",
      icon: Rocket,
      steps: [
        {
          id: "step-1",
          title: "Initial Setup & Data Import",
          description: "Set up your In-Sync instance and import existing customer data",
          duration: "Week 1",
          tasks: [
            "Create your In-Sync account and workspace",
            "Import customer data from Excel/CSV files",
            "Set up user accounts for your team",
            "Configure basic company settings and branding"
          ],
          deliverables: [
            "Fully configured In-Sync workspace",
            "All customer data imported and organized",
            "Team members with appropriate access levels"
          ],
          tips: [
            "Start with clean, organized data for best results",
            "Assign a project champion to coordinate the implementation",
            "Begin with core team members, expand access gradually"
          ]
        },
        {
          id: "step-2",
          title: "Communication Channels Setup",
          description: "Connect WhatsApp, SMS, email, and calling capabilities",
          duration: "Week 2",
          tasks: [
            "Connect WhatsApp Business API",
            "Set up SMS gateway integration",
            "Configure email SMTP settings",
            "Test all communication channels"
          ],
          deliverables: [
            "Multi-channel communication system",
            "Branded message templates",
            "Automated response workflows"
          ],
          tips: [
            "Test each channel with small customer groups first",
            "Create message templates that reflect your brand voice",
            "Set up auto-responses for common inquiries"
          ]
        },
        {
          id: "step-3",
          title: "Basic Automation & Workflows",
          description: "Implement essential automated processes for customer engagement",
          duration: "Week 3",
          tasks: [
            "Create lead assignment workflows",
            "Set up follow-up reminder sequences",
            "Configure basic customer journey automation",
            "Implement notification systems for team"
          ],
          deliverables: [
            "Automated lead distribution",
            "Follow-up reminder system",
            "Customer engagement workflows"
          ],
          tips: [
            "Start with simple workflows, add complexity later",
            "Monitor workflow performance and adjust timing",
            "Ensure all team members understand the new processes"
          ]
        },
        {
          id: "step-4",
          title: "Training & Go-Live",
          description: "Train your team and launch the system with customers",
          duration: "Week 4",
          tasks: [
            "Conduct team training sessions",
            "Run pilot tests with select customers",
            "Gather feedback and make adjustments",
            "Full system go-live"
          ],
          deliverables: [
            "Trained team members",
            "System performance validation",
            "Customer feedback incorporated"
          ],
          tips: [
            "Provide hands-on training with real scenarios",
            "Start with your most patient customers for pilot",
            "Keep support documentation easily accessible"
          ]
        }
      ]
    },
    {
      id: "comprehensive",
      title: "Comprehensive Implementation (90 Days)",
      description: "Full-featured deployment with advanced automation and analytics",
      duration: "90 days",
      complexity: "intermediate",
      icon: Settings,
      steps: [
        {
          id: "comp-step-1",
          title: "Foundation & Data Architecture",
          description: "Establish robust data foundation and system architecture",
          duration: "Month 1",
          tasks: [
            "Comprehensive data audit and cleanup",
            "Design custom fields and data structure",
            "Set up advanced user roles and permissions",
            "Integrate with existing business systems"
          ],
          deliverables: [
            "Clean, structured customer database",
            "Custom data fields for business needs",
            "Integrated system ecosystem"
          ],
          tips: [
            "Invest time in data quality - it pays off long-term",
            "Plan custom fields carefully to avoid future restructuring",
            "Document all integrations for future reference"
          ]
        },
        {
          id: "comp-step-2",
          title: "Advanced Communication & Automation",
          description: "Deploy sophisticated communication strategies and automation",
          duration: "Month 2",
          tasks: [
            "Build complex workflow automations",
            "Set up omnichannel communication strategies",
            "Create personalized customer journey maps",
            "Implement AI-powered response systems"
          ],
          deliverables: [
            "Advanced automation workflows",
            "Personalized customer experiences",
            "AI-enhanced communication"
          ],
          tips: [
            "Map customer journeys before building automations",
            "Test automations thoroughly before deploying",
            "Monitor customer responses to personalized content"
          ]
        },
        {
          id: "comp-step-3",
          title: "Analytics & Optimization",
          description: "Implement comprehensive analytics and continuous optimization",
          duration: "Month 3",
          tasks: [
            "Set up advanced analytics dashboards",
            "Create custom KPI tracking",
            "Implement A/B testing for communications",
            "Establish optimization processes"
          ],
          deliverables: [
            "Comprehensive analytics dashboard",
            "Custom KPI monitoring",
            "Data-driven optimization framework"
          ],
          tips: [
            "Focus on metrics that drive business outcomes",
            "Set up regular review cycles for optimization",
            "Train team on interpreting and acting on analytics"
          ]
        }
      ]
    },
    {
      id: "enterprise",
      title: "Enterprise Transformation (6 Months)",
      description: "Complete business process transformation with custom solutions",
      duration: "180 days",
      complexity: "advanced",
      icon: Target,
      steps: [
        {
          id: "ent-step-1",
          title: "Strategic Planning & Architecture",
          description: "Comprehensive business analysis and solution architecture design",
          duration: "Month 1-2",
          tasks: [
            "Complete business process audit",
            "Design enterprise architecture",
            "Plan phased rollout strategy",
            "Establish governance framework"
          ],
          deliverables: [
            "Enterprise architecture blueprint",
            "Implementation roadmap",
            "Governance framework"
          ],
          tips: [
            "Involve stakeholders from all departments",
            "Plan for change management from the start",
            "Design for scalability and future growth"
          ]
        },
        {
          id: "ent-step-2",
          title: "Custom Development & Integration",
          description: "Build custom solutions and integrate with enterprise systems",
          duration: "Month 3-4",
          tasks: [
            "Develop custom business applications",
            "Integrate with ERP and other enterprise systems",
            "Build advanced reporting and analytics",
            "Implement enterprise security measures"
          ],
          deliverables: [
            "Custom business applications",
            "Enterprise system integrations",
            "Advanced security implementation"
          ],
          tips: [
            "Follow enterprise development best practices",
            "Implement security measures at every level",
            "Plan for future system updates and maintenance"
          ]
        },
        {
          id: "ent-step-3",
          title: "Rollout & Optimization",
          description: "Phased deployment across organization with continuous optimization",
          duration: "Month 5-6",
          tasks: [
            "Execute phased rollout plan",
            "Provide comprehensive training programs",
            "Monitor performance and optimize",
            "Establish continuous improvement processes"
          ],
          deliverables: [
            "Fully deployed enterprise solution",
            "Trained organization-wide",
            "Optimization processes in place"
          ],
          tips: [
            "Plan rollout in manageable phases",
            "Provide ongoing support and training",
            "Establish feedback loops for continuous improvement"
          ]
        }
      ]
    }
  ];

  const currentPath = implementationPaths.find(path => path.id === selectedPath)!;
  const currentStep = currentPath.steps.find(step => step.id === expandedStep);

  const complexityColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800", 
    advanced: "bg-red-100 text-red-800"
  };

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BookOpen className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Implementation Guide</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose your implementation path and follow our step-by-step guide to ensure successful deployment
        </p>
      </div>

      {/* Path Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {implementationPaths.map((path) => (
          <Card 
            key={path.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedPath === path.id ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
            onClick={() => setSelectedPath(path.id)}
          >
            <CardHeader className="text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <path.icon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{path.title}</CardTitle>
              <CardDescription>{path.description}</CardDescription>
              <div className="flex items-center justify-center gap-4 mt-4">
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {path.duration}
                </Badge>
                <Badge className={`text-xs ${complexityColors[path.complexity]}`}>
                  {path.complexity}
                </Badge>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Implementation Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Steps Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Implementation Steps</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Progress value={(currentPath.steps.findIndex(s => s.id === expandedStep) + 1) / currentPath.steps.length * 100} className="h-2" />
                <span>{currentPath.steps.findIndex(s => s.id === expandedStep) + 1}/{currentPath.steps.length}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {currentPath.steps.map((step, index) => (
                <Button
                  key={step.id}
                  variant={expandedStep === step.id ? "default" : "ghost"}
                  className="w-full justify-start text-left h-auto py-3 px-3"
                  onClick={() => setExpandedStep(step.id)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className={`w-6 h-6 min-w-[24px] rounded-full flex items-center justify-center text-xs font-semibold mt-0.5 ${
                      expandedStep === step.id ? 'bg-primary-foreground text-primary' : 'bg-primary/10 text-primary'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-sm leading-relaxed break-words hyphens-auto flex-1">{step.title}</span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Step Details */}
        <div className="lg:col-span-3">
          {currentStep && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{currentStep.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {currentStep.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    <Clock className="w-3 h-3 mr-1" />
                    {currentStep.duration}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tasks" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="tasks" className="text-xs">Tasks</TabsTrigger>
                    <TabsTrigger value="deliverables" className="text-xs">Deliverables</TabsTrigger>
                    <TabsTrigger value="tips" className="text-xs">Pro Tips</TabsTrigger>
                    <TabsTrigger value="resources" className="text-xs">Resources</TabsTrigger>
                  </TabsList>

                  <TabsContent value="tasks" className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Key Tasks
                    </h4>
                    <div className="space-y-3">
                      {currentStep.tasks.map((task, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className="w-5 h-5 rounded border-2 border-primary/30 flex items-center justify-center mt-0.5">
                            <div className="w-2 h-2 rounded bg-primary/60"></div>
                          </div>
                          <span className="text-sm">{task}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="deliverables" className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      Expected Deliverables
                    </h4>
                    <div className="space-y-3">
                      {currentStep.deliverables.map((deliverable, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-800">{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="tips" className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Play className="w-4 h-4 text-primary" />
                      Pro Tips for Success
                    </h4>
                    <div className="space-y-3">
                      {currentStep.tips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                            <span className="text-blue-600 text-xs font-semibold">
                              💡
                            </span>
                          </div>
                          <span className="text-sm text-blue-800">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="resources" className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Database className="w-4 h-4 text-primary" />
                      Helpful Resources
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="w-4 h-4 text-primary" />
                            <span className="font-medium text-sm">Documentation</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">
                            Detailed guides and API documentation
                          </p>
                          <Button size="sm" variant="outline" className="w-full">
                            View Docs
                          </Button>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="font-medium text-sm">Support Team</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">
                            Get help from our implementation experts
                          </p>
                          <Button size="sm" variant="outline" className="w-full">
                            Contact Support
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <Button 
                    variant="outline"
                    disabled={currentPath.steps.findIndex(s => s.id === expandedStep) === 0}
                    onClick={() => {
                      const currentIndex = currentPath.steps.findIndex(s => s.id === expandedStep);
                      if (currentIndex > 0) {
                        setExpandedStep(currentPath.steps[currentIndex - 1].id);
                      }
                    }}
                  >
                    Previous Step
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    Step {currentPath.steps.findIndex(s => s.id === expandedStep) + 1} of {currentPath.steps.length}
                  </div>
                  
                  <Button
                    disabled={currentPath.steps.findIndex(s => s.id === expandedStep) === currentPath.steps.length - 1}
                    onClick={() => {
                      const currentIndex = currentPath.steps.findIndex(s => s.id === expandedStep);
                      if (currentIndex < currentPath.steps.length - 1) {
                        setExpandedStep(currentPath.steps[currentIndex + 1].id);
                      }
                    }}
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl">
        <h3 className="text-2xl font-bold mb-4">Ready to Start Your Implementation?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our implementation experts will guide you through every step to ensure your success
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">
            Schedule Implementation Call
          </Button>
          <Button variant="outline" size="lg">
            Download Implementation Checklist
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepByStepGuide;