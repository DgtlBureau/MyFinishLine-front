import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRoutes = [
    "/payment",
    "/api/webhook",
    "/auth",
    "/login",
    "/signup",
  ];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const userAuthenticated = request.cookies.get("auth_token");
  const stravaAccessToken = request.cookies.get("strava_access_token");
  const stravaAthlete = request.cookies.get("strava_athlete");

  const isAuthenticated =
    !!userAuthenticated?.value || (!!stravaAccessToken && !!stravaAthlete);

  if (pathname.startsWith("/app") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/app/:path*", "/payment/:path*"],
};
