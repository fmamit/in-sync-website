import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import QuoteGenerator from "./QuoteGenerator";
import { 
  Calculator, 
  Users, 
  MessageSquare, 
  Zap,
  Info,
  Wrench,
  Settings,
  Check
} from "lucide-react";

interface CostCalculatorProps {
  className?: string;
}

const CostCalculator = ({ className = "" }: CostCalculatorProps) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [oneTimeQuantities, setOneTimeQuantities] = useState<Record<string, number>>({});
  const [smsVolume, setSmsVolume] = useState<number>(1000);
  const [whatsappVolume, setWhatsappVolume] = useState<number>(500);
  const [emailVolume, setEmailVolume] = useState<number>(2000);
  const [callingMinutes, setCallingMinutes] = useState<number>(1000);
  const [teamSize, setTeamSize] = useState<number>(10);
  const [walletBalance] = useState<number>(10000);

  const perUserPrice = 500;
  const minUsers = 10;

  const oneTimeServices = [
    { id: "setup", name: "Setup Fee", price: 15000, icon: Wrench },
    { id: "customization", name: "Customization", price: 6000, icon: Settings, unit: "per day" },
    { id: "custom_api", name: "Custom API Integration", price: 25000, icon: Zap, unit: "per API" }
  ];

  // Pricing calculations
  const effectiveUsers = teamSize;
  const monthlyUserCost = effectiveUsers * perUserPrice;
  const annualUserCost = effectiveUsers * perUserPrice * 11; // 11 months (1 month free)
  const basePlanCost = billingCycle === "monthly" ? monthlyUserCost : annualUserCost;
  
  // Communication costs (from wallet)
  const monthlySmsCost = smsVolume * 0.12;
  const monthlyWhatsappCost = whatsappVolume * 0.93;
  const monthlyEmailCost = emailVolume * 0.10;
  const monthlyCallingCost = callingMinutes * 1.00;
  
  const totalMonthlyCommunication = monthlySmsCost + monthlyWhatsappCost + monthlyEmailCost + monthlyCallingCost;
  const totalAnnualCommunication = totalMonthlyCommunication * 12;
  
  const communicationCost = billingCycle === "monthly" ? totalMonthlyCommunication : totalAnnualCommunication;

  // One-time services costs
  const oneTimeCost = Object.entries(oneTimeQuantities).reduce((total, [serviceId, quantity]) => {
    const service = oneTimeServices.find(s => s.id === serviceId);
    return total + (service ? service.price * quantity : 0);
  }, 0);

  const subtotal = basePlanCost;
  const totalCost = subtotal + oneTimeCost;

  // Prepare quote data for generation
  const quoteData = {
    selectedPlan: "Standard",
    planPrice: basePlanCost,
    billingCycle,
    perUserPrice,
    teamSize: effectiveUsers,
    smsVolume,
    smsCost: monthlySmsCost,
    whatsappVolume,
    whatsappCost: monthlyWhatsappCost,
    emailVolume,
    emailCost: monthlyEmailCost,
    callingMinutes,
    callingCost: monthlyCallingCost,
    communicationCost: totalMonthlyCommunication,
    walletBalance,
    selectedOneTimeServices: Object.entries(oneTimeQuantities).filter(([_, qty]) => qty > 0).map(([id, qty]) => ({
      name: oneTimeServices.find(s => s.id === id)?.name || id,
      quantity: qty,
      unit: oneTimeServices.find(s => s.id === id)?.unit || "one-time"
    })),
    oneTimeCost,
    subtotal,
    totalCost
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const handleOneTimeQuantityChange = (serviceId: string, quantity: number) => {
    setOneTimeQuantities(prev => ({
      ...prev,
      [serviceId]: Math.max(0, quantity)
    }));
  };

  return (
    <div className={`w-full ${className}`}>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
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
              <div className="space-y-2">
                <Label>Billing Cycle</Label>
                <Tabs value={billingCycle} onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="annual">
                      Annual
                      <Badge variant="secondary" className="ml-2 text-xs">1 Month Free</Badge>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* Plan Summary */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Standard Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">
                  ₹{perUserPrice}
                </div>
                <div className="text-sm text-muted-foreground">per user per month</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>All features included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>15 days free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Minimum {minUsers} users for monthly billing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>1 month free with annual billing</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Size */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Size
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamSize">Number of Users</Label>
                <Input
                  id="teamSize"
                  type="number"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Math.max(1, Number(e.target.value) || 1))}
                  min="1"
                  placeholder="Number of users"
                />
                {teamSize < minUsers && (
                  <div className="flex items-center gap-2 text-sm text-amber-600">
                    <Info className="w-4 h-4" />
                    <span>Below {minUsers} users requires quarterly billing</span>
                  </div>
                )}
                {teamSize >= minUsers && (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Check className="w-4 h-4" />
                    <span>Monthly billing available</span>
                  </div>
                )}
                <div className="text-sm text-muted-foreground mt-2">
                  Effective cost: <span className="font-semibold text-foreground">₹{(teamSize * perUserPrice).toLocaleString()}/month</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* One-Time Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                One-Time Services
              </CardTitle>
              <CardDescription>
                Professional services and custom development work
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {oneTimeServices.map((service) => (
                  <div key={service.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="flex-1">
                      <Label htmlFor={service.id} className="font-medium">
                        {service.name}
                      </Label>
                      <div className="text-sm text-muted-foreground mb-2">
                        {formatCurrency(service.price)}{service.unit ? ` ${service.unit}` : ' one-time'}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`${service.id}-qty`} className="text-sm">Quantity:</Label>
                        <Input
                          id={`${service.id}-qty`}
                          type="number"
                          min="0"
                          max="100"
                          value={oneTimeQuantities[service.id] || 0}
                          onChange={(e) => handleOneTimeQuantityChange(service.id, parseInt(e.target.value) || 0)}
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

          {/* Communication Wallet Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Communication Wallet Usage
              </CardTitle>
              <CardDescription>
                Estimate your monthly communication usage (deducted from ₹{walletBalance.toLocaleString()} wallet)
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
                    ₹0.12 per SMS • Cost: ₹{monthlySmsCost.toFixed(2)}/month
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
                    ₹0.93 per message • Cost: ₹{monthlyWhatsappCost.toFixed(2)}/month
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
                    ₹0.10 per email • Cost: ₹{monthlyEmailCost.toFixed(2)}/month
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calling">Calling minutes per month</Label>
                  <Input
                    id="calling"
                    type="number"
                    value={callingMinutes}
                    onChange={(e) => setCallingMinutes(Number(e.target.value) || 0)}
                    min="0"
                    placeholder="1000"
                  />
                  <div className="text-xs text-muted-foreground">
                    ₹1.00 per minute • Cost: ₹{monthlyCallingCost.toFixed(2)}/month
                  </div>
                </div>
              </div>
              <Separator />
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Total Monthly Communication:</span>
                  <span className="text-lg font-bold text-primary">₹{totalMonthlyCommunication.toFixed(2)}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Wallet will last approximately {Math.floor(walletBalance / totalMonthlyCommunication)} months at this usage rate
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
                  <div className="font-medium">Standard Plan</div>
                  <div className="text-sm text-muted-foreground">
                    {effectiveUsers} users × ₹{perUserPrice}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {billingCycle === 'monthly' ? 'Monthly' : 'Annual (1 month free)'} billing
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(basePlanCost)}</div>
                  {billingCycle === 'annual' && (
                    <div className="text-xs text-primary">Save 1 month!</div>
                  )}
                </div>
              </div>

              {/* Communication Wallet Usage */}
              {(smsVolume > 0 || whatsappVolume > 0 || emailVolume > 0 || callingMinutes > 0) && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="font-medium">Communication Wallet Usage</div>
                    <div className="text-xs text-muted-foreground mb-2">(Deducted from ₹{walletBalance.toLocaleString()} prepaid wallet)</div>
                    {smsVolume > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>SMS ({smsVolume.toLocaleString()}/mo)</span>
                        <span>{formatCurrency(monthlySmsCost)}/mo</span>
                      </div>
                    )}
                    {whatsappVolume > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>WhatsApp ({whatsappVolume.toLocaleString()}/mo)</span>
                        <span>{formatCurrency(monthlyWhatsappCost)}/mo</span>
                      </div>
                    )}
                    {emailVolume > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Email ({emailVolume.toLocaleString()}/mo)</span>
                        <span>{formatCurrency(monthlyEmailCost)}/mo</span>
                      </div>
                    )}
                    {callingMinutes > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Calling ({callingMinutes.toLocaleString()} min/mo)</span>
                        <span>{formatCurrency(monthlyCallingCost)}/mo</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                      <span>Total Communication/mo</span>
                      <span className="text-primary">{formatCurrency(totalMonthlyCommunication)}</span>
                    </div>
                  </div>
                </>
              )}

              {/* One-Time Services */}
              {Object.keys(oneTimeQuantities).some(key => oneTimeQuantities[key] > 0) && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="font-medium">One-Time Services</div>
                    {Object.entries(oneTimeQuantities).filter(([_, qty]) => qty > 0).map(([serviceId, qty]) => {
                      const service = oneTimeServices.find(s => s.id === serviceId);
                      const cost = service ? service.price * qty : 0;
                      return (
                        <div key={serviceId} className="flex justify-between text-sm">
                          <span>{service?.name} (×{qty}{service?.unit ? ` ${service.unit}` : ''})</span>
                          <span>{formatCurrency(cost)}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              <Separator />

              {/* Subscription Total */}
              <div className="flex items-center justify-between">
                <div className="font-medium">Subscription Total</div>
                <div className="font-semibold">{formatCurrency(subtotal)}</div>
              </div>

              {billingCycle === 'annual' && (
                <div className="text-sm text-primary flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  <span>Includes 1 month free</span>
                </div>
              )}

              {/* One-Time Total */}
              {oneTimeCost > 0 && (
                <>
                  <div className="flex items-center justify-between text-amber-700">
                    <div className="font-medium">One-Time Setup</div>
                    <div className="font-semibold">+{formatCurrency(oneTimeCost)}</div>
                  </div>
                </>
              )}

              {/* Total */}
              <div className="flex items-center justify-between text-lg font-bold border-t pt-4">
                <div>Total Initial Cost</div>
                <div className="text-primary">{formatCurrency(totalCost)}</div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                {billingCycle === 'monthly' ? 'Per month' : 'Per year'} subscription {oneTimeCost > 0 && '+ one-time fees'}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-4">
                <Button className="w-full" size="lg">
                  Start 15 Days Free Trial
                </Button>
              </div>

              {/* Quote Generator */}
              <div className="pt-4 border-t">
                <div className="text-sm font-medium text-foreground mb-3">Download Quote</div>
                <QuoteGenerator quoteData={quoteData} />
              </div>

              {/* Additional Info */}
              <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Info className="w-3 h-3" />
                  <span>15 days free trial • No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="w-3 h-3" />
                  <span>₹{walletBalance.toLocaleString()} prepaid communication wallet included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="w-3 h-3" />
                  <span>Cancel anytime • No long-term commitments</span>
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
