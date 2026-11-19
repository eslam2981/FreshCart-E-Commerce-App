import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Protected routes
const PROTECTED_ROUTES = ["/cart", "/wishlist", "/profile", "/orders", "/allorders", "/checkout"];

// Guest-only auth routes
const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];

const NEXTAUTH_SECRET =
  process.env.NEXTAUTH_SECRET ||
  "c3f6f5ed1aa26d5c6d68eaebc844c2a5a73a611960f24b551b1e562573c33f35";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthPage = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // If the path is neither protected nor an auth page, pass immediately
  if (!isProtected && !isAuthPage) {
    return NextResponse.next();
  }

  // 1. Try resolving token with default settings
  let token = await getToken({
    req,
    secret: NEXTAUTH_SECRET,
  });

  // 2. Try with secureCookie: true (production / HTTPS / Vercel proxy)
  if (!token) {
    token = await getToken({
      req,
      secret: NEXTAUTH_SECRET,
      secureCookie: true,
    });
  }

  // 3. Try explicit cookie names (with/without __Secure prefix)
  if (!token) {
    token = await getToken({
      req,
      secret: NEXTAUTH_SECRET,
      cookieName: "__Secure-next-auth.session-token",
    });
  }

  if (!token) {
    token = await getToken({
      req,
      secret: NEXTAUTH_SECRET,
      cookieName: "next-auth.session-token",
    });
  }

  // 4. Session cookie presence fallback to prevent dropping authenticated users
  const hasSessionCookie =
    req.cookies.has("__Secure-next-auth.session-token") ||
    req.cookies.has("next-auth.session-token") ||
    req.cookies.has("__Secure-next-auth.session-token.0") ||
    req.cookies.has("next-auth.session-token.0");

  const isAuthenticated = Boolean(token || hasSessionCookie);

  // Redirect unauthenticated guest away from protected routes to login
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated user away from auth pages to home
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/wishlist/:path*",
    "/profile/:path*",
    "/orders/:path*",
    "/allorders/:path*",
    "/checkout/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
