import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/work/olg", "/work/pfizer", "/work/intuit-ai", "/work/surplus-calculator"];

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const needsAuth = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );

  if (needsAuth) {
    const authed = req.cookies.get("site_auth")?.value === "1";
    if (!authed) {
      const url = req.nextUrl.clone();
      url.pathname = "/unlock";
      url.searchParams.set("next", pathname + (search || ""));
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Explicit paths so middleware always runs; /work/:path* can miss on prefetch in some setups
  matcher: ["/work/olg", "/work/olg/:path*", "/work/pfizer", "/work/pfizer/:path*", "/work/intuit-ai", "/work/intuit-ai/:path*", "/work/surplus-calculator", "/work/surplus-calculator/:path*"],
};