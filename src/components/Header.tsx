import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, LogIn, ArrowLeft } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import insyncLogo from "@/assets/insync-logo-color.png";
import DemoRequestModal from "./DemoRequestModal";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  const navigation = [
    { name: "Features", href: "/features" },
    { name: "Industries", href: "/industries" },
    { name: "Use Cases", href: "/use-cases" },
    { name: "Integrations", href: "/integrations" },
    { name: "Pricing", href: "/pricing" },
    { name: "Partnership", href: "/partnership" },
    { name: "Resources", href: "/resources" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <img src={insyncLogo} alt="In-Sync" className="relative h-12 w-auto transform group-hover:scale-105 transition-transform" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <DemoRequestModal trigger={
              <Button variant="default" size="sm" className="font-semibold">
                Request Demo
              </Button>
            } />
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{user.email}</span>
                  {isAdmin && <span className="text-primary font-medium">(Admin)</span>}
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={signOut}
                      className="p-2"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sign Out</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild className="bg-destructive hover:bg-destructive/90 text-destructive-foreground p-2">
                    <Link to="/auth">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sign In</p>
                </TooltipContent>
              </Tooltip>
            )}
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
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <DemoRequestModal trigger={
                  <Button variant="default" size="sm" className="w-full">
                    Request Demo
                  </Button>
                } />
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                      <User className="h-4 w-4" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{user.email}</p>
                        {isAdmin && <p className="text-xs text-primary">Admin</p>}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center p-2"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="bg-destructive hover:bg-destructive/90 text-destructive-foreground w-full p-2 flex justify-center">
                    <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}