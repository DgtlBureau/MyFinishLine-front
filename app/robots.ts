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
        disallow: ["/login", "/signup", "/api/", "/_next/", "/app/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
