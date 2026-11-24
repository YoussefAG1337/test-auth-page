"use client";

import {
  type ChangeEvent,
  type ClipboardEvent,
  forwardRef,
  type KeyboardEvent,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import { cn } from "@/shared/lib/utils";

export const OTP_LENGTH = 6;

export type OtpInputHandle = { focusFirst: () => void };

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  onComplete: (code: string) => void;
  groupLabel: string;
  digitLabel: string;
  disabled?: boolean;
  invalid?: boolean;
};

const onlyDigits = (text: string) => text.replace(/\D/g, "");

export const OtpInput = forwardRef<OtpInputHandle, OtpInputProps>(
  ({ value, onChange, onComplete, groupLabel, digitLabel, disabled, invalid }, ref) => {
    const inputs = useRef<(HTMLInputElement | null)[]>([]);
    // The focus guard reads this: the prop is still stale in this tick.
    const latestValue = useRef(value);
    useLayoutEffect(() => {
      latestValue.current = value;
    }, [value]);

    const focusBox = (index: number) => {
      inputs.current[Math.max(0, Math.min(index, OTP_LENGTH - 1))]?.focus();
    };

    useImperativeHandle(ref, () => ({ focusFirst: () => focusBox(0) }));

    const commit = (next: string, focusIndex: number) => {
      const code = next.slice(0, OTP_LENGTH);
      latestValue.current = code;
      onChange(code);
      focusBox(focusIndex);
      if (code.length === OTP_LENGTH) onComplete(code);
    };

    const fill = (digits: string, index: number) => {
      if (digits.length >= OTP_LENGTH) {
        commit(digits, OTP_LENGTH - 1);
        return;
      }
      if (digits.length > 1) {
        commit(digits, digits.length);
        return;
      }
      commit(value.slice(0, index) + digits + value.slice(index + 1), index + 1);
    };

    const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
      if (/^\d$/.test(event.key)) {
        event.preventDefault();
        fill(event.key, index);
      } else if (event.key === "Backspace") {
        event.preventDefault();
        if (value[index]) commit(value.slice(0, index) + value.slice(index + 1), index);
        else commit(value.slice(0, index - 1), index - 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        focusBox(index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        focusBox(Math.min(index + 1, value.length));
      }
    };

    // Mobile keyboards and one-time-code autofill land here rather than in onKeyDown.
    const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const digits = onlyDigits(event.target.value);
      if (!digits) return;
      fill(digits.length >= OTP_LENGTH ? digits : digits.slice(-1), index);
    };

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      const digits = onlyDigits(event.clipboardData.getData("text"));
      if (digits) fill(digits.length > 1 ? digits : value + digits, 0);
    };

    return (
      <div role="group" aria-label={groupLabel} className="flex items-center gap-sm">
        {Array.from({ length: OTP_LENGTH }, (_, index) => (
          <input
            key={index}
            ref={(element) => {
              inputs.current[index] = element;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            aria-label={`${digitLabel} ${index + 1}`}
            aria-invalid={invalid || undefined}
            placeholder="0"
            value={value[index] ?? ""}
            disabled={disabled}
            onFocus={(event) => {
              const filled = latestValue.current.length;
              if (index > filled) focusBox(filled);
              else event.target.select();
            }}
            onKeyDown={handleKeyDown(index)}
            onChange={handleChange(index)}
            onPaste={handlePaste}
            className={cn(
              // Not `text-l`: tailwind-merge reads it as a colour and drops it.
              "h-[80px] w-[52px] rounded-xs border border-white bg-transparent text-center text-[length:var(--text-l)] font-semibold text-white caret-transparent outline-none transition-colors",
              "placeholder:text-white/20 focus:border-primary-200 focus:bg-white/5 disabled:opacity-50",
              invalid && "border-danger focus:border-danger",
            )}
          />
        ))}
      </div>
    );
  },
);

OtpInput.displayName = "OtpInput";
