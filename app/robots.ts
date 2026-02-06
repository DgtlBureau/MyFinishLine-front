import { MetadataRoute } from "next";

const SITE_URL =
  process.env.NODE_ENV === "production"
    ? "https://myfinishline.io"
    : "https://myfinishline.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/app/",              // Private user pages (homepage, profile, etc.)
          "/login",             // Auth pages
          "/signup",
          "/verify",
          "/forgot-password",
          "/auth/",             // OAuth callback routes
          "/confirm-challenge",
          "/payment/success",   // Payment success page
          "/api/",              // API routes
          "/_next/",            // Next.js internal files
          "/admin",             // Admin panel (if exists)
          "/docs",              // Documentation (if exists)
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
