"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode, useId, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Button } from "./button";
import { Input } from "./input";

export type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "placeholder" | "size"
> & {
  label: ReactNode;
  errorMessage?: string;
  /** Accessible names of the show/hide button, to be translated by the caller. */
  visibilityLabels: { show: string; hide: string };
};

const EyeIcon = () => (
  <svg aria-hidden width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M8.33333 10C8.33333 10.442 8.50893 10.866 8.82149 11.1785C9.13405 11.4911 9.55797 11.6667 10 11.6667C10.442 11.6667 10.866 11.4911 11.1785 11.1785C11.4911 10.866 11.6667 10.442 11.6667 10C11.6667 9.55797 11.4911 9.13405 11.1785 8.82149C10.866 8.50893 10.442 8.33333 10 8.33333C9.55797 8.33333 9.13405 8.50893 8.82149 8.82149C8.50893 9.13405 8.33333 9.55797 8.33333 10ZM17.5 10C15.5 13.3333 13 15 10 15C7 15 4.5 13.3333 2.5 10C4.5 6.66667 7 5 10 5C13 5 15.5 6.66667 17.5 10Z"
      stroke="white"
      strokeOpacity="0.5"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    { label, errorMessage, visibilityLabels, id, className, disabled, readOnly, "aria-describedby": describedBy, ...props },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div className={cn("flex w-full flex-col gap-s", className)}>
        <div
          className={cn(
            "group/password relative rounded-s bg-white/5 font-display",
            errorMessage && "bg-danger/5",
          )}
        >
          <fieldset
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute -top-2 inset-x-0 bottom-0 min-w-0 rounded-s border border-white/40 px-4 transition-colors duration-200 group-hover/password:border-white/60 group-focus-within/password:border-white/60 motion-reduce:transition-none",
              errorMessage
                && "border-danger group-hover/password:border-danger group-focus-within/password:border-danger",
            )}
          >
            <legend className="invisible h-4 max-w-0 overflow-hidden whitespace-nowrap text-xs leading-4 transition-[max-width] duration-200 group-has-[input:not(:placeholder-shown)]/password:max-w-full motion-reduce:transition-none">
              <span className="px-1">{label}</span>
            </legend>
          </fieldset>
          <Input
            {...props}
            ref={ref}
            type={isVisible ? "text" : "password"}
            readOnly={readOnly}
            disabled={disabled}
            aria-invalid={errorMessage ? true : props["aria-invalid"]}
            id={inputId}
            aria-describedby={
              [describedBy, errorMessage ? errorId : undefined].filter(Boolean).join(" ") || undefined
            }
            placeholder=" "
            // Fixed height rather than vertical padding: the visibility toggle's box is
            // taller than the text, and would otherwise make this field outgrow the others.
            className="h-[49px] w-full gap-4 px-l"
            inputClassName="h-[17px] w-full text-sx leading-[17px] text-white"
            rightElement={
              <Button
                type="button"
                variant="ghostMonochrome"
                className="invisible size-6 items-center justify-center rounded-sm p-0 group-has-[input:not(:placeholder-shown)]/password:visible focus-visible:outline focus-visible:outline-white/60"
                aria-label={isVisible ? visibilityLabels.hide : visibilityLabels.show}
                aria-pressed={isVisible}
                aria-controls={inputId}
                disabled={disabled || readOnly}
                onClick={() => setIsVisible((visible) => !visible)}
              >
                <EyeIcon />
              </Button>
            }
          />
          <label
            htmlFor={inputId}
            className={cn(
              // Floats from the 14px field text down to the 12px legend text: 12/14.
              "absolute top-1/2 left-l origin-left -translate-y-1/2 cursor-text text-sx leading-[17px] text-white/40 transition-[top,scale,color] duration-200 ease-out group-hover/password:text-white/60 group-has-[input:not(:placeholder-shown)]/password:top-0 group-has-[input:not(:placeholder-shown)]/password:scale-[0.857143] group-has-[input:not(:placeholder-shown)]/password:text-white/60 motion-reduce:transition-none",
              errorMessage
                && "text-danger group-hover/password:text-danger group-has-[input:not(:placeholder-shown)]/password:text-danger",
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

PasswordInput.displayName = "PasswordInput";
