import "./globals.css";
import NextAuthProvider from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fullstack Developer Assignment",
  description: "App with NextAuth, Prisma, and Supabase integration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the whole app with the NextAuth session provider */}
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
