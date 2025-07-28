import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  try {
    const response = NextResponse.next();
    const url = request.nextUrl;

    // Skip middleware for auth callback and static files
    if (url.pathname.startsWith('/auth/callback') || 
        url.pathname.startsWith('/_next/static') || 
        url.pathname.startsWith('/_next/image') || 
        url.pathname === '/favicon.ico') {
      return response;
    }

    // Create Supabase client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name) => request.cookies.get(name)?.value,
          set: (name, value, options) => {
            request.cookies.set({ name, value, ...options });
            response.cookies.set({ name, value, ...options });
          },
          remove: (name, options) => {
            request.cookies.delete(name);
            response.cookies.set({ name, value: '', ...options });
          },
        },
      }
    );

    // Get session without throwing errors
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Session fetch error:', error.message);
      // Don't block requests if session fetch fails
    }

    // Protected routes configuration
    const protectedRoutes = ["/dashboard", "/dash", "/profile", "/settings"];
    const isProtectedRoute = protectedRoutes.some(route => 
      url.pathname.startsWith(route)
    );

    // Auth routes configuration
    const authRoutes = ["/login", "/register"];
    const isAuthRoute = authRoutes.some(route => 
      url.pathname.startsWith(route)
    );

    // Handle redirects
    if (isProtectedRoute && !session) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirectedFrom', url.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    if (isAuthRoute && session) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return response;

  } catch (e) {
    console.error("Middleware error:", e);
    // Ensure we always return a response
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth callback (handled separately)
     */
    "/((?!_next/static|_next/image|favicon.ico|auth/callback).*)",
  ],
};