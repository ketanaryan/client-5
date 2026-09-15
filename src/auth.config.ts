import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  trustHost: true,
  providers: [], // providers will be added in auth.ts
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = (user as any).role;
      }
      return token;
    }
  }
} satisfies NextAuthConfig;
