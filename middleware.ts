import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Root middleware. If Supabase env vars are set, refresh the session
 * on every request. If not, no-op (demo mode still works).
 */
export async function middleware(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return updateSession(request);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico|icon|opengraph-image|twitter-image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff|woff2)).*)",
  ],
};
