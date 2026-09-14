import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 border px-6 text-[11px] font-medium uppercase tracking-[0.2em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-primary bg-primary text-accent hover:bg-accent hover:text-accent-foreground",
        gold: "border-gold bg-gold-gradient text-primary shadow-card hover:brightness-105",
        outline: "border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "border-transparent bg-transparent text-foreground hover:text-gold",
        inverse: "border-primary-foreground/50 bg-transparent text-primary-foreground hover:border-gold hover:text-gold",
      },
      size: {
        default: "h-11",
        lg: "h-12 px-8",
        icon: "h-11 w-11 px-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return <Component className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };