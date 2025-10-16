import { useState } from "react";
import SEOHelmet from "@/components/SEOHelmet";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { defaultSEOConfig } from "@/utils/seo";
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
  ChevronUp,
  Wrench
} from "lucide-react";
import Footer from "@/components/Footer";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [showCalculator, setShowCalculator] = useState(false);

  const plans = [
    {
      name: "Standard",
      price: { monthly: 500, annual: 5500 }, // ₹500/user/month, 11 months for annual (1 month free)
      description: "Pay per user, scale as you grow",
      badge: "15 Days Free Trial",
      badgeColor: "bg-primary",
      pricePerUser: true,
      minUsers: 10,
      features: [
        "₹500 per user per month",
        "Minimum 10 users (Monthly billing)",
        "Quarterly billing for less than 10 users",
        "Complete CRM & Contact Management",
        "Campaign Automation & Marketing",
        "WhatsApp, SMS & Email integration",
        "Support Ticket Management",
        "Workflow Journeys & Automation",
        "Mobile app with offline sync",
        "Field Force Tracking",
        "Inventory & Order Management",
        "Custom BI Dashboards & Reports",
        "Priority support",
        "Advanced analytics"
      ],
      cta: "Start 15 Days Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: { monthly: null, annual: null },
      description: "Custom solutions for large organizations",
      badge: "Custom Pricing",
      badgeColor: "bg-purple-500",
      pricePerUser: false,
      features: [
        "Everything in Standard Plan",
        "Custom development",
        "On-premise deployment options",
        "SLA guarantees",
        "24/7 dedicated support",
        "Custom training & onboarding",
        "Multi-tenant architecture",
        "Dedicated account manager",
        "Volume discounts available"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const communicationWallet = {
    initialAmount: 10000,
    rates: [
      { service: "WhatsApp", rate: 0.93, unit: "per message", icon: MessageSquare },
      { service: "Email", rate: 0.10, unit: "per message", icon: MessageSquare },
      { service: "SMS", rate: 0.12, unit: "per message", icon: MessageSquare },
      { service: "Calling", rate: 1.00, unit: "per minute", icon: Phone }
    ]
  };

  const oneTimeServices = [
    { name: "Setup Fee", price: 15000, description: "One-time platform setup and configuration" },
    { name: "Customization", price: 6000, description: "Per day of custom development", unit: "per day" },
    { name: "Custom API Integration", price: 25000, description: "Per API integration", unit: "per API" }
  ];

  return (
    <>
      <SEOHelmet config={defaultSEOConfig.pricing} />
      
      <div className="min-h-screen bg-background">
        <Breadcrumbs items={[{ name: 'Pricing', url: '/pricing' }]} />
        
        {/* Hero Section */}
        <section className="pt-16 pb-16 px-4 bg-primary/5" role="banner">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Simple Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Simple Pricing.{" "}
            <span className="text-primary">Pay Per User.</span>
            <br />
            <span className="text-2xl md:text-4xl text-muted-foreground">
              Start with 15 Days Free.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            ₹500 per user per month. All features included. Scale as you grow.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <Tabs value={billingCycle} onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")} className="w-auto">
              <TabsList className="grid w-fit grid-cols-2 bg-muted">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual" className="relative">
                  Annual
                  <Badge variant="secondary" className="ml-2 text-xs">1 Month Free</Badge>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {plans.map((plan) => (
              <Card key={plan.name} className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-xl md:scale-105' : ''} hover:shadow-lg transition-all duration-300`}>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className={plan.badgeColor}>
                    {plan.popular && <Star className="w-3 h-3 mr-1" />}
                    {plan.badge}
                  </Badge>
                </div>
                
                <CardHeader className="text-center pb-4 pt-6">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-sm mb-2">{plan.description}</CardDescription>
                  
                  <div className="mt-4">
                    {plan.price.monthly !== null ? (
                      <>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-bold text-foreground">
                            ₹{billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            /user/{billingCycle === 'monthly' ? 'month' : 'year'}
                          </span>
                        </div>
                        {billingCycle === 'annual' && (
                          <div className="text-sm text-primary font-semibold mt-2">
                            1 Month Free with Annual Billing
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground mt-2">
                          Minimum {plan.minUsers} users for monthly billing
                        </div>
                      </>
                    ) : (
                      <div className="text-2xl font-bold text-primary">
                        Custom Pricing
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

      {/* Communication Wallet */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Communication Wallet 💬
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Prepaid wallet system for all your communication needs. Start with ₹10,000 and top up anytime.
            </p>
            <Badge variant="secondary" className="text-lg px-6 py-3">
              ₹{communicationWallet.initialAmount.toLocaleString()} Initial Wallet Balance
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {communicationWallet.rates.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto p-4 rounded-full bg-primary/10 w-fit mb-4">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{item.service}</CardTitle>
                  <div className="mt-4">
                    <div className="text-3xl font-bold text-primary">₹{item.rate.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground mt-1">{item.unit}</div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">How the Communication Wallet Works</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Start with ₹10,000 prepaid balance included in your setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>All communication charges (WhatsApp, Email, SMS, Calling) deducted from wallet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Easy top-up anytime to keep your communications flowing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Real-time balance tracking and usage reports</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* One-time Services */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Setup & Professional Services 🛠️
            </h2>
            <p className="text-muted-foreground">
              One-time fees to get you up and running smoothly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <section className="py-16 px-4 bg-primary/5">
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
    </>
  );
};

export default Pricing;