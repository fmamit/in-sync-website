import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Integrations from "./pages/Integrations";
import Industries from "./pages/Industries";
import Healthcare from "./pages/industries/Healthcare";
import FinancialServices from "./pages/industries/FinancialServices";
import Manufacturing from "./pages/industries/Manufacturing";
import RealEstate from "./pages/industries/RealEstate";
import TechnologySaaS from "./pages/industries/TechnologySaaS";
import ProfessionalServices from "./pages/industries/ProfessionalServices";
import Education from "./pages/industries/Education";
import RetailEcommerce from "./pages/industries/RetailEcommerce";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/healthcare-life-sciences" element={<Healthcare />} />
          <Route path="/industries/financial-services" element={<FinancialServices />} />
          <Route path="/industries/manufacturing" element={<Manufacturing />} />
          <Route path="/industries/real-estate" element={<RealEstate />} />
          <Route path="/industries/technology-saas" element={<TechnologySaaS />} />
          <Route path="/industries/professional-services" element={<ProfessionalServices />} />
          <Route path="/industries/education" element={<Education />} />
          <Route path="/industries/retail-ecommerce" element={<RetailEcommerce />} />
          <Route path="/pricing" element={<Pricing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
