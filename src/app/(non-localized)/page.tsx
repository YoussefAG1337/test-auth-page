import { redirect } from "next/navigation";

// The app has no landing page of its own: everything starts at the auth card.
export default function HomePage() {
  redirect("/login");
}
