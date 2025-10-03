import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-base focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: 
          "bg-primary text-primary-foreground rounded-md hover:bg-primary-hover hover:shadow-md",
        destructive: 
          "bg-destructive text-destructive-foreground rounded-md hover:bg-[hsl(1_85%_64%)] hover:shadow-md active:bg-[hsl(1_75%_56%)]",
        outline: 
          "border-2 border-primary bg-transparent text-primary rounded-md hover:bg-primary hover:text-primary-foreground",
        secondary: 
          "bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80",
        ghost: 
          "bg-transparent text-foreground rounded-md hover:bg-primary/10 active:bg-primary/20",
        link: 
          "text-primary underline-offset-4 hover:underline hover:text-primary-hover",
        hero: 
          "bg-white/10 text-white border border-white/20 rounded-md hover:bg-white/20 backdrop-blur-sm",
      },
      size: {
        default: "h-10 px-6 py-3 text-base [&_svg]:size-5",
        sm: "h-8 px-4 py-2 text-sm [&_svg]:size-4",
        lg: "h-12 px-8 py-3.5 text-base [&_svg]:size-5",
        icon: "h-10 w-10 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };