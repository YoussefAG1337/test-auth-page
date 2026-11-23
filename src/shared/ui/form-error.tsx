import { cn } from "@/shared/lib/utils";

// Form-level errors only — anything tied to a single field goes through that
// field's own `errorMessage` prop instead.
export function FormError({ message, className }: { message?: string; className?: string }) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className={cn("w-full rounded-s bg-danger/10 px-m py-sm text-sx text-danger", className)}
    >
      {message}
    </p>
  );
}
