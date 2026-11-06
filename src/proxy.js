
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request) {
  // Check user session
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // User is logged in
  if (session) {
    return NextResponse.next();
  }

  // User is not logged in
  const signInUrl = new URL("/signin", request.url);

  // Save the requested URL
  const callbackURL =
    request.nextUrl.pathname + request.nextUrl.search;

  signInUrl.searchParams.set("callbackURL", callbackURL);

  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/product/:path*"],
};
