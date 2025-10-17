import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "database",
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/api/auth/signin",
  },

  callbacks: {
    // Adds the user ID to the session for easy access
    async session({ session, user }) {
      if (session.user) {
        (session.user as any).id = user.id;
      }
      return session;
    },

    // Optional: control sign-in behavior
    async signIn({ account, profile }) {
      // Allow all Google accounts by default
      if (account?.provider === "google") {
        return true;
      }
      return false;
    },
  },
});

export { handler as GET, handler as POST };
