// src/app/applications/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import ApplicationsClient from "./view";

export default async function ApplicationsPage() {
  const session = await getServerSession(authOptions);

  // Redirect to login if not signed in
  if (!session) redirect("/api/auth/signin?callbackUrl=/applications");

  return <ApplicationsClient session={session} />;
}
