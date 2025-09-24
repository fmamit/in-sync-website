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
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "growth" | "scale" | "enterprise">("growth");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [moduleQuantities, setModuleQuantities] = useState<Record<string, number>>({});
  const [smsVolume, setSmsVolume] = useState<number>(1000);
  const [whatsappVolume, setWhatsappVolume] = useState<number>(500);
  const [emailVolume, setEmailVolume] = useState<number>(2000);
  const [callingChannels, setCallingChannels] = useState<number>(1);
  const [teamSize, setTeamSize] = useState<number>(10);

  const plans = {
    starter: {
      name: "Starter",
      price: { monthly: 0, annual: 0 },
      records: "Up to 1,000"
    },
    growth: {
      name: "Growth", 
      price: { monthly: 12999, annual: 124790 },
      records: "10K - 1L"
    },
    scale: {
      name: "Scale",
      price: { monthly: 37999, annual: 364790 },
      records: "1L - 5L"
    },
    enterprise: {
      name: "Enterprise",
      price: { monthly: 75000, annual: 720000 },
      records: "5L+"
    }
  };

  const addOnModules = [
    { id: "analytics", name: "Advanced Analytics", price: 1000, icon: TrendingUp },
    { id: "workflow", name: "Custom Workflow Builder", price: 1000, icon: Zap },
    { id: "api", name: "API Access & Webhooks", price: 1000, icon: Zap },
    { id: "fieldforce", name: "Field Force Management", price: 1000, icon: Users }
  ];

  // Pricing calculations
  const basePlanCost = plans[selectedPlan].price[billingCycle];
  const modulesCost = Object.entries(moduleQuantities).reduce((total, [moduleId, quantity]) => {
    const module = addOnModules.find(m => m.id === moduleId);
    return total + (module ? module.price * quantity * (billingCycle === "annual" ? 12 : 1) : 0);
  }, 0);
  
  // Communication costs
  const smsCost = smsVolume * 0.12 * (billingCycle === "annual" ? 12 : 1);
  const whatsappCost = whatsappVolume * 0.05 * (billingCycle === "annual" ? 12 : 1);
  const emailCost = emailVolume * 0.05 * (billingCycle === "annual" ? 12 : 1);
  const callingCost = callingChannels * 1500 * (billingCycle === "annual" ? 12 : 1);

  const subtotal = basePlanCost + modulesCost + smsCost + whatsappCost + emailCost + callingCost;
  const annualDiscount = billingCycle === "annual" && subtotal > 0 ? subtotal * 0.04 : 0; // 4% annual discount
  const totalCost = subtotal - annualDiscount;

  // Prepare quote data for generation
  const quoteData = {
    selectedPlan: plans[selectedPlan].name,
    planPrice: basePlanCost,
    billingCycle,
    selectedModules: Object.entries(moduleQuantities).filter(([_, qty]) => qty > 0).map(([id, qty]) => ({
      name: addOnModules.find(m => m.id === id)?.name || id,
      quantity: qty
    })),
    modulePrice: modulesCost,
    smsVolume,
    smsCost,
    whatsappVolume,
    whatsappCost,
    emailVolume,
    emailCost,
    callingChannels,
    callingCost,
    subtotal,
    discount: annualDiscount,
    totalCost,
    teamSize
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const handleModuleQuantityChange = (moduleId: string, quantity: number) => {
    setModuleQuantities(prev => ({
      ...prev,
      [moduleId]: Math.max(0, quantity)
    }));
  };

  return (
    <div className={`w-full px-16 ${className}`}>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Currency & Billing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Billing Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Billing Cycle</Label>
                <Tabs value={billingCycle} onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="annual">
                      Annual
                      <Badge variant="secondary" className="ml-2 text-xs">-4%</Badge>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      <div className="text-xl font-bold text-primary mb-1">
                        {formatCurrency(plan.price[billingCycle])}
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
                    <div className="flex-1">
                      <Label htmlFor={module.id} className="font-medium">
                        {module.name}
                      </Label>
                      <div className="text-sm text-muted-foreground mb-2">
                        {formatCurrency(module.price)}/month per unit
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`${module.id}-qty`} className="text-sm">Quantity:</Label>
                        <Input
                          id={`${module.id}-qty`}
                          type="number"
                          min="0"
                          max="100"
                          value={moduleQuantities[module.id] || 0}
                          onChange={(e) => handleModuleQuantityChange(module.id, parseInt(e.target.value) || 0)}
                          className="w-20"
                          placeholder="0"
                        />
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
                Communication Usage
              </CardTitle>
              <CardDescription>
                Estimate your monthly communication usage for cost calculation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sms">SMS messages per month</Label>
                  <Input
                    id="sms"
                    type="number"
                    value={smsVolume}
                    onChange={(e) => setSmsVolume(Number(e.target.value) || 0)}
                    min="0"
                    placeholder="1000"
                  />
                  <div className="text-xs text-muted-foreground">
                    ₹0.12 per SMS message
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp messages per month</Label>
                  <Input
                    id="whatsapp"
                    type="number"
                    value={whatsappVolume}
                    onChange={(e) => setWhatsappVolume(Number(e.target.value) || 0)}
                    min="0"
                    placeholder="500"
                  />
                  <div className="text-xs text-muted-foreground">
                    ₹0.05 above Meta's rate per message
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email messages per month</Label>
                  <Input
                    id="email"
                    type="number"
                    value={emailVolume}
                    onChange={(e) => setEmailVolume(Number(e.target.value) || 0)}
                    min="0"
                    placeholder="2000"
                  />
                  <div className="text-xs text-muted-foreground">
                    ₹0.05 per email sent
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calling">Calling channels</Label>
                  <Input
                    id="calling"
                    type="number"
                    value={callingChannels}
                    onChange={(e) => setCallingChannels(Number(e.target.value) || 0)}
                    min="0"
                    placeholder="1"
                  />
                  <div className="text-xs text-muted-foreground">
                    ₹1,500 per channel per month
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost Summary */}
        <div className="">
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
              {Object.keys(moduleQuantities).some(key => moduleQuantities[key] > 0) && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="font-medium">Add-on Modules</div>
                    {Object.entries(moduleQuantities).filter(([_, qty]) => qty > 0).map(([moduleId, qty]) => {
                      const module = addOnModules.find(m => m.id === moduleId);
                      const cost = module ? module.price * qty * (billingCycle === "annual" ? 12 : 1) : 0;
                      return (
                        <div key={moduleId} className="flex justify-between text-sm">
                          <span>{module?.name} (x{qty})</span>
                          <span>{formatCurrency(cost)}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Communication Services */}
              {(smsVolume > 0 || whatsappVolume > 0 || emailVolume > 0 || callingChannels > 0) && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="font-medium">Communication Services</div>
                    {smsVolume > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>SMS ({smsVolume.toLocaleString()}/mo)</span>
                        <span>{formatCurrency(smsCost)}</span>
                      </div>
                    )}
                    {whatsappVolume > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>WhatsApp ({whatsappVolume.toLocaleString()}/mo)</span>
                        <span>{formatCurrency(whatsappCost)}</span>
                      </div>
                    )}
                    {emailVolume > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Email ({emailVolume.toLocaleString()}/mo)</span>
                        <span>{formatCurrency(emailCost)}</span>
                      </div>
                    )}
                    {callingChannels > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Calling ({callingChannels} channels)</span>
                        <span>{formatCurrency(callingCost)}</span>
                      </div>
                    )}
                  </div>
                </>
              )}

              <Separator />

              {/* Annual Discount */}
              {billingCycle === "annual" && annualDiscount > 0 && (
                <div className="flex items-center justify-between text-green-600">
                  <div className="font-medium">Annual Discount (4%)</div>
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