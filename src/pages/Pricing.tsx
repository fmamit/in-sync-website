import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import CostCalculator from "@/components/CostCalculator";
import { 
  Check, 
  Star, 
  Users, 
  Database, 
  Zap, 
  Phone, 
  MessageSquare,
  ArrowRight,
  Shield,
  Clock,
  Globe,
  Calculator,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import Footer from "@/components/Footer";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [showCalculator, setShowCalculator] = useState(false);

  const plans = [
    {
      name: "Starter",
      price: { monthly: 0, annual: 0 },
      originalPrice: null,
      description: "Perfect for small teams just getting started with CRM",
      badge: "Free Forever",
      badgeColor: "bg-green-500",
      records: "Up to 1,000 records",
      features: [
        "Basic CRM & Contact Management",
        "Task Reminders & Notifications", 
        "Lead Status Tracking",
        "Up to 1,000 active records",
        "Unlimited users",
        "Email support",
        "Basic reporting",
        "Mobile app access"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Growth", 
      price: { monthly: 12999, annual: 129470 }, // ₹12,999/month, 17% annual discount
      originalPrice: { monthly: null, annual: 155988 },
      description: "For growing businesses that need more power",
      badge: "Most Popular",
      badgeColor: "bg-primary",
      records: "10,000 to 1,00,000 records",
      features: [
        "Everything in Starter",
        "Campaign Automation & Marketing",
        "WhatsApp, SMS & Email integration",
        "Support Ticket Management", 
        "Workflow Journeys & Automation",
        "Mobile app with offline sync",
        "10,000 to 1,00,000 active records",
        "Priority support",
        "Advanced analytics",
        "Custom fields & forms"
      ],
      cta: "Start Growth Plan",
      popular: true
    },
    {
      name: "Scale",
      price: { monthly: 37999, annual: 378710 }, // ₹37,999/month, 17% annual discount
      originalPrice: { monthly: null, annual: 455988 },
      description: "For larger teams that need all the bells and whistles",
      badge: "Advanced",
      badgeColor: "bg-blue-500",
      records: "1,00,001 to 5,00,000 records",
      features: [
        "Everything in Growth",
        "Custom BI Dashboards & Reports",
        "Field Force Tracking & Management",
        "Inventory & Order Management",
        "Calling & IVR capabilities", 
        "Advanced workflow builder",
        "1,00,001 to 5,00,000 active records",
        "24/7 premium support",
        "Custom integrations",
        "Dedicated account manager"
      ],
      cta: "Start Scale Plan",
      popular: false
    },
    {
      name: "Enterprise",
      price: { monthly: 75000, annual: 747000 }, // ₹75,000/month, 17% annual discount
      originalPrice: { monthly: null, annual: 900000 },
      description: "When you need everything + the kitchen sink",
      badge: "Enterprise",
      badgeColor: "bg-purple-500",
      records: "Above 5,00,000 records",
      features: [
        "Everything in Scale",
        "Unlimited active records",
        "Custom development",
        "On-premise deployment options",
        "SLA guarantees",
        "24/7 dedicated support",
        "Custom training & onboarding",
        "Multi-tenant architecture"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const additionalServices = [
    {
      name: "Voice Calling",
      description: "High-quality voice calls with advanced features",
      pricing: "₹1,500",
      detail: "Per calling channel per month",
      icon: Phone,
      features: [
        "HD voice quality",
        "Call recording",
        "IVR system", 
        "Call analytics",
        "Geographic routing"
      ]
    },
    {
      name: "SMS Services",
      description: "SMS messaging with delivery tracking",
      pricing: "₹0.12",
      detail: "Per SMS message",
      icon: MessageSquare,
      features: [
        "Bulk SMS delivery", 
        "Delivery reports",
        "Template management",
        "Scheduled messaging",
        "Two-way messaging"
      ]
    },
    {
      name: "WhatsApp Business",
      description: "WhatsApp Business API integration",
      pricing: "₹0.85",
      detail: "Above Meta's published rate per message",
      icon: MessageSquare,
      features: [
        "WhatsApp Business API",
        "Rich media support",
        "Template messages",
        "Interactive buttons",
        "Delivery tracking"
      ]
    },
    {
      name: "Email Services",
      description: "Professional email marketing and automation",
      pricing: "₹0.05",
      detail: "Per email sent",
      icon: MessageSquare,
      features: [
        "Email campaigns",
        "Automated sequences",
        "A/B testing",
        "Analytics & reporting",
        "Template library"
      ]
    }
  ];

  const addOnModules = [
    { name: "Advanced Analytics", price: 1000, description: "Enhanced reporting and BI dashboards" },
    { name: "Custom Workflow Builder", price: 1000, description: "Advanced automation capabilities" },
    { name: "API Access & Webhooks", price: 1000, description: "Full API access and integrations" },
    { name: "Field Force Management", price: 1000, description: "Track and manage field teams" }
  ];

  const oneTimeServices = [
    { name: "Custom Report Development", price: 5000, description: "Tailored reports for your business needs" },
    { name: "API Integration Setup", price: 10000, description: "Professional integration with third-party systems" }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Simple Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Honest Pricing.{" "}
            <span className="text-primary">No Surprises.</span>
            <br />
            <span className="text-2xl md:text-4xl text-muted-foreground">
              Grows with you.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            No sneaky fees. No user limits. Just pick what you need and we'll grow together.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <Tabs value={billingCycle} onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")} className="w-auto">
              <TabsList className="grid w-fit grid-cols-2 bg-muted">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual" className="relative">
                  Annual
                  <Badge variant="secondary" className="ml-2 text-xs">Save 17%</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Cost Calculator Toggle */}
          <div className="mt-8">
            <Collapsible open={showCalculator} onOpenChange={setShowCalculator}>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-primary/5 hover:bg-primary/10 border-primary/20"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Your Exact Costs
                  {showCalculator ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-8">
                <div className="bg-muted/30 rounded-lg p-6">
                  <CostCalculator />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* Main Pricing Plans */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {plans.map((plan, index) => (
              <Card key={plan.name} className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-xl scale-105' : ''} hover:shadow-lg transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className={plan.badgeColor}>
                      <Star className="w-3 h-3 mr-1" />
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  {!plan.popular && (
                    <Badge variant="outline" className="w-fit mx-auto mb-4" style={{backgroundColor: plan.badgeColor.includes('green') ? '#10b981' : plan.badgeColor.includes('purple') ? '#8b5cf6' : 'transparent'}}>
                      {plan.badge}
                    </Badge>
                  )}
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-sm mb-2">{plan.description}</CardDescription>
                  <div className="text-xs text-muted-foreground font-medium">{plan.records}</div>
                  
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold text-foreground">
                        ₹{plan.price[billingCycle].toLocaleString()}
                      </span>
                      {plan.price[billingCycle] > 0 && (
                        <span className="text-muted-foreground text-sm">
                          /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      )}
                    </div>
                    {billingCycle === 'annual' && plan.originalPrice?.annual && (
                      <div className="text-xs text-muted-foreground mt-1">
                        <span className="line-through">
                          ₹{plan.originalPrice.annual.toLocaleString()}
                        </span>
                        <span className="ml-2 text-primary font-semibold">Save 17%</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/80'}`}
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Communication Add-ons 📞
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Want to chat with your customers? These are pretty handy for that.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">{service.pricing}</span>
                    <span className="text-muted-foreground text-sm">{service.detail}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <label className="text-sm font-medium">Quantity:</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="10000" 
                      defaultValue="0"
                      className="w-20 px-2 py-1 border border-input rounded-md text-sm" 
                      placeholder="0"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-on Modules & One-time Services */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Add-on Modules */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Extra Cool Modules 🚀
            </h2>
            <p className="text-muted-foreground mb-8">
              Want to supercharge your setup? Pick and choose what you need.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                ₹1,000 per module per month
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {addOnModules.map((module, index) => (
              <Card key={index} className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium">{module.name}</div>
                        <div className="text-sm text-muted-foreground">{module.description}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Badge variant="outline" className="w-full justify-center">
                      ₹{module.price.toLocaleString()}/month per unit
                    </Badge>
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">Quantity:</label>
                      <input 
                        type="number" 
                        min="0" 
                        max="100" 
                        defaultValue="0"
                        className="w-20 px-2 py-1 border border-input rounded-md text-sm" 
                        placeholder="0"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* One-time Services */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              One-time Help 🛠️
            </h2>
            <p className="text-muted-foreground">
              Need a pro to set things up? We've got your back.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {oneTimeServices.map((service, index) => (
              <Card key={index} className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-muted-foreground">{service.description}</div>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="w-full justify-center">
                    ₹{service.price.toLocaleString()} one-time
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Enterprise Security</h3>
              <p className="text-sm text-muted-foreground">Bank-grade security with SOC2 compliance</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Round-the-clock assistance when you need it</p>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">99.9% Uptime</h3>
              <p className="text-sm text-muted-foreground">Reliable service with guaranteed availability</p>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to transform your business?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of businesses already using In-Sync to streamline their operations.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Your Free Trial Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;