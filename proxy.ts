import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./auth";

const guestRoutes = ["/sign-in", "/sign-up"];

function isGuestRoute(pathname: string) {
  return guestRoutes.includes(pathname);
}

function isProtectedRoute(pathname: string) {
  return pathname === "/";
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && isGuestRoute(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!session && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in", "/sign-up"],
};
