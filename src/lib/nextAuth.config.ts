import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const NEXTAUTH_SECRET =
  process.env.NEXTAUTH_SECRET ||
  "c3f6f5ed1aa26d5c6d68eaebc844c2a5a73a611960f24b551b1e562573c33f35";

export const nextAuthConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const BASE_URL = process.env.BASE_URL || "https://ecommerce.routemisr.com";

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch(`${BASE_URL}/api/v1/auth/signin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          if (response.ok && data.token) {
            const decoded: { id: string } = jwtDecode(data.token);
            return {
              id: decoded.id,
              name: data.user?.name,
              email: data.user?.email,
              role: data.user?.role,
              token: data.token,
            };
          }

          return null;
        } catch (error) {
          console.error("NextAuth Login Error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.token = token.token;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Prevent broken https://https redirects
      if (!baseUrl || baseUrl.includes("https://https") || baseUrl === "https://") {
        baseUrl = process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.includes("https://https")
          ? process.env.NEXTAUTH_URL
          : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
      }

      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (url.startsWith("http")) {
        try {
          const parsed = new URL(url);
          if (parsed.origin === baseUrl || parsed.host.includes("vercel.app") || parsed.host.includes("localhost")) {
            return url;
          }
        } catch {
          // ignore error
        }
      }
      return baseUrl;
    },
  },

  
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: NEXTAUTH_SECRET,
};
