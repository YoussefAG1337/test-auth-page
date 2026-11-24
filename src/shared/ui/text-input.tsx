"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from "react";
import { cn } from "@/shared/lib/utils";
import { Input } from "./input";

export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder" | "size"> & {
  label: ReactNode;
  errorMessage?: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      errorMessage,
      id,
      className,
      disabled,
      readOnly,
      "aria-describedby": describedBy,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className={cn("flex w-full flex-col gap-s", className)}>
        <div
          className={cn(
            "group/field relative rounded-s bg-white/5 font-display",
            errorMessage && "bg-danger/5",
          )}
        >
          <fieldset
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute -top-2 inset-x-0 bottom-0 min-w-0 rounded-s border border-white/40 px-4 transition-colors duration-200 group-hover/field:border-white/60 group-focus-within/field:border-white/60 motion-reduce:transition-none",
              errorMessage
                && "border-danger group-hover/field:border-danger group-focus-within/field:border-danger",
            )}
          >
            <legend className="invisible h-4 max-w-0 overflow-hidden whitespace-nowrap text-xs leading-4 transition-[max-width] duration-200 group-has-[input:not(:placeholder-shown)]/field:max-w-full motion-reduce:transition-none">
              <span className="px-1">{label}</span>
            </legend>
          </fieldset>
          <Input
            {...props}
            ref={ref}
            readOnly={readOnly}
            disabled={disabled}
            aria-invalid={errorMessage ? true : props["aria-invalid"]}
            id={inputId}
            aria-describedby={
              [describedBy, errorMessage ? errorId : undefined].filter(Boolean).join(" ") || undefined
            }
            placeholder=" "
            className="h-[49px] w-full gap-4 px-l"
            inputClassName="h-[17px] w-full text-sx leading-[17px] text-white"
          />
          <label
            htmlFor={inputId}
            className={cn(
              "absolute top-1/2 left-l origin-left -translate-y-1/2 cursor-text text-sx leading-[17px] text-white/40 transition-[top,scale,color] duration-200 ease-out group-hover/field:text-white/60 group-has-[input:not(:placeholder-shown)]/field:top-0 group-has-[input:not(:placeholder-shown)]/field:scale-[0.857143] group-has-[input:not(:placeholder-shown)]/field:text-white/60 motion-reduce:transition-none",
              errorMessage
                && "text-danger group-hover/field:text-danger group-has-[input:not(:placeholder-shown)]/field:text-danger",
            )}
          >
            {label}
          </label>
        </div>
        {errorMessage && (
          <p id={errorId} role="alert" className="text-sx text-danger">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";
