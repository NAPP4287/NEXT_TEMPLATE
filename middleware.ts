import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // const isValid =
  //   request.cookies.get("accessToken")?.value !== "" &&
  //   request.cookies.get("accessToken")?.value !== undefined;
  // const url = request.nextUrl.clone();
  // if (
  //   url.pathname.startsWith("/_next/static") ||
  //   url.pathname.startsWith("/favicon.ico")
  // ) {
  //   return NextResponse.next();
  // }
  // const pathname = request.nextUrl.pathname;
  // if (!isValid && pathname.includes("/signin")) {
  //   return;
  // }
  // if (!isValid && !pathname.includes("/signin")) {
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }
  // if (isValid && pathname === "/") {
  //   return;
  // }
  // if (isValid && pathname.includes("/signin")) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
