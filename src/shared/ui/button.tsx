"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  cn(
    "inline-flex items-center gap-2 cursor-pointer whitespace-nowrap",
    "rounded-md font-medium transition-all duration-200",
    "disabled:opacity-30 disabled:cursor-not-allowed",
  ),
  {
    variants: {
      variant: {
        ghostMonochrome: "text-white/60 hover:text-white",
        ghostLight: "text-primary hover:text-white",
        ghostMedium: "text-[#C1B9EA] hover:text-white",
        ghostDark: "text-primary-200 hover:text-white",
        primary: "bg-primary-400",
        danger:
          "rounded-sm bg-danger-100 px-4 py-3 font-normal text-danger transition-none hover:bg-danger-500 hover:text-white",
      },
      size: {
        fit: "w-fit h-fit",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-12 w-12",
      },
      padding: {
        default: "",
        sm: "px-s py-xs",
        lg: "px-3 py-s",
      },
      alignment: {
        default: "justify-start",
        center: "justify-center",
        end: "justify-end",
      },
      textSize: {
        // Inter's normal line-height: with py-m this gives the 51px of the Figma CTA.
        base: "text-base leading-[normal]",
        sm: "text-[length:var(--text-sm)]",
        sx: "text-[length:var(--text-sx)]",
      },
    },
    defaultVariants: {
      variant: "ghostLight",
      size: "fit",
      padding: "default",
      alignment: "default",
      textSize: "sx",
    },
  },
);

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      className,
      variant,
      size,
      padding,
      alignment,
      textSize,
      asChild = false,
      children,
      isLoading,
      disabled,
      ...props
    },
    ref,
  ) => {
    const classes = cn(buttonVariants({ variant, size, padding, alignment, className, textSize }));
    const isDisabled = isLoading || disabled;

    return asChild ? (
      <Slot className={cn(classes)} ref={ref} {...props} {...(isDisabled ? { "aria-disabled": true } : {})}>
        {children}
      </Slot>
    ) : (
      <button className={classes} ref={ref} disabled={isDisabled} aria-busy={isLoading} {...props}>
        {isLoading && <Loader2 aria-hidden className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
