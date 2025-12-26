import { pageMetadata } from "@/app/data/pagesMetadata";
import { Metadata } from "next";

type IOgType = "website" | "article" | "book" | "profile";

interface ISeoProps {
  title: string;
  description: string;
  keywords?: string[];
  alternatesTitle?: string;
  ogType?: IOgType;
  ogSiteName?: string;
  ogImage?: string;
  ogImageAlt?: string;
  canonicalPath?: string;
  rssPath?: string;
  ogUrlPath?: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
}

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://myfinishline.io"
    : "https://dev.myfinishline.io";

const SITE_NAME = "MyFinishLine";

export function buildSeo({
  title,
  description,
  ogType = "website",
  ogUrlPath,
  keywords,
  ogImage,
  canonicalPath,
  ogSiteName,
  robotsIndex,
  robotsFollow,
}: ISeoProps): Metadata {
  return {
    metadataBase: new URL(BASE_URL),
    title: title ? `${title} | ${SITE_NAME}` : SITE_NAME,
    description,
    keywords: keywords || pageMetadata.main.keywords,
    icons: {
      icon: "/favicon.svg",
    },
    applicationName: SITE_NAME,
    alternates: {
      canonical: canonicalPath ? `${BASE_URL}${canonicalPath}` : BASE_URL,
    },
    colorScheme: "light dark",
    robots: {
      index: robotsIndex,
      follow: robotsFollow,
    },
    openGraph: {
      type: ogType,
      siteName: ogSiteName || SITE_NAME,
      title: title || SITE_NAME,
      description,
      locale: "en_US",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
      url: `${BASE_URL}${ogUrlPath || ""}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}
