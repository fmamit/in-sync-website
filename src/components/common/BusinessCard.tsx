import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

// Feature Card for showcasing features with icons
interface FeatureCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  badges?: string[];
  className?: string;
}

export const FeatureCard = ({ title, description, icon: Icon, badges = [], className = "" }: FeatureCardProps) => (
  <Card className={`hover:shadow-lg transition-all duration-300 ${className}`}>
    <CardHeader>
      {Icon && (
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      )}
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-base mb-4">{description}</CardDescription>
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <Badge key={index} variant="secondary">{badge}</Badge>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

// Industry Card for industry-specific content
interface IndustryCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  metrics?: { label: string; value: string }[];
  features?: string[];
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary";
  };
  className?: string;
}

export const IndustryCard = ({ 
  title, 
  description, 
  icon: Icon, 
  metrics = [], 
  features = [],
  action,
  className = "" 
}: IndustryCardProps) => (
  <Card className={`h-full hover:shadow-lg transition-all duration-300 ${className}`}>
    <CardHeader>
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="mt-2">{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      {metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-primary">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      )}
      
      {features.length > 0 && (
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      )}
      
      {action && (
        <Button 
          onClick={action.onClick}
          variant={action.variant || "default"}
          className="w-full mt-4"
        >
          {action.label}
        </Button>
      )}
    </CardContent>
  </Card>
);

// Resource Card for blogs, whitepapers, etc.
interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  tags?: string[];
  metadata?: { label: string; value: string }[];
  actions?: ReactNode;
  thumbnail?: string;
  className?: string;
  footer?: ReactNode; // Add footer support
}

export const ResourceCard = ({ 
  title, 
  description, 
  category, 
  tags = [], 
  metadata = [],
  actions,
  thumbnail,
  className = "",
  footer
}: ResourceCardProps) => (
  <Card className={`group hover:shadow-lg transition-all duration-300 ${className}`}>
    {thumbnail && (
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
      </div>
    )}
    
    <CardHeader>
      <div className="flex items-center justify-between mb-2">
        <Badge>{category}</Badge>
        {actions}
      </div>
      <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
        {title}
      </CardTitle>
    </CardHeader>
    
    <CardContent>
      <CardDescription className="line-clamp-3 mb-4">{description}</CardDescription>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      
      {metadata.length > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          {metadata.map((item, index) => (
            <span key={index}>{item.label}: {item.value}</span>
          ))}
        </div>
      )}
      
      {footer}
    </CardContent>
  </Card>
);

// Generic content card
interface ContentCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
}

export const ContentCard = ({ title, description, children, className = "", header, footer }: ContentCardProps) => (
  <Card className={`${className}`}>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {header}
      </div>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
    {footer && <div className="px-6 pb-6">{footer}</div>}
  </Card>
);