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
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [showCalculator, setShowCalculator] = useState(false);

  const plans = [
    {
      name: "Starter",
      price: { 
        USD: { monthly: 0, annual: 0 },
        INR: { monthly: 0, annual: 0 }
      },
      originalPrice: null,
      description: "Perfect for small teams getting started",
      badge: "Free Forever",
      badgeColor: "bg-green-500",
      features: [
        "Basic CRM & Contact Management",
        "Task Reminders & Notifications", 
        "Lead Status Tracking",
        "Up to 1,000 records",
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
      price: { 
        USD: { monthly: 199, annual: 1590 },
        INR: { monthly: 14999, annual: 119992 } // ₹14,999/month, ₹1,19,992/year (20% discount)
      },
      originalPrice: { 
        USD: { monthly: null, annual: 2388 },
        INR: { monthly: null, annual: 179988 }
      },
      description: "For growing businesses that need automation",
      badge: "Most Popular",
      badgeColor: "bg-primary",
      features: [
        "Everything in Starter",
        "Campaign Automation & Marketing",
        "WhatsApp, SMS & Email integration",
        "Support Ticket Management", 
        "Workflow Journeys & Automation",
        "Mobile app with offline sync",
        "Up to 100,000 records",
        "Priority support",
        "Advanced analytics",
        "Custom fields & forms"
      ],
      cta: "Start Growth Plan",
      popular: true
    },
    {
      name: "Scale",
      price: { 
        USD: { monthly: 999, annual: 7992 },
        INR: { monthly: 74999, annual: 599992 } // ₹74,999/month, ₹5,99,992/year (20% discount)
      },
      originalPrice: { 
        USD: { monthly: null, annual: 11988 },
        INR: { monthly: null, annual: 899988 }
      },
      description: "Enterprise-grade solution for scaling businesses",
      badge: "Enterprise",
      badgeColor: "bg-purple-500",
      features: [
        "Everything in Growth",
        "Custom BI Dashboards & Reports",
        "Field Force Tracking & Management",
        "Inventory & Order Management",
        "Calling & IVR capabilities", 
        "Advanced workflow builder",
        "Unlimited records",
        "24/7 premium support",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantees"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const additionalServices = [
    {
      name: "Voice Calling",
      description: "High-quality voice calls with advanced features",
      pricing: currency === "USD" ? "Pulse-based pricing" : "Usage-based pricing",
      detail: "Rates vary by geography and usage",
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
      name: "Messaging Services",
      description: "SMS, WhatsApp, and multi-channel messaging",
      pricing: currency === "USD" ? "$0.01" : "₹0.75",
      detail: "Per message sent",
      icon: MessageSquare,
      features: [
        "SMS delivery", 
        "WhatsApp Business API",
        "Bulk messaging",
        "Delivery tracking",
        "Template management"
      ]
    }
  ];

  const addOnModules = [
    { name: "Advanced Analytics", price: { USD: 99, INR: 7499 } },
    { name: "Custom Workflow Builder", price: { USD: 99, INR: 7499 } },
    { name: "API Access & Webhooks", price: { USD: 99, INR: 7499 } },
    { name: "White-label Branding", price: { USD: 99, INR: 7499 } },
    { name: "Advanced Security & Compliance", price: { USD: 99, INR: 7499 } },
    { name: "Custom Integrations", price: { USD: 99, INR: 7499 } }
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
            Simple Pricing.{" "}
            <span className="text-primary">Unlimited Users.</span>
            <br />
            <span className="text-2xl md:text-4xl text-muted-foreground">
              Scalable for Growth.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            No hidden fees. Add only what you need. Start free and scale as you grow.
          </p>
          
          {/* Currency and Billing Toggles */}
          <div className="flex items-center justify-center gap-6 mb-8">
            {/* Currency Toggle */}
            <Tabs value={currency} onValueChange={(value) => setCurrency(value as "USD" | "INR")} className="w-auto">
              <TabsList className="grid w-fit grid-cols-2 bg-muted">
                <TabsTrigger value="USD">USD ($)</TabsTrigger>
                <TabsTrigger value="INR">INR (₹)</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Billing Toggle */}
            <Tabs value={billingCycle} onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")} className="w-auto">
              <TabsList className="grid w-fit grid-cols-2 bg-muted">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual" className="relative">
                  Annual
                  <Badge variant="secondary" className="ml-2 text-xs">Save 20%</Badge>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-foreground">
                        {currency === "USD" ? "$" : "₹"}{plan.price[currency][billingCycle].toLocaleString()}
                      </span>
                      {plan.price[currency][billingCycle] > 0 && (
                        <span className="text-muted-foreground">
                          /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      )}
                    </div>
                    {billingCycle === 'annual' && plan.originalPrice?.[currency]?.annual && (
                      <div className="text-sm text-muted-foreground mt-1">
                        <span className="line-through">
                          {currency === "USD" ? "$" : "₹"}{plan.originalPrice[currency].annual.toLocaleString()}
                        </span>
                        <span className="ml-2 text-primary font-semibold">Save 20%</span>
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
              Additional Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enhance your In-Sync experience with powerful communication services 
              that scale with your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-on Modules */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Additional Modules
            </h2>
            <p className="text-muted-foreground mb-8">
              Extend your In-Sync platform with specialized modules designed 
              for specific business needs.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {currency === "USD" ? "$99" : "₹7,499"} per module per month
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addOnModules.map((module, index) => (
              <Card key={index} className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="font-medium">{module.name}</span>
                    </div>
                    <Badge variant="outline">
                      {currency === "USD" ? "$" : "₹"}{module.price[currency]}/mo
                    </Badge>
                  </div>
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