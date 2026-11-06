
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session) {
    return NextResponse.next();
  }

  const signInUrl = new URL("/signin", request.url);

  const callbackURL =
    request.nextUrl.pathname + request.nextUrl.search;

  signInUrl.searchParams.set("callbackURL", callbackURL);

  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/product/:path*", "/profile"],
};
