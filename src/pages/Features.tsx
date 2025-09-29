import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SEOHelmet from "@/components/SEOHelmet";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { defaultSEOConfig, getProductSchema } from "@/utils/seo";
import KeyFeatures from "@/components/KeyFeatures";
import DemoRequestModal from "@/components/DemoRequestModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  MessageSquare, 
  MapPin, 
  Brain, 
  Wrench,
  Shield,
  BarChart3,
  Users,
  Target,
  Zap,
  CheckCircle,
  Phone,
  Bot,
  Workflow,
  Settings,
  Lock,
  PlayCircle,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  Calculator,
  ArrowLeft
} from "lucide-react";

const Features = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [calculatorValues, setCalculatorValues] = useState({
    employees: 50,
    callsPerDay: 100,
    currentCost: 5000
  });

  // Map feature IDs to corresponding sections
  const featureMapping = {
    "crm-sales": "crm-sales",
    "ai-first": "ai-first", 
    "ccaas": "ccaas",
    "multi-channel-marketing": "multi-channel-marketing",
    "field-force": "field-force",
    "custom-analytics": "custom-analytics",
    "no-code": "no-code",
    "integrations": "integrations"
  };

  useEffect(() => {
    const section = searchParams.get('section');
    if (section && featureMapping[section as keyof typeof featureMapping]) {
      // Small delay to ensure page is rendered
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  }, [searchParams]);

  const handleBackToHome = () => {
    navigate('/?scrollTo=features-overview');
  };

  const featureCategories = [
    {
      icon: Database,
      title: "Core CRM Features",
      features: [
        "Unlimited contacts and leads",
        "Visual pipeline builder",
        "Task automation",
        "Customer service management",
        "Advanced lead scoring",
        "Win/loss analysis"
      ]
    },
    {
      icon: MessageSquare,
      title: "Communication Suite",
      features: [
        "Click-to-call & auto dialer",
        "WhatsApp automation",
        "SMS campaigns",
        "Email sequences",
        "Multi-channel messaging",
        "IVR system integration"
      ]
    },
    {
      icon: MapPin,
      title: "Field Force Automation",
      features: [
        "GPS attendance tracking",
        "Live location monitoring",
        "Route optimization",
        "Mobile CRM access",
        "Expense management",
        "Performance analytics"
      ]
    },
    {
      icon: Brain,
      title: "AI & Automation",
      features: [
        "Gargi AI autonomous calling",
        "Predictive analytics",
        "Workflow automation",
        "Sentiment analysis",
        "Lead scoring algorithms",
        "99.8% cost reduction proven"
      ]
    },
    {
      icon: Wrench,
      title: "No-Code Customization",
      features: [
        "Visual workflow builder",
        "Custom form designer",
        "Report builder",
        "Module creator",
        "Conditional logic",
        "Integration flows"
      ]
    },
    {
      icon: Shield,
      title: "Integrations & Security",
      features: [
        "20+ native integrations",
        "PowerBI native connection",
        "Excel & Tally sync",
        "Private cloud deployment",
        "2FA authentication",
        "API connectivity"
      ]
    }
  ];

  const detailedFeatures = [
    {
      icon: Target,
      title: "Core CRM Features",
      items: [
        {
          title: "Contact & Lead Management",
          description: "Unlimited contacts, custom fields, lead scoring, duplicate detection, import/export, source tracking"
        },
        {
          title: "Sales Pipeline Management", 
          description: "Visual pipeline builder, custom stages, probability tracking, forecasting, territory management"
        },
        {
          title: "Task & Activity Management",
          description: "Task automation, calendar integration, meeting scheduling, activity logging, reminders"
        },
        {
          title: "Customer Service Management",
          description: "Ticket management, case resolution, satisfaction tracking, knowledge base, SLA management"
        }
      ]
    },
    {
      icon: Phone,
      title: "Communication Suite",
      items: [
        {
          title: "Calling Functions",
          description: "Click-to-call, auto dialer, IVR system, call recording, analytics, voicemail integration"
        },
        {
          title: "Messaging Automation",
          description: "WhatsApp automation, SMS campaigns, email sequences, multi-channel messaging, templates"
        },
        {
          title: "Marketing Automation",
          description: "Drip campaigns, behavioral triggers, lead nurturing, A/B testing, campaign attribution"
        },
        {
          title: "Delivery Tracking",
          description: "Message delivery status, open rates, click tracking, engagement analytics, response monitoring"
        }
      ]
    },
    {
      icon: MapPin,
      title: "Field Force Automation",
      items: [
        {
          title: "Location & Tracking",
          description: "GPS attendance, live tracking, route optimization, geofencing, distance analytics"
        },
        {
          title: "Mobile Operations",
          description: "Mobile CRM access, offline functionality, photo capture, digital signatures, real-time sync"
        },
        {
          title: "Performance Management",
          description: "Activity monitoring, performance metrics, target tracking, commission calculation"
        },
        {
          title: "Customer Interaction",
          description: "On-site check-ins, customer feedback, service completion, photo documentation"
        }
      ]
    },
    {
      icon: Bot,
      title: "AI & Automation",
      items: [
        {
          title: "Gargi AI Agent",
          description: "Autonomous calling, survey automation, multi-language support, conversation analysis"
        },
        {
          title: "Predictive Analytics",
          description: "Lead scoring, churn prediction, revenue forecasting, performance prediction, risk assessment"
        },
        {
          title: "Workflow Automation",
          description: "Process automation, approval workflows, task assignment, notification systems"
        },
        {
          title: "Intelligence Features",
          description: "Sentiment analysis, pattern recognition, recommendation engine, anomaly detection"
        }
      ]
    }
  ];

  const transformationStories = [
    {
      company: "Incred Financial Services",
      industry: "Fintech",
      problem: "Manual calling processes costing ₹2.5L monthly",
      solution: "Implemented Gargi AI autonomous calling",
      results: {
        costReduction: "99.8%",
        timeSaved: "160 hours/month",
        efficiency: "300% improvement"
      },
      testimonial: "Gargi AI transformed our customer outreach completely. We went from spending ₹2.5L monthly on calls to just ₹500.",
      author: "Operations Head"
    },
    {
      company: "Quess Corp",
      industry: "Manufacturing",
      problem: "Field force tracking and coordination issues",
      solution: "Deployed GPS tracking and mobile CRM",
      results: {
        productivity: "45% increase",
        responseTime: "60% faster",
        accuracy: "95% GPS accuracy"
      },
      testimonial: "Real-time tracking gave us complete visibility into field operations. Productivity increased dramatically.",
      author: "Regional Manager"
    },
    {
      company: "Motherson Group",
      industry: "Automotive",
      problem: "Fragmented customer communication across channels",
      solution: "Unified multi-channel communication suite",
      results: {
        engagement: "70% higher",
        responseRate: "85% improvement",
        satisfaction: "4.8/5 rating"
      },
      testimonial: "Having WhatsApp, SMS, and calling in one platform revolutionized our customer engagement.",
      author: "Customer Success Manager"
    }
  ];

  const stepByStepGuides = [
    {
      title: "Set Up Your CRM in 15 Minutes",
      steps: ["Import your contacts", "Configure pipeline stages", "Set up automation rules", "Train your team"],
      duration: "15 min",
      difficulty: "Beginner"
    },
    {
      title: "Launch AI Calling Campaign",
      steps: ["Record your script", "Upload contact list", "Configure Gargi AI settings", "Launch and monitor"],
      duration: "30 min",
      difficulty: "Intermediate"
    },
    {
      title: "Deploy Field Force Tracking",
      steps: ["Install mobile app", "Configure GPS settings", "Set up attendance rules", "Monitor live locations"],
      duration: "45 min",
      difficulty: "Advanced"
    }
  ];

  const calculateSavings = () => {
    const monthlyCalls = calculatorValues.callsPerDay * 30;
    const aiCostPerCall = 0.05; // ₹0.05 per call with AI
    const traditionalCostPerCall = calculatorValues.currentCost / monthlyCalls;
    const aiMonthlyCost = monthlyCalls * aiCostPerCall;
    const savings = calculatorValues.currentCost - aiMonthlyCost;
    const savingsPercentage = (savings / calculatorValues.currentCost) * 100;
    
    return {
      monthlySavings: savings,
      yearlyySavings: savings * 12,
      savingsPercentage: savingsPercentage,
      aiCost: aiMonthlyCost
    };
  };

  const stats = [
    {
      value: "99.8%",
      label: "Cost Reduction with Gargi AI"
    },
    {
      value: "500K+",
      label: "Calls Handled"
    },
    {
      value: "20MM+",
      label: "Messages Processed"
    },
    {
      value: "20+",
      label: "Native Integrations"
    }
  ];

  const structuredData = getProductSchema({
    name: "In-Sync CRM Platform",
    description: "Comprehensive CRM platform with AI-powered automation, multi-channel marketing, and field force management capabilities"
  });

  return (
    <>
      <SEOHelmet 
        config={{
          ...defaultSEOConfig.features,
          structuredData
        }}
      />
      
      <div className="min-h-screen bg-background">
        <Breadcrumbs items={[{ name: 'Features', url: '/features' }]} />
        
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-8 pb-4">
          <Button 
            variant="outline" 
            onClick={handleBackToHome}
            className="mb-4 hover:bg-primary/10 bg-background border-primary/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
        </div>

        {/* Hero Section */}
        <section className="relative py-24 bg-primary text-white overflow-hidden" role="banner">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:16px_16px]" />
        <div className="absolute inset-0 bg-primary/20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium mb-6 bg-white/10 text-white border-white/20">
              <BarChart3 className="h-4 w-4 mr-2" />
              Interactive Feature Experience
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Explore In-Sync CRM Features Through Real Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Jump into interactive demos, real transformation stories, and handy calculators to see what we're all about
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-slate-100">
                <PlayCircle className="h-5 w-5 mr-2" />
                Try the Demo
              </Button>
              <Button size="lg" variant="hero">
                <Calculator className="h-5 w-5 mr-2" />
                See What You'll Save
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-300/10 rounded-full blur-xl" />
      </section>

      {/* Interactive Feature Explorer */}
      <section className="py-20 bg-gradient-to-b from-background to-slate-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 mb-4">
              <Zap className="h-4 w-4 mr-2 text-primary" />
              Interactive Explorer
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Pick Your Feature Adventure 🎯
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Click on any category to see what's inside (we promise it's pretty neat!)
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-12">
              <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
              <TabsTrigger value="crm" className="text-xs">CRM</TabsTrigger>
              <TabsTrigger value="communication" className="text-xs">Communication</TabsTrigger>
              <TabsTrigger value="field-force" className="text-xs">Field Force</TabsTrigger>
              <TabsTrigger value="ai" className="text-xs">AI & Automation</TabsTrigger>
              <TabsTrigger value="no-code" className="text-xs">No-Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="features-grid">
                {featureCategories.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <Card key={index} className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 shadow-lg"
                          onClick={() => setActiveTab(index === 0 ? 'crm' : index === 1 ? 'communication' : index === 2 ? 'field-force' : index === 3 ? 'ai' : 'no-code')}>
                      <CardContent className="p-8">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        
                        <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        
                        <ul className="space-y-3">
                          {category.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                           <li className="text-primary text-sm font-medium cursor-pointer hover:underline">
                            See all {category.features.length - 3} more cool features →
                           </li>
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            
            {/* Detailed feature tabs */}
            <TabsContent value="crm" className="space-y-6">
              <Card id="crm-sales">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Database className="h-6 w-6 text-primary" />
                    Core CRM Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {detailedFeatures[0].items.map((item, index) => (
                      <div key={index} className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-primary">
                        <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="communication" className="space-y-6">
              <Card id="ccaas">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    Communication Suite & CCaaS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {detailedFeatures[1].items.map((item, index) => (
                      <div key={index} className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-teal-500">
                        <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card id="multi-channel-marketing">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-primary" />
                    Multi-channel Marketing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-purple-500">
                      <h4 className="font-semibold text-lg mb-2">CRM-Integrated Campaigns</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Launch targeted campaigns directly from your CRM with personalized messaging across all channels</p>
                    </div>
                    <div className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-purple-500">
                      <h4 className="font-semibold text-lg mb-2">Event-Based Notifications</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Trigger automated messages based on customer behavior, pipeline changes, and business events</p>
                    </div>
                    <div className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-purple-500">
                      <h4 className="font-semibold text-lg mb-2">Drip Marketing</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Create sophisticated drip campaigns with multiple touchpoints and conditional logic</p>
                    </div>
                    <div className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-purple-500">
                      <h4 className="font-semibold text-lg mb-2">Campaign Analytics</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Track performance with detailed analytics on open rates, click-through rates, and conversions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="field-force" className="space-y-6">
              <Card id="field-force">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-primary" />
                    Smart Field Operations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {detailedFeatures[2].items.map((item, index) => (
                      <div key={index} className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-green-500">
                        <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai" className="space-y-6">
              <Card id="ai-first">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Brain className="h-6 w-6 text-primary" />
                    AI That Actually Works
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {detailedFeatures[3].items.map((item, index) => (
                      <div key={index} className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-purple-500">
                        <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="no-code" className="space-y-6">
              <Card id="no-code">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Wrench className="h-6 w-6 text-primary" />
                    True No-Code Platform
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-pink-500">
                      <h4 className="font-semibold text-lg mb-2">Visual Workflow Builder</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Create complex business processes with drag-and-drop simplicity</p>
                    </div>
                    <div className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-pink-500">
                      <h4 className="font-semibold text-lg mb-2">Custom Form Designer</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Build custom forms with conditional logic and validation rules</p>
                    </div>
                    <div className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-pink-500">
                      <h4 className="font-semibold text-lg mb-2">Approval Matrix Builder</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Design multi-level approval workflows with automatic routing</p>
                    </div>
                    <div className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-pink-500">
                      <h4 className="font-semibold text-lg mb-2">Instant Module Generation</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Generate complete modules instantly based on your requirements</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card id="custom-analytics">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <BarChart3 className="h-6 w-6 text-primary" />
                    Adaptive Business Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-indigo-500">
                      <h4 className="font-semibold text-lg mb-2">Custom KPI Dashboards</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Build personalized dashboards with drag-and-drop widgets and real-time data</p>
                    </div>
                    <div className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-indigo-500">
                      <h4 className="font-semibold text-lg mb-2">Real-time Reporting</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Generate dynamic reports with live data updates and interactive visualizations</p>
                    </div>
                    <div className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-indigo-500">
                      <h4 className="font-semibold text-lg mb-2">Data Visualization</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Create stunning charts, graphs, and visual representations of your business data</p>
                    </div>
                    <div className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-indigo-500">
                      <h4 className="font-semibold text-lg mb-2">Performance Metrics</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Track team performance, conversion rates, and business KPIs with automated alerts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card id="integrations">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-primary" />
                    Proven Integrations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-orange-500">
                      <h4 className="font-semibold text-lg mb-2">Enterprise Communication</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Connect with Teams, Slack, email systems, and communication platforms</p>
                    </div>
                    <div className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-orange-500">
                      <h4 className="font-semibold text-lg mb-2">Analytics Pipeline</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Native PowerBI, Tableau, and Excel integration for advanced analytics</p>
                    </div>
                    <div className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-orange-500">
                      <h4 className="font-semibold text-lg mb-2">Lead Generation Ecosystem</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Integrate with marketing platforms, social media, and lead sources</p>
                    </div>
                    <div className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-orange-500">
                      <h4 className="font-semibold text-lg mb-2">Business Operations Hub</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Connect with ERP, accounting systems, and business management tools</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <KeyFeatures />


      {/* Interactive ROI Calculator */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 mb-4">
              <Calculator className="h-4 w-4 mr-2 text-primary" />
              ROI Calculator
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Calculate Your Potential Savings
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See how much you could save with Gargi AI autonomous calling
            </p>
          </div>

          <Card className="max-w-4xl mx-auto border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-6">Your Current Situation</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Number of Employees</label>
                      <input
                        type="range"
                        min="10"
                        max="1000"
                        value={calculatorValues.employees}
                        onChange={(e) => setCalculatorValues(prev => ({...prev, employees: parseInt(e.target.value)}))}
                        className="w-full"
                      />
                      <div className="text-center text-lg font-bold text-primary">{calculatorValues.employees}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Calls Per Day</label>
                      <input
                        type="range"
                        min="10"
                        max="1000"
                        value={calculatorValues.callsPerDay}
                        onChange={(e) => setCalculatorValues(prev => ({...prev, callsPerDay: parseInt(e.target.value)}))}
                        className="w-full"
                      />
                      <div className="text-center text-lg font-bold text-primary">{calculatorValues.callsPerDay}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Current Monthly Cost (₹)</label>
                      <input
                        type="range"
                        min="1000"
                        max="100000"
                        step="1000"
                        value={calculatorValues.currentCost}
                        onChange={(e) => setCalculatorValues(prev => ({...prev, currentCost: parseInt(e.target.value)}))}
                        className="w-full"
                      />
                      <div className="text-center text-lg font-bold text-primary">₹{calculatorValues.currentCost.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-primary/10 to-teal-600/10 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-6">Your Potential Savings</h3>
                  {(() => {
                    const savings = calculateSavings();
                    return (
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-primary mb-2">
                            {savings.savingsPercentage.toFixed(1)}%
                          </div>
                          <p className="text-muted-foreground">Cost Reduction</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-white rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              ₹{savings.monthlySavings.toLocaleString()}
                            </div>
                            <p className="text-sm text-muted-foreground">Monthly Savings</p>
                          </div>
                          <div className="text-center p-4 bg-white rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              ₹{savings.yearlyySavings.toLocaleString()}
                            </div>
                            <p className="text-sm text-muted-foreground">Yearly Savings</p>
                          </div>
                        </div>
                        
                        <div className="text-center text-sm text-muted-foreground">
                          With Gargi AI: ₹{savings.aiCost.toFixed(0)} per month
                        </div>
                        
                        <Button className="w-full" size="lg">
                          Get Detailed ROI Report
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Step-by-Step Implementation */}
      <section className="py-20 bg-gradient-to-b from-background to-slate-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 mb-4">
              <Settings className="h-4 w-4 mr-2 text-primary" />
              Implementation Guides
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Follow our step-by-step guides to implement key features quickly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stepByStepGuides.map((guide, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={guide.difficulty === 'Beginner' ? 'default' : guide.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                      {guide.difficulty}
                    </Badge>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {guide.duration}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {guide.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {stepIndex + 1}
                        </div>
                        <p className="text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Proven Results Across Functions
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <p className="text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Every Feature?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Start your free trial today and discover how In-Sync can transform your business operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="hero">
              Request Demo
            </Button>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </>
  );
};

export default Features;
