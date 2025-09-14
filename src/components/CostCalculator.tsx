import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import QuoteGenerator from "./QuoteGenerator";
import { 
  Calculator, 
  Users, 
  MessageSquare, 
  Phone, 
  Zap,
  TrendingUp,
  Info,
  Download
} from "lucide-react";

interface CostCalculatorProps {
  className?: string;
}

const CostCalculator = ({ className = "" }: CostCalculatorProps) => {
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "growth" | "scale">("growth");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [messageVolume, setMessageVolume] = useState<number>(1000);
  const [callMinutes, setCallMinutes] = useState<number>(500);
  const [teamSize, setTeamSize] = useState<number>(10);

  const plans = {
    starter: {
      name: "Starter",
      price: { USD: { monthly: 0, annual: 0 }, INR: { monthly: 0, annual: 0 } },
      records: "1,000"
    },
    growth: {
      name: "Growth", 
      price: { USD: { monthly: 199, annual: 1590 }, INR: { monthly: 14999, annual: 119992 } },
      records: "100,000"
    },
    scale: {
      name: "Scale",
      price: { USD: { monthly: 999, annual: 7992 }, INR: { monthly: 74999, annual: 599992 } },
      records: "Unlimited"
    }
  };

  const addOnModules = [
    { id: "analytics", name: "Advanced Analytics", price: { USD: 99, INR: 7499 }, icon: TrendingUp },
    { id: "workflow", name: "Custom Workflow Builder", price: { USD: 99, INR: 7499 }, icon: Zap },
    { id: "api", name: "API Access & Webhooks", price: { USD: 99, INR: 7499 }, icon: Zap },
    { id: "branding", name: "White-label Branding", price: { USD: 99, INR: 7499 }, icon: Zap },
    { id: "security", name: "Advanced Security", price: { USD: 99, INR: 7499 }, icon: Zap },
    { id: "integrations", name: "Custom Integrations", price: { USD: 99, INR: 7499 }, icon: Zap }
  ];

  // Pricing calculations
  const basePlanCost = plans[selectedPlan].price[currency][billingCycle];
  const modulesCost = selectedModules.length * addOnModules[0].price[currency] * (billingCycle === "annual" ? 12 : 1);
  const messagingCost = messageVolume * (currency === "USD" ? 0.01 : 0.75) * (billingCycle === "annual" ? 12 : 1);
  
  // Call pricing (estimated rates)
  const callRate = currency === "USD" ? 0.05 : 2.5; // per minute
  const callingCost = callMinutes * callRate * (billingCycle === "annual" ? 12 : 1);

  const subtotal = basePlanCost + modulesCost + messagingCost + callingCost;
  const annualDiscount = billingCycle === "annual" && subtotal > 0 ? subtotal * 0.2 : 0;
  const totalCost = subtotal - annualDiscount;

  // Prepare quote data for generation
  const quoteData = {
    selectedPlan: plans[selectedPlan].name,
    planPrice: basePlanCost,
    currency,
    billingCycle,
    selectedModules: selectedModules.map(id => addOnModules.find(m => m.id === id)?.name || id),
    modulePrice: modulesCost,
    messageVolume,
    messagingCost,
    callMinutes,
    callingCost,
    subtotal,
    discount: annualDiscount,
    totalCost,
    teamSize
  };

  const formatCurrency = (amount: number) => {
    const symbol = currency === "USD" ? "$" : "₹";
    return `${symbol}${amount.toLocaleString()}`;
  };

  const handleModuleToggle = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calculator className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Cost Calculator</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Calculate your total In-Sync costs based on your specific needs. 
          Adjust the parameters below to see real-time pricing estimates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Currency & Billing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Billing Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Tabs value={currency} onValueChange={(value) => setCurrency(value as "USD" | "INR")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="USD">USD ($)</TabsTrigger>
                      <TabsTrigger value="INR">INR (₹)</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="space-y-2">
                  <Label>Billing Cycle</Label>
                  <Tabs value={billingCycle} onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="annual">
                        Annual
                        <Badge variant="secondary" className="ml-2 text-xs">-20%</Badge>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plan Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Select Your Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(plans).map(([key, plan]) => (
                  <div
                    key={key}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPlan === key ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedPlan(key as typeof selectedPlan)}
                  >
                    <div className="text-center">
                      <h3 className="font-semibold mb-2">{plan.name}</h3>
                      <div className="text-2xl font-bold text-primary mb-1">
                        {formatCurrency(plan.price[currency][billingCycle])}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {billingCycle === 'monthly' ? '/month' : '/year'}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {plan.records} records
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Size */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size</Label>
                <Input
                  id="teamSize"
                  type="number"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value) || 0)}
                  min="1"
                  placeholder="Number of users"
                />
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Info className="w-4 h-4" />
                  <span>All plans include unlimited users at no extra cost!</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add-on Modules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Add-on Modules
              </CardTitle>
              <CardDescription>
                Select additional modules to enhance your In-Sync experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addOnModules.map((module) => (
                  <div key={module.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={module.id}
                      checked={selectedModules.includes(module.id)}
                      onCheckedChange={() => handleModuleToggle(module.id)}
                    />
                    <div className="flex-1">
                      <Label htmlFor={module.id} className="font-medium cursor-pointer">
                        {module.name}
                      </Label>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(module.price[currency])}/month
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Usage Estimates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Usage Estimates
              </CardTitle>
              <CardDescription>
                Estimate your monthly usage for additional services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="messages">Messages per month</Label>
                  <Input
                    id="messages"
                    type="number"
                    value={messageVolume}
                    onChange={(e) => setMessageVolume(Number(e.target.value) || 0)}
                    min="0"
                    placeholder="1000"
                  />
                  <div className="text-xs text-muted-foreground">
                    SMS, WhatsApp, Email messages
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calls">Call minutes per month</Label>
                  <Input
                    id="calls"
                    type="number"
                    value={callMinutes}
                    onChange={(e) => setCallMinutes(Number(e.target.value) || 0)}
                    min="0"
                    placeholder="500"
                  />
                  <div className="text-xs text-muted-foreground">
                    Estimated calling minutes
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Cost Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Selected Plan */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{plans[selectedPlan].name} Plan</div>
                  <div className="text-sm text-muted-foreground">
                    {billingCycle === 'monthly' ? 'Monthly' : 'Annual'} billing
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(basePlanCost)}</div>
                </div>
              </div>

              {/* Modules */}
              {selectedModules.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="font-medium">Add-on Modules ({selectedModules.length})</div>
                    {selectedModules.map(moduleId => {
                      const module = addOnModules.find(m => m.id === moduleId);
                      return (
                        <div key={moduleId} className="flex justify-between text-sm">
                          <span>{module?.name}</span>
                          <span>{formatCurrency(module!.price[currency] * (billingCycle === "annual" ? 12 : 1))}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Messaging */}
              {messageVolume > 0 && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Messaging</div>
                      <div className="text-sm text-muted-foreground">
                        {messageVolume.toLocaleString()} messages × {billingCycle === "annual" ? "12 months" : "1 month"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(messagingCost)}</div>
                    </div>
                  </div>
                </>
              )}

              {/* Calling */}
              {callMinutes > 0 && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Voice Calling</div>
                      <div className="text-sm text-muted-foreground">
                        {callMinutes.toLocaleString()} minutes × {billingCycle === "annual" ? "12 months" : "1 month"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(callingCost)}</div>
                    </div>
                  </div>
                </>
              )}

              <Separator />

              {/* Annual Discount */}
              {billingCycle === "annual" && annualDiscount > 0 && (
                <div className="flex items-center justify-between text-green-600">
                  <div className="font-medium">Annual Discount (20%)</div>
                  <div className="font-semibold">-{formatCurrency(annualDiscount)}</div>
                </div>
              )}

              {/* Total */}
              <div className="flex items-center justify-between text-lg font-bold border-t pt-4">
                <div>Total Cost</div>
                <div className="text-primary">{formatCurrency(totalCost)}</div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                {billingCycle === 'monthly' ? 'Per month' : 'Per year'}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-4">
                <Button className="w-full" size="lg">
                  Get Started with {plans[selectedPlan].name}
                </Button>
              </div>

              {/* Quote Generator */}
              <div className="pt-4 border-t">
                <div className="text-sm font-medium text-foreground mb-3">Generate Professional Quote</div>
                <QuoteGenerator quoteData={quoteData} />
              </div>

              {/* Additional Info */}
              <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Info className="w-3 h-3" />
                  <span>All plans include unlimited users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="w-3 h-3" />
                  <span>30-day free trial available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="w-3 h-3" />
                  <span>No setup or cancellation fees</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;