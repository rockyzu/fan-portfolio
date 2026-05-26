import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get("password") || "");
  const next = String(form.get("next") || "/work");

  const expected = process.env.SITE_PASSWORD || "";
  if (!expected || password !== expected) {
    return NextResponse.redirect(new URL(`/unlock?next=${encodeURIComponent(next)}&error=1`, req.url));
  }

  const res = NextResponse.redirect(new URL(next, req.url));
  res.cookies.set("site_auth", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}