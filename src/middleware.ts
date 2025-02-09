import { NextResponse, NextRequest } from 'next/server'
import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher([
//     '/dashboard(.*)',
//     '/forum(.*)',
//   ]);


export default clerkMiddleware();

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/home', request.url))
// }

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", // Don't run middleware on static files
   "/", // Run middleware on index page
    "/(api|trpc)(.*)"], // Run middleware on API routes
};