import { MetadataRoute } from "next";
import { IProduct } from "@/app/types";

const SITE_URL =
  process.env.NODE_ENV === "production"
    ? "https://myfinishline.io"
    : "https://myfinishline.io";

async function getPublicChallenges(): Promise<IProduct[]> {
  try {
    const res = await fetch(`${SITE_URL}/back/api/stripe/products`, {
      cache: "no-store",
    });

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const challenges = await getPublicChallenges();

  const challengePages = challenges
    .filter((item) => item.paddle_product_id)
    .map((item) => ({
      url: `${SITE_URL}/challenges/${item.paddle_product_id}`,
      lastModified: new Date(),
    }));

  const staticPages = [
    "",
    "/faq",
    "/privacy",
    "/refund-policy",
    "/terms-of-service",
  ];

  return [
    ...staticPages.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
    })),
    ...challengePages,
  ];
}
