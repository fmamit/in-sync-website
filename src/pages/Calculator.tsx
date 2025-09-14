import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CostCalculator from "@/components/CostCalculator";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, Users, Zap } from "lucide-react";

const CalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <Calculator className="w-4 h-4 mr-2" />
            Cost Calculator
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Calculate Your{" "}
            <span className="text-primary">In-Sync Costs</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get an accurate estimate of your monthly or annual costs based on your specific business needs. 
            No hidden fees, no surprises - just transparent pricing.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-background/50 border">
              <Users className="w-6 h-6 text-primary" />
              <div className="text-left">
                <div className="font-semibold">Unlimited Users</div>
                <div className="text-sm text-muted-foreground">No per-seat pricing</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-background/50 border">
              <TrendingUp className="w-6 h-6 text-primary" />
              <div className="text-left">
                <div className="font-semibold">Scalable Pricing</div>
                <div className="text-sm text-muted-foreground">Grows with you</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-background/50 border">
              <Zap className="w-6 h-6 text-primary" />
              <div className="text-left">
                <div className="font-semibold">Flexible Add-ons</div>
                <div className="text-sm text-muted-foreground">Only pay for what you need</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 px-4">
        <CostCalculator />
      </section>

      <Footer />
    </div>
  );
};

export default CalculatorPage;