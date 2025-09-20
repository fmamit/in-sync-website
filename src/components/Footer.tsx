import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Linkedin, 
  Twitter, 
  Youtube,
  ArrowRight
} from "lucide-react";
import insyncLogo from "@/assets/insync-logo-color.png";
import OnboardingModal from "./OnboardingModal";
import DemoRequestModal from "./DemoRequestModal";

const Footer = () => {
  const footerLinks = {
    platform: [
      { name: "Features", href: "/features" },
      { name: "Integrations", href: "/integrations" },
      { name: "Pricing", href: "/pricing" },
      { name: "Use Cases", href: "/use-cases" },
      { name: "FAQ", href: "/faq" }
    ],
    solutions: [
      { name: "Financial Services", href: "/industries/financial-services" },
      { name: "Healthcare", href: "/industries/healthcare" },
      { name: "Manufacturing", href: "/industries/manufacturing" },
      { name: "Real Estate", href: "/industries/real-estate" },
      { name: "Retail & E-commerce", href: "/industries/retail-ecommerce" },
      { name: "Technology & SaaS", href: "/industries/technology-saas" },
      { name: "Professional Services", href: "/industries/professional-services" },
      { name: "Education", href: "/industries/education" }
    ],
    resources: [
      { name: "Blogs", href: "/resources" },
      { name: "Whitepapers", href: "/resources?tab=whitepapers" },
      { name: "Events", href: "/resources?tab=events" },
      { name: "Tutorials", href: "/resources?tab=tutorials" },
      { name: "FAQs", href: "/resources?tab=faqs" }
    ],
    company: [
      { name: "Partnership", href: "/partnership" },
      { name: "Features", href: "/features" },
      { name: "Resources", href: "/resources" }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-orange-50/10 via-card to-accent/5 border-t border-border">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <img src={insyncLogo} alt="In-Sync" className="h-8 w-auto" />
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Digitally transforming modern organizations with AI-powered CRM solutions.
            </p>

            {/* Get Started CTA */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-4">
                Ready to transform your business?
              </p>
              <div className="flex flex-col gap-3">
                <DemoRequestModal trigger={
                  <Button size="sm" className="w-full justify-start">
                    Request Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                } />
                <OnboardingModal trigger={
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                } />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <Button size="sm" variant="ghost" className="p-2 hover:bg-primary/10">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="p-2 hover:bg-primary/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="p-2 hover:bg-primary/10">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 lg:col-span-4">
            {/* Platform */}
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2">
                {footerLinks.solutions.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <span>© 2024 In-Sync Tech-Fin Solutions Ltd. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <span>CIN: U67120WB1991PLC050740 | GST: 19AACCA2800R1ZI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;