import { notFound } from "next/navigation";

// Only ever throws notFound(), so there is nothing to validate for instant navigation.
export const instant = false;

// Sends unknown paths under a locale to the localized not-found page below the auth
// chrome, instead of Next's unstyled global 404 (there is no single root layout).
export default function UnknownPage() {
  notFound();
}
