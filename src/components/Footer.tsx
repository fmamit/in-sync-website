import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { 
  Linkedin, 
  Twitter, 
  Youtube,
  ArrowRight,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import insyncLogo from "@/assets/insync-logo-white.png";
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
      { name: "Healthcare", href: "/industries/healthcare-life-sciences" },
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
    <footer className="relative overflow-hidden footer-gradient">
      {/* Top Accent Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
      
      {/* Subtle Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 dot-pattern opacity-5" />
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <img src={insyncLogo} alt="In-Sync" className="h-12 w-auto" />
            </div>
            <p className="text-white/80 mb-8 leading-relaxed max-w-sm font-body text-base">
              Making work life better with smart CRM that actually works. No fancy jargon, just results.
            </p>

            {/* Contact Information */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-accent" />
                </div>
                <span>+91 92288 24668</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-accent" />
                </div>
                <span>delight@in-sync.co.in</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/70 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-accent" />
                </div>
                <span>Gurgaon, Haryana, India - 122002</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <Button size="sm" variant="ghost" className="w-10 h-10 p-0 rounded-xl bg-white/10 hover:bg-accent/20 text-white hover:text-accent transition-all duration-300 hover:scale-110">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="w-10 h-10 p-0 rounded-xl bg-white/10 hover:bg-accent/20 text-white hover:text-accent transition-all duration-300 hover:scale-110">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="w-10 h-10 p-0 rounded-xl bg-white/10 hover:bg-accent/20 text-white hover:text-accent transition-all duration-300 hover:scale-110">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 lg:col-span-4">
            {/* Platform */}
            <div>
              <h4 className="font-heading font-semibold mb-5 text-white relative inline-block">
                Platform
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-accent rounded-full" />
              </h4>
              <ul className="space-y-3">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/75 hover:text-accent hover:pl-1 transition-all duration-300 inline-flex items-center gap-1 group font-body"
                    >
                      {link.name}
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="font-heading font-semibold mb-5 text-white relative inline-block">
                Solutions
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-accent rounded-full" />
              </h4>
              <ul className="space-y-3">
                {footerLinks.solutions.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/75 hover:text-accent hover:pl-1 transition-all duration-300 inline-flex items-center gap-1 group font-body"
                    >
                      {link.name}
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-heading font-semibold mb-5 text-white relative inline-block">
                Resources
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-accent rounded-full" />
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/75 hover:text-accent hover:pl-1 transition-all duration-300 inline-flex items-center gap-1 group font-body"
                    >
                      {link.name}
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-heading font-semibold mb-5 text-white relative inline-block">
                Company
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-accent rounded-full" />
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/75 hover:text-accent hover:pl-1 transition-all duration-300 inline-flex items-center gap-1 group font-body"
                    >
                      {link.name}
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Strong Foundation */}
      <div className="relative">
        {/* Accent Line */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        
        {/* Bottom Bar Content */}
        <div className="footer-bottom-bar">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-white/70 font-body">
                <span className="font-medium">© 2024 In-Sync Tech-Fin Solutions Ltd. All rights reserved.</span>
                <div className="flex gap-6">
                  <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
                  <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
                  <Link to="/cookies" className="hover:text-accent transition-colors">Cookie Policy</Link>
                </div>
              </div>
              <div className="text-sm text-white/60 font-body">
                <span>CIN: U67120WB1991PLC050740 | GST: 19AACCA2800R1ZI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
