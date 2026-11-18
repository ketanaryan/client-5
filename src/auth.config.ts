import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  trustHost: true,
  providers: [], // providers will be added in auth.ts
  callbacks: {
    async redirect({ url, baseUrl }) {
      const canonicalBase = process.env.AUTH_URL || process.env.NEXTAUTH_URL || "https://shantanusassociates.in"
      if (url.startsWith("/")) {
        return `${canonicalBase}${url}`
      }
      try {
        const parsedUrl = new URL(url)
        if (parsedUrl.origin === new URL(canonicalBase).origin) {
          return url
        }
      } catch {}
      return canonicalBase
    },
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
