import instance from "@/app/lib/utils/instance";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError, handleApiError, HttpStatus } from "@/app/lib/api-error-handler";

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
      throw new ApiError("Not authenticated", HttpStatus.UNAUTHORIZED);
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
      data.reward_image_url = prefixStorageUrl(data.reward_image_url);
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
  } catch (error: unknown) {
    return handleApiError(error, "GET /api/user/active-challenge");
  }
}
