import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/lib/auth";

export async function proxy(request: NextRequest) {
  // Get session from Better Auth
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isAuth = !!session?.user;
  const pathname = request.nextUrl.pathname;

  // Define public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/signup", "/api/auth"];

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login
  if (!isAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/auth (auth routes)
     * 2. /_next/ (Next.js internals)
     * 3. /static (public files)
     * 4. /*.* (files with extensions)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|static|.*\\.).*)",
  ],
};