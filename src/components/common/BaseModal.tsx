import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface BaseModalProps {
  trigger?: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  hideHeader?: boolean;
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg", 
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  "2xl": "max-w-6xl",
  full: "max-w-[95vw]"
};

export const BaseModal = ({ 
  trigger, 
  title, 
  description, 
  children, 
  open, 
  onOpenChange,
  className = "",
  size = "lg",
  hideHeader = false
}: BaseModalProps) => {
  const isControlled = open !== undefined && onOpenChange !== undefined;

  if (isControlled) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent className={`${sizeClasses[size]} max-h-[90vh] overflow-y-auto ${className}`}>
          {!hideHeader && (
            <DialogHeader className={hideHeader ? "sr-only" : ""}>
              <DialogTitle>{title}</DialogTitle>
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
          )}
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            Open
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className={`${sizeClasses[size]} max-h-[90vh] overflow-y-auto ${className}`}>
        {!hideHeader && (
          <DialogHeader className={hideHeader ? "sr-only" : ""}>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default BaseModal;