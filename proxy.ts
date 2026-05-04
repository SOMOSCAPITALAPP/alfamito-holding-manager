import { NextResponse, type NextRequest } from "next/server";
import { sessionCookieName } from "@/lib/session";

const protectedPrefixes = [
  "/dashboard",
  "/documents",
  "/legal",
  "/tax",
  "/accounting",
  "/finance",
  "/settings",
  "/api/document",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = request.cookies.get(sessionCookieName)?.value;
  if (session) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/documents/:path*",
    "/legal/:path*",
    "/tax/:path*",
    "/accounting/:path*",
    "/finance/:path*",
    "/settings/:path*",
    "/api/document/:path*",
  ],
};
