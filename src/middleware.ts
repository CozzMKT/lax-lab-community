import { type NextRequest, NextResponse } from "next/server";

// Auth middleware disabled until Supabase env vars are configured.
// To enable: add NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
// to Vercel environment variables, then uncomment the full middleware.
export async function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)",
  ],
};
