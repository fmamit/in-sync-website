// Fixed duplicate OnboardingModal import issue
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import insyncLogo from "@/assets/insync-logo-color.png";
import OnboardingModal from "./OnboardingModal";
import DemoRequestModal from "./DemoRequestModal";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Features", href: "/features" },
    { name: "Industries", href: "/industries" },
    { name: "Use Cases", href: "/use-cases" },
    { name: "Integrations", href: "/integrations" },
    { name: "Pricing", href: "/pricing" },
    { name: "Partnership", href: "/partnership" },
    { name: "Resources", href: "/resources" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <img src={insyncLogo} alt="In-Sync" className="relative h-12 w-auto transform group-hover:scale-105 transition-transform" />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <DemoRequestModal trigger={
              <Button variant="default" size="sm">
                Request Demo
              </Button>
            } />
            <OnboardingModal trigger={
              <Button variant="outline" size="sm">
                Onboarding Form
              </Button>
            } />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-4 px-4 py-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <DemoRequestModal trigger={
                  <Button variant="default" size="sm" className="w-full">
                    Request Demo
                  </Button>
                } />
                <OnboardingModal trigger={
                  <Button variant="outline" size="sm" className="w-full">
                    Onboarding Form
                  </Button>
                } />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;