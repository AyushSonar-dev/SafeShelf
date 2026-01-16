import { NextResponse,NextRequest } from "next/server";
import {getSessionCookie} from "better-auth/cookies";
export async function middleware(request:NextRequest){
    const sessionCookie=getSessionCookie(request);

    if(sessionCookie){
        return NextResponse.redirect(new URL("/dashboard",request.url));
    }
    return NextResponse.next();
}
export const config = {
  matcher: [
    // Auth routes
    "/",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password/:path*",
    // Authenticated routes
    "/dashboard/:path*",
    "/settings/:path*",
    "/warrenties/:path*",
    // Exclude API routes, static files, and Next.js internals
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};