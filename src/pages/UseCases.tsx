import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OnboardingModal from "@/components/OnboardingModal";
import { 
  Building2, 
  Car, 
  Users, 
  Megaphone,
  Phone,
  MessageSquare,
  BarChart3,
  MapPin,
  Bot,
  Shield,
  Globe,
  CheckCircle,
  ArrowRight,
  Zap,
  Clock,
  Target,
  TrendingUp,
  Award,
  Star,
  Sparkles,
  ChevronRight,
  PlayCircle,
  AlertTriangle
} from "lucide-react";
import Footer from "@/components/Footer";

const UseCases = () => {
  const realCaseStudies = [
    // Case Studies from Business Transformation PDF
    {
      id: "tata-electra",
      company: "Tata Electra EV",
      industry: "Electric Vehicle Services - Tata Group",
      icon: Car,
      color: "bg-gradient-to-br from-blue-600 to-teal-700",
      challenge: "Tata Electra EV, with EVs deployed across 60+ cities, faced challenges with manual roadside assistance tracking, siloed operations without real-time monitoring, and lack of standardized issue resolution processes.",
      solution: [
        "WhatsApp conversational bot for assistance requests",
        "Automated ticketing with timestamps and location data",
        "Internal approval workflow with SLA compliance",
        "Automated engineer dispatch with field force management",
        "Live GPS tracking and route optimization",
        "Post-service WhatsApp customer satisfaction surveys"
      ],
      results: [
        "Centralized operations across 60 cities",
        "Faster response and resolution times",
        "Agentless customer interaction with AI",
        "Real-time field tracking and automation",
        "Complete operational transparency achieved"
      ],
      workflow: [
        "Customer requests help via WhatsApp bot",
        "Automated ticket creation with location data",
        "Internal approval process for SLA compliance",
        "Nearest engineer automatically dispatched",
        "Live GPS tracking for transparency",
        "Automated post-service satisfaction survey"
      ],
      metrics: { citiesCovered: "60+", responseTime: "Faster", automation: "100%" },
      testimonial: {
        name: "Operations Team",
        role: "Tata Electra EV",
        quote: "In-Sync transformed our roadside assistance from manual tracking to complete automation across 60+ cities with real-time visibility and faster customer response."
      }
    },
    {
      id: "cartrends",
      company: "CarTrends", 
      industry: "Automobile Components Distribution",
      icon: Car,
      color: "bg-gradient-to-br from-orange-600 to-red-700",
      challenge: "CarTrends, serving over 2,500 clients, needed digital transformation for sales, field operations, and customer engagement with real-time inventory visibility and scalable outreach beyond manual field visits.",
      solution: [
        "Unified CRM system with ERP integration",
        "Real-time sales order processing with Tez ERP sync",
        "Mobile field force app with route tracking",
        "Automated order creation and collections",
        "Email & WhatsApp marketing campaigns",
        "Dedicated customer app for digital empowerment"
      ],
      results: [
        "Enhanced operational efficiency and sales visibility",
        "Digitized field force with improved tracking",
        "Faster and accurate order processing",
        "Wider customer outreach via marketing automation",
        "2,500+ customers digitally empowered"
      ],
      workflow: [
        "Customer data unified with real-time inventory",
        "Sales orders created and synced with ERP",
        "Mobile field agents track routes and visits",
        "Automated marketing campaigns deployed",
        "Customer app enables self-service capabilities"
      ],
      metrics: { clients: "2,500+", digitalTransformation: "Complete", efficiency: "Enhanced" },
      testimonial: {
        name: "Sales Team",
        role: "CarTrends",
        quote: "In-Sync's integration with our ERP system transformed our entire sales process, giving us real-time visibility and empowering our 2,500+ customers digitally."
      }
    },
    {
      id: "uhc-staffing",
      company: "UHC Staffing",
      industry: "Recruitment Services - US Operations", 
      icon: Users,
      color: "bg-gradient-to-br from-purple-600 to-indigo-700",
      challenge: "US-based UHC Staffing needed to centralize job and candidate data, automate lead capture from website and bots, while integrating with ExcelHire ATS for real-time updates and AI-driven engagement.",
      solution: [
        "In-Sync as central marketing and recruitment hub",
        "Unified master database for jobs and candidates",
        "Multi-channel automated campaigns via Elastic Email",
        "Real-time ATS synchronization with ExcelHire",
        "AI-powered web and voice bots for engagement",
        "Automated data synchronization for recruiter access"
      ],
      results: [
        "Streamlined marketing and lead generation",
        "Real-time updates from multiple touchpoints",
        "AI automation reducing manual effort",
        "Perfect data synchronization maintained",
        "Enhanced recruiter productivity and engagement"
      ],
      workflow: [
        "Unified marketing outreach and lead capture",
        "Master database consolidates all recruitment data",
        "Automated campaigns via email and SMS",
        "AI bots engage candidates contextually",
        "Real-time sync with ExcelHire ATS"
      ],
      metrics: { automation: "AI-Driven", integration: "Real-time", efficiency: "Enhanced" },
      testimonial: {
        name: "Recruitment Team",
        role: "UHC Staffing",
        quote: "In-Sync created a seamless connection between our marketing efforts and ExcelHire ATS, with AI bots handling candidate engagement and real-time data synchronization."
      }
    },
    {
      id: "rmpl",
      company: "RMPL (Redefine Marcom Pvt Ltd)",
      industry: "Demand Generation & Experiential Marketing",
      icon: Megaphone,
      color: "bg-gradient-to-br from-green-600 to-teal-700",
      challenge: "RMPL, specializing in integrated marketing across events and campaigns, needed centralized control to streamline workflows and improve collaboration across multiple teams and departments.",
      solution: [
        "Project & workflow automation across teams",
        "Integrated call center with smart dialing",
        "Centralized data management system",
        "Real-time dashboards for leadership",
        "Cross-departmental coordination tools",
        "Unified control for efficient execution"
      ],
      results: [
        "Significant reduction in task turnaround time",
        "Enhanced productivity with mobile-display outbound calls",
        "Eliminated operational silos completely",
        "Live dashboard visibility for operations",
        "Better coordination and streamlined processes"
      ],
      workflow: [
        "Automated project workflows across departments",
        "Smart dialing system for call center operations",
        "Centralized data access for all teams",
        "Real-time performance monitoring",
        "Leadership dashboards for strategic decisions"
      ],
      metrics: { turnaroundTime: "Reduced", productivity: "Enhanced", silos: "Eliminated" },
      testimonial: {
        name: "Operations Team",
        role: "RMPL",
        quote: "In-Sync provided the centralized control we needed, eliminating silos and giving us real-time visibility across all our marketing operations and campaigns."
      }
    },
    
    // Case Studies from Recent Success Stories PDF
    {
      id: "ecofy",
      company: "Ecofy",
      industry: "RBI Approved NBFC - Green Energy Lending",
      icon: Building2,
      color: "bg-gradient-to-br from-green-600 to-emerald-700",
      challenge: "Ecofy needed multi-channel communications on one platform that is simple to use and gives the kind of price advantage and versatile access to various channels for their green energy lending operations across 8 states.",
      solution: [
        "In-Sync multi-channel platform for communication",
        "WhatsApp, SMS and email integration",
        "Unified messaging platform for scaling",
        "Response capture and tracking system",
        "Versatile messaging capabilities",
        "Simple-to-use communication interface"
      ],
      results: [
        "317% increase in communication volume",
        "6X message response rates",
        "30K+ messages sent monthly",
        "Complete communication scaling",
        "Streamlined multi-channel operations"
      ],
      workflow: [
        "Multi-channel campaigns launched via In-Sync",
        "Messages sent across WhatsApp, SMS, email",
        "Real-time response tracking and capture",
        "Automated follow-up sequences",
        "Performance analytics and reporting"
      ],
      metrics: { volumeIncrease: "317%", responseRate: "6X", monthlyMessages: "30K+" },
      testimonial: {
        name: "Shraboni Fernandes",
        role: "CMO",
        quote: "In-Sync is an easy-to-use solution that has made our communication scaling simple. Their service team and standards are exceptional."
      }
    },
    {
      id: "bima-leap",
      company: "BIMA LEAP",
      industry: "IRDA Approved Insurance Broker (Motherson Group)",
      icon: Shield,
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      challenge: "BimaLeap needed to streamline their business process of client acquisition through digital campaigns, call center operations and business visibility for strategic decision making.",
      solution: [
        "Multi-service integration system",
        "WhatsApp and email marketing automation",
        "Integrated CRM and call center solution",
        "Business visibility dashboard for management",
        "Strategic decision-making tools",
        "Backbone of business operations"
      ],
      results: [
        ">53X increase in call utilization",
        "3X agent productivity increase",
        "200K+ calls/messages sent monthly",
        "Complete business process streamlining",
        "Enhanced strategic decision making"
      ],
      workflow: [
        "Digital campaigns drive client acquisition",
        "Integrated call center operations",
        "Real-time business visibility tracking",
        "Automated workflow management",
        "Performance monitoring and optimization"
      ],
      metrics: { callUtilization: ">53X", productivity: "3X", monthlyVolume: "200K+" },
      testimonial: {
        name: "Vivek Gaur",
        role: "Head, Business Operations",
        quote: "In-Sync has simplified the business processes for us. I am able to measure agent performance on a day-to-day basis with agile reporting system."
      }
    },
    {
      id: "aliceblue",
      company: "AliceBlue",
      industry: "SEBI Approved Stockbrokers",
      icon: TrendingUp,
      color: "bg-gradient-to-br from-purple-600 to-indigo-700",
      challenge: "AliceBlue needed to have an efficient and easy to use call center for their remotely located teams across several states, with complete WFH operations management.",
      solution: [
        "Complete WFH call center infrastructure",
        "Follow me, auto-dialer, call recording features",
        "Number masking and Truecaller verification",
        "Call logs and agent productivity analysis",
        "Blended WhatsApp services integration",
        "Multi-state call center operations support"
      ],
      results: [
        ">133% increase in call volume",
        "<42% cost for outbound calling",
        "200K+ calls/messages monthly",
        "Complete WFH operationalization",
        "Significant response rate improvement"
      ],
      workflow: [
        "Remote teams access centralized call center",
        "Automated dialing and call management",
        "Real-time productivity tracking",
        "WhatsApp integration for better response",
        "Cross-state coordination and management"
      ],
      metrics: { callVolumeIncrease: ">133%", costReduction: "<42%", monthlyVolume: "200K+" },
      testimonial: {
        name: "Vijayalakshmi R",
        role: "Head, Business Operations",
        quote: "In-Sync is unique, simple to use and effective. It made a very difficult business problem of managing productivity of WFH teams easy. Thanks In-Sync team!"
      }
    },
    {
      id: "rupeeboss",
      company: "RupeeBoss",
      industry: "RBI Approved NBFC - 12 States Operations",
      icon: Building2,
      color: "bg-gradient-to-br from-orange-600 to-red-700",
      challenge: "RupeeBoss had a homegrown CRM system developed over 3 years that needed constant upgrades to match their expansion across 12 states, creating build vs buy decision challenges.",
      solution: [
        "Complete CRM system replacement",
        "Custom build for sales team requirements",
        "Broker setup with custom configurations",
        "Custom MIS implementation",
        "Easy-to-use interface design",
        "Rapid deployment within a month"
      ],
      results: [
        "<60% current cost reduction",
        "Enhanced system capabilities",
        "Minimal training issues during transition",
        "Complete process mapping success",
        "Scalable solution for expansion"
      ],
      workflow: [
        "Process mapping and requirement capture",
        "Custom CRM system development",
        "Sales team and broker configuration",
        "Custom MIS dashboard implementation",
        "Seamless transition from homegrown system"
      ],
      metrics: { costReduction: "<60%", deploymentTime: "1 month", trainingIssues: "Minimal" },
      testimonial: {
        name: "Ilika Bhattacharya",
        role: "Project Lead",
        quote: "In-Sync is a capable and versatile system. The product team took good care to understand and map our processes well so that there has been minimal training issues during the transition. Well done."
      }
    },
    {
      id: "carportal",
      company: "Carportal",
      industry: "Digital Platform - Automobile Lead Generation",
      icon: Car,
      color: "bg-gradient-to-br from-green-600 to-blue-700",
      challenge: "Carportal generates verified leads for automobile companies and dealers. They needed a complete solution for lead generation, call-based verifications, and lead sharing processes.",
      solution: [
        "Zapier-based integrations with FB/Insta/Google/LinkedIn Ads",
        "Central system for real-time lead management",
        "Agent-based lead verification system",
        "Automated lead sharing with dealers",
        "Complete visibility of lead progression",
        "Process optimization tools"
      ],
      results: [
        "900 inbound leads handled",
        "3X agent productivity increase",
        "<3.4 mins average lead verification time",
        "Complete business process digitization",
        "Enhanced lead sharing visibility"
      ],
      workflow: [
        "Multi-platform ad integration via Zapier",
        "Real-time lead capture in central system",
        "Agent verification and qualification",
        "Automated dealer lead distribution",
        "Progress tracking and analytics"
      ],
      metrics: { leadsHandled: "900", productivityIncrease: "3X", verificationTime: "<3.4 mins" },
      testimonial: {
        name: "Shikeb Ahmed",
        role: "Founder",
        quote: "In-Sync has converted our business process online and we are benefitted with it. The team is very supportive."
      }
    },
    {
      id: "audi-kolkata",
      company: "Audi Kolkata",
      industry: "Authorized Audi Dealership - East",
      icon: Car,
      color: "bg-gradient-to-br from-red-600 to-gray-700",
      challenge: "With car servicing being at the heart of its success, Audi Kolkata was facing issues with streamlining automatic triggers for multi-channel service-related messaging.",
      solution: [
        "Automated logic-based messaging process",
        "Multi-channel service communication",
        "WhatsApp, SMS, Email and Voice integration",
        "Automatic messaging triggers",
        "Ad-hoc messaging capabilities",
        "Service department communication enhancement"
      ],
      results: [
        "15% betterment of service scheduling",
        "3X increase in brand engagement messaging",
        "200K+ calls/messages sent monthly",
        "Streamlined service communications",
        "Improved customer engagement"
      ],
      workflow: [
        "Automatic service trigger activation",
        "Multi-channel message deployment",
        "Service scheduling optimization",
        "Brand engagement campaigns",
        "Customer communication tracking"
      ],
      metrics: { serviceImprovement: "15%", engagementIncrease: "3X", monthlyVolume: "200K+" },
      testimonial: {
        name: "Kashif Shaikh",
        role: "CEO",
        quote: "EchoApp has made our use of multi-channel engagement better."
      }
    }
  ];

  const commonFeatures = [
    {
      category: "Core Automation Features",
      icon: Bot,
      features: [
        "WhatsApp Business API Integration",
        "Automated Ticketing & Workflow Systems", 
        "AI-Powered Conversational Bots",
        "Real-time Data Synchronization",
        "GPS Tracking & Field Force Management",
        "Multi-channel Marketing Automation"
      ]
    },
    {
      category: "Integration Capabilities",
      icon: Globe,
      features: [
        "ERP System Integration (Tez ERP)",
        "ATS Integration (ExcelHire)",
        "Email Automation (Elastic Email)",
        "SMS Integration (Twilio)",
        "Third-party API Connections",
        "Custom Workflow Builder"
      ]
    },
    {
      category: "Business Impact",
      icon: BarChart3,
      features: [
        "Centralized Operations Management",
        "Real-time Visibility & Transparency",
        "Reduced Manual Effort & Costs",
        "Improved Response Times",
        "Enhanced Customer Satisfaction",
        "Scalable Business Processes"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:50px_50px]" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-5xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  Success Stories
                </h1>
                <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <Badge variant="outline" className="text-base px-4 py-2 bg-white/50 backdrop-blur-sm">Real Companies</Badge>
                <Badge variant="outline" className="text-base px-4 py-2 bg-white/50 backdrop-blur-sm">Proven Results</Badge>
                <Badge variant="outline" className="text-base px-4 py-2 bg-white/50 backdrop-blur-sm">Measurable ROI</Badge>
                <Badge variant="outline" className="text-base px-4 py-2 bg-white/50 backdrop-blur-sm">Industry Leaders</Badge>
              </div>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                Discover how industry leaders transformed their operations with In-Sync's AI-powered platform.<br />
                <span className="text-primary font-semibold">Real businesses. Real results. Real impact.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                <h2 className="text-4xl lg:text-5xl font-bold">Customer Transformations</h2>
                <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
              </div>
              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span>Industry Recognition</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>Proven Growth</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span>Measurable Results</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-32">
              {realCaseStudies.map((study, index) => {
                const IconComponent = study.icon;
                const isEven = index % 2 === 0;
                return (
                  <div key={study.id} className="relative">
                    {/* Background Elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 rounded-3xl blur-3xl"></div>
                    
                    <div className={`relative grid lg:grid-cols-12 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
                      {/* Company Header & Challenge */}
                      <div className={`lg:col-span-5 space-y-8 ${isEven ? '' : 'lg:col-start-8'}`}>
                        {/* Company Header */}
                        <div className="relative">
                          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-lg"></div>
                          <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-xl">
                            <div className="flex items-start gap-6">
                              <div className={`relative w-20 h-20 ${study.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm"></div>
                                <IconComponent className="relative h-10 w-10 text-white drop-shadow-sm" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-3xl font-bold mb-3">{study.company}</h3>
                                <Badge variant="secondary" className="text-base px-4 py-2 mb-4">{study.industry}</Badge>
                                
                                {/* Key Metrics */}
                                <div className="flex gap-3 mt-4">
                                  {Object.entries(study.metrics).map(([key, value]) => (
                                    <div key={key} className="text-center">
                                      <div className="text-2xl font-bold text-primary">{value}</div>
                                      <div className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Challenge Card */}
                        <div className="relative">
                          <Card className="border-red-200 bg-red-50/80 backdrop-blur-sm shadow-lg">
                            <CardHeader className="pb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                                  <AlertTriangle className="h-5 w-5 text-white" />
                                </div>
                                <CardTitle className="text-xl text-red-800">The Challenge</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-red-700 leading-relaxed font-medium">{study.challenge}</p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      
                      {/* Solution & Results */}
                      <div className={`lg:col-span-7 space-y-8 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                        {/* Solution Card */}
                        <Card className="border-primary/30 bg-primary/5 backdrop-blur-sm shadow-xl">
                          <CardHeader className="pb-6">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-md">
                                <Zap className="h-6 w-6 text-primary-foreground" />
                              </div>
                              <div>
                                <CardTitle className="text-2xl">In-Sync Solution</CardTitle>
                                <p className="text-muted-foreground">Complete digital transformation</p>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid sm:grid-cols-2 gap-4">
                              {study.solution.map((item, sIndex) => (
                                <div key={sIndex} className="group">
                                  <div className="flex items-start gap-3 p-4 bg-white/80 rounded-xl border border-primary/20 hover:border-primary/40 transition-colors">
                                    <div className="w-6 h-6 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                                      <CheckCircle className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium leading-relaxed">{item}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        
                        {/* Results Card */}
                        <Card className="border-green-300 bg-gradient-to-br from-green-50 to-emerald-50/80 backdrop-blur-sm shadow-xl">
                          <CardHeader className="pb-6">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                                <TrendingUp className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-2xl text-green-800">Proven Results</CardTitle>
                                <p className="text-green-600">Measurable business impact</p>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid sm:grid-cols-2 gap-4">
                              {study.results.map((result, rIndex) => (
                                <div key={rIndex} className="group">
                                  <div className="flex items-start gap-3 p-4 bg-white/90 rounded-xl border border-green-200 hover:border-green-300 transition-colors">
                                    <div className="w-6 h-6 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-300 transition-colors">
                                      <Star className="h-4 w-4 text-green-700 fill-green-700" />
                                    </div>
                                    <span className="text-sm font-medium text-green-800 leading-relaxed">{result}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    {/* Workflow Process */}
                    <div className="mt-16">
                      <Card className="bg-gradient-to-r from-slate-50 to-blue-50/50 backdrop-blur-sm border-slate-200 shadow-lg">
                        <CardHeader className="text-center pb-6">
                          <div className="flex items-center justify-center gap-3 mb-2">
                            <PlayCircle className="h-6 w-6 text-primary" />
                            <CardTitle className="text-xl">Automated Workflow</CardTitle>
                          </div>
                          <p className="text-muted-foreground">End-to-end process automation</p>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto pb-4">
                            <div className="flex items-center justify-center gap-2 min-w-max px-4">
                              {study.workflow.map((step, wIndex) => (
                                <div key={wIndex} className="flex items-center gap-2">
                                  <div className="flex items-center gap-3 bg-white rounded-full px-6 py-3 border-2 border-primary/20 hover:border-primary/40 transition-colors shadow-sm min-w-max">
                                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                                      {wIndex + 1}
                                    </div>
                                    <span className="font-medium text-sm">{step}</span>
                                  </div>
                                  {wIndex < study.workflow.length - 1 && (
                                    <ChevronRight className="h-5 w-5 text-primary/60 flex-shrink-0" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Common Features */}
        <section className="py-20 bg-gradient-to-b from-slate-50/50 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Platform Capabilities</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The powerful features that enable these transformations across all industries
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {commonFeatures.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-shadow">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <CardHeader className="relative">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-md">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">{category.category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="relative">
                      <div className="space-y-4">
                        {category.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-secondary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Industry-Leading Results</h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Join the ecosystem of successful businesses already transformed by In-Sync
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="text-center group">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                  <MapPin className="h-10 w-10" />
                </div>
                <div className="text-5xl font-bold mb-2">60+</div>
                <div className="opacity-90 font-medium">Cities Served</div>
                <div className="text-sm opacity-75">Tata Electra EV Network</div>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                  <Users className="h-10 w-10" />
                </div>
                <div className="text-5xl font-bold mb-2">2,500+</div>
                <div className="opacity-90 font-medium">Clients Managed</div>
                <div className="text-sm opacity-75">CarTrends Distribution</div>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                  <Zap className="h-10 w-10" />
                </div>
                <div className="text-5xl font-bold mb-2">100%</div>
                <div className="opacity-90 font-medium">Real-time Sync</div>
                <div className="text-sm opacity-75">All Client Systems</div>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                  <Bot className="h-10 w-10" />
                </div>
                <div className="text-5xl font-bold mb-2">24/7</div>
                <div className="opacity-90 font-medium">AI Automation</div>
                <div className="text-sm opacity-75">Continuous Operations</div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Ready to transform your business?</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <OnboardingModal trigger={
                  <Button size="lg" variant="secondary" className="text-lg px-8 shadow-lg">
                    <Users className="h-5 w-5 mr-2" />
                    Get Started Now
                  </Button>
                } />
                <Button size="lg" variant="outline" className="text-lg px-8 border-white/30 text-white hover:bg-white/10 shadow-lg">
                  <Clock className="h-5 w-5 mr-2" />
                  Schedule Demo
                </Button>
              </div>
              
              <p className="text-sm mt-6 opacity-75">
                30-day free trial • No credit card required • Setup in 1-2 days
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default UseCases;