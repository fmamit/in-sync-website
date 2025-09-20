import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import OnboardingModal from "./OnboardingModal";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock,
  Target,
  AlertCircle,
  CheckCircle2,
  BarChart3
} from "lucide-react";

interface ROICalculatorProps {
  className?: string;
}

const ROICalculator = ({ className = "" }: ROICalculatorProps) => {
  const [currentEmployees, setCurrentEmployees] = useState<number>(50);
  const [avgSalary, setAvgSalary] = useState<number>(50000);
  const [currentTools, setCurrentTools] = useState<number>(3);
  const [toolCostPerMonth, setToolCostPerMonth] = useState<number>(500);
  const [timeWastedHours, setTimeWastedHours] = useState<number>(10);
  const [missedDeals, setMissedDeals] = useState<number>(5);
  const [avgDealValue, setAvgDealValue] = useState<number>(10000);
  const [currency, setCurrency] = useState<"USD" | "INR">("INR");

  // Calculate color based on ROI percentage (red -> yellow -> green)
  const getROIColor = (percentage: number) => {
    if (percentage >= 300) return "hsl(var(--chart-2))"; // Green
    if (percentage >= 250) return "hsl(142, 76%, 45%)"; // Light green
    if (percentage >= 200) return "hsl(60, 100%, 45%)"; // Yellow-green
    if (percentage >= 150) return "hsl(45, 100%, 50%)"; // Yellow
    if (percentage >= 100) return "hsl(30, 100%, 55%)"; // Orange
    if (percentage >= 50) return "hsl(15, 100%, 60%)"; // Orange-red
    return "hsl(var(--chart-1))"; // Red
  };

  // ROI Calculations
  const hourlyWage = avgSalary / (52 * 40); // Assuming 40 hours/week, 52 weeks/year
  const weeklyProductivityLoss = currentEmployees * timeWastedHours * hourlyWage;
  const annualProductivityLoss = weeklyProductivityLoss * 52;
  
  const annualToolCosts = toolCostPerMonth * 12;
  const annualMissedRevenue = missedDeals * avgDealValue * 12;
  
  const totalCurrentCosts = annualProductivityLoss + annualToolCosts + annualMissedRevenue;
  
  // In-Sync costs (estimated)
  const insyncAnnualCost = currency === "USD" ? 1590 : 119992; // Growth plan annual
  
  // Benefits with In-Sync
  const productivityGain = 0.35; // 35% productivity increase
  const dealConversionIncrease = 0.30; // 30% more deals closed
  const toolConsolidation = 0.80; // 80% of tools can be replaced
  
  const productivitySavings = annualProductivityLoss * productivityGain;
  const additionalRevenue = annualMissedRevenue * dealConversionIncrease;
  const toolSavings = annualToolCosts * toolConsolidation;
  
  const totalBenefits = productivitySavings + additionalRevenue + toolSavings;
  const netROI = totalBenefits - insyncAnnualCost;
  const roiPercentage = (netROI / insyncAnnualCost) * 100;
  const paybackMonths = insyncAnnualCost / (totalBenefits / 12);

  const formatCurrency = (amount: number) => {
    const symbol = currency === "USD" ? "$" : "₹";
    return `${symbol}${Math.round(amount).toLocaleString()}`;
  };

  const businessImpacts = [
    {
      title: "Time Savings",
      current: `${timeWastedHours} hours/week per employee`,
      improved: `${Math.round(timeWastedHours * (1 - productivityGain))} hours/week per employee`,
      icon: Clock,
      color: "text-blue-600",
      improvement: `${Math.round(productivityGain * 100)}% reduction`
    },
    {
      title: "Deal Conversion",
      current: `${12 - missedDeals} deals closed/month`,
      improved: `${Math.round((12 - missedDeals) * (1 + dealConversionIncrease))} deals closed/month`,
      icon: Target,
      color: "text-green-600",
      improvement: `${Math.round(dealConversionIncrease * 100)}% increase`
    },
    {
      title: "Tool Costs",
      current: formatCurrency(toolCostPerMonth),
      improved: formatCurrency(toolCostPerMonth * (1 - toolConsolidation)),
      icon: DollarSign,
      color: "text-purple-600",
      improvement: `${Math.round(toolConsolidation * 100)}% reduction`
    },
    {
      title: "Team Efficiency",
      current: "Multiple disconnected tools",
      improved: "Single unified platform",
      icon: Users,
      color: "text-teal-600",
      improvement: "Complete integration"
    }
  ];

  return (
    <div className={`w-full max-w-7xl mx-auto ${className}`}>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <TrendingUp className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">ROI Calculator</h2>
        </div>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Discover your potential return on investment with In-Sync. Calculate real savings from productivity gains, 
          tool consolidation, and increased deal conversion rates.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Input Panel */}
        <div className="xl:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Company Information
              </CardTitle>
              <CardDescription>Tell us about your current business situation</CardDescription>
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
                  <Label htmlFor="employees">Number of Employees</Label>
                  <Input
                    id="employees"
                    type="number"
                    value={currentEmployees}
                    onChange={(e) => setCurrentEmployees(Number(e.target.value) || 0)}
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Average Annual Salary</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={avgSalary}
                    onChange={(e) => setAvgSalary(Number(e.target.value) || 0)}
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealValue">Average Deal Value</Label>
                  <Input
                    id="dealValue"
                    type="number"
                    value={avgDealValue}
                    onChange={(e) => setAvgDealValue(Number(e.target.value) || 0)}
                    min="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Current Challenges
              </CardTitle>
              <CardDescription>Quantify your current inefficiencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeWasted">Time Wasted Per Employee (hours/week)</Label>
                  <Input
                    id="timeWasted"
                    type="number"
                    value={timeWastedHours}
                    onChange={(e) => setTimeWastedHours(Number(e.target.value) || 0)}
                    min="0"
                    max="40"
                  />
                  <p className="text-xs text-muted-foreground">Manual tasks, duplicate data entry, tool switching</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="missedDeals">Missed Deals Per Month</Label>
                  <Input
                    id="missedDeals"
                    type="number"
                    value={missedDeals}
                    onChange={(e) => setMissedDeals(Number(e.target.value) || 0)}
                    min="0"
                  />
                  <p className="text-xs text-muted-foreground">Due to poor follow-up, missed communications</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentTools">Number of Current Tools</Label>
                  <Input
                    id="currentTools"
                    type="number"
                    value={currentTools}
                    onChange={(e) => setCurrentTools(Number(e.target.value) || 0)}
                    min="0"
                  />
                  <p className="text-xs text-muted-foreground">CRM, email, calling, messaging tools</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toolCost">Monthly Tool Costs</Label>
                  <Input
                    id="toolCost"
                    type="number"
                    value={toolCostPerMonth}
                    onChange={(e) => setToolCostPerMonth(Number(e.target.value) || 0)}
                    min="0"
                  />
                  <p className="text-xs text-muted-foreground">Combined cost of all business tools</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Impact Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Business Impact Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessImpacts.map((impact, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center gap-2">
                      <impact.icon className={`w-5 h-5 ${impact.color}`} />
                      <h4 className="font-semibold">{impact.title}</h4>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {impact.improvement}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Current:</span>
                        <span>{impact.current}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">With In-Sync:</span>
                        <span className="font-medium text-primary">{impact.improved}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="xl:col-span-2">
          <div className="sticky top-4 space-y-6">
            <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                ROI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* ROI Percentage */}
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2">
                  {Math.round(roiPercentage)}%
                </div>
                <div className="text-sm text-muted-foreground">Expected ROI</div>
                <div className="mt-2">
                  <Progress 
                    value={Math.min(roiPercentage, 500) / 5} 
                    className="h-2"
                    indicatorColor={getROIColor(roiPercentage)}
                  />
                </div>
              </div>

              {/* Key Metrics */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-sm text-muted-foreground">Annual Investment</span>
                  <span className="font-semibold text-red-600">
                    {formatCurrency(insyncAnnualCost)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-sm text-muted-foreground">Annual Benefits</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(totalBenefits)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-sm text-muted-foreground">Net Annual Gain</span>
                  <span className="font-bold text-lg text-primary">
                    {formatCurrency(netROI)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm text-muted-foreground">Payback Period</span>
                  <span className="font-semibold">
                    {Math.round(paybackMonths)} months
                  </span>
                </div>
              </div>

              {/* Benefits Breakdown */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Annual Benefits Breakdown</h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Productivity Savings</span>
                    <span className="text-green-600">{formatCurrency(productivitySavings)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Additional Revenue</span>
                    <span className="text-green-600">{formatCurrency(additionalRevenue)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tool Consolidation</span>
                    <span className="text-green-600">{formatCurrency(toolSavings)}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-3 pt-4 border-t">
                <Button variant="outline" className="w-full">
                  Schedule ROI Discussion
                </Button>
                <div className="text-xs text-center text-muted-foreground">
                  See these results in 30 days or your money back
                </div>
              </div>

            </CardContent>
            </Card>

            {/* Current Cost Analysis */}
            <Card className="border-destructive/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-destructive mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Current Annual Waste
                </h4>
                <div className="text-center">
                  <div className="text-3xl font-bold text-destructive mb-2">
                    {formatCurrency(totalCurrentCosts)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Lost productivity + Tool costs + Missed revenue
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;