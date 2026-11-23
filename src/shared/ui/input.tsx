import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  icon?: ReactNode;
  rightElement?: ReactNode;
  inputClassName?: string;
  containerClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, rightElement, className, inputClassName, containerClassName, ...props }, ref) => (
    <div className={cn("flex w-full min-w-0", containerClassName)}>
      <div className={cn("flex min-w-0 flex-1 items-center", className)}>
        {icon && (
          <div className="relative flex size-6 shrink-0 items-center justify-center text-current">{icon}</div>
        )}
        <input
          ref={ref}
          className={cn("min-w-0 flex-1 bg-transparent focus:outline-none", inputClassName)}
          {...props}
        />
        {rightElement && (
          <div className="relative flex size-6 shrink-0 items-center justify-center text-current">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  ),
);

Input.displayName = "Input";
