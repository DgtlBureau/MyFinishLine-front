import instance from "@/app/lib/utils/instance";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_ORIGIN = (
  process.env.BACKEND_URL || "https://dev.myfinishline.io/back/api"
).replace(/\/api\/?$/, "");

function prefixStorageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  // Extract /storage/... path and serve via Next.js rewrite proxy
  const storageMatch = url.match(/\/storage\/.+$/);
  if (storageMatch) return storageMatch[0];
  return url;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const { data } = await instance.get("/challenges/active", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });

    if (data) {
      data.image_url = prefixStorageUrl(data.image_url);
      data.logo_url = prefixStorageUrl(data.logo_url);
      if (data.background_images) {
        data.background_images = data.background_images.map(
          (img: { image_url: string; [key: string]: unknown }) => ({
            ...img,
            image_url: prefixStorageUrl(img.image_url) || img.image_url,
          })
        );
      }
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("API error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message || "Error getting active challenge",
          error: error.response.data?.error || "api_error",
          ...error.response.data,
        },
        { status: error.response.status }
      );
    }

    if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
      return NextResponse.json(
        {
          message: "Cannot connect to backend service",
          error: "service_unavailable",
        },
        { status: 503 }
      );
    }

    if (error.code === "ECONNABORTED") {
      return NextResponse.json(
        {
          message: "Request timeout. Please try again.",
          error: "timeout_error",
        },
        { status: 408 }
      );
    }

    return NextResponse.json(
      {
        message: "Internal server error",
        error: "internal_error",
      },
      { status: 500 }
    );
  }
}
