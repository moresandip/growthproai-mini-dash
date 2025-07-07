import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-card-elevated hover:shadow-elevation",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-card-elevated",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground backdrop-blur glassmorphism",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-card-elevated",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        business: "bg-business-gradient text-white hover:shadow-business transform hover:-translate-y-1 hover:scale-105 font-semibold shadow-elevation border-0 hover-glow",
        success: "bg-business-success text-white hover:bg-business-success/90 shadow-card-elevated transform hover:-translate-y-0.5",
        regenerate: "bg-gradient-to-r from-business-primary via-business-secondary to-business-accent text-white hover:shadow-glow transform hover:-translate-y-1 border-0 font-semibold relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:hover:translate-x-[100%] before:transition-transform before:duration-700",
        premium: "bg-gradient-to-br from-business-primary via-business-accent to-business-secondary text-white shadow-glow hover:shadow-business border border-business-primary/30 backdrop-blur-sm hover:-translate-y-1 transform transition-bounce font-bold",
        glass: "bg-card/20 border border-border/50 backdrop-blur-xl hover:bg-card/30 hover:border-border text-foreground shadow-elevation hover:shadow-glow",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
