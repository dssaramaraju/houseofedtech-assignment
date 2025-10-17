// src/app/page.tsx
import { redirect } from "next/navigation";

/**
 * Home page route ("/")
 * Redirects users directly to the Applications Dashboard page
 */
export default function HomePage() {
  // Automatically redirect to /applications
  redirect("/applications");

  // Return null to prevent rendering fallback content
  return null;
}
