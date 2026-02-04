import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/app/lib/api-error-handler";

function prefixStorageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  // Extract /storage/... path and serve via Next.js rewrite proxy
  const storageMatch = url.match(/\/storage\/.+$/);
  if (storageMatch) return storageMatch[0];
  return url;
}

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user_id");

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const { data } = await instance.get("/challenges", {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: userId ? { user_id: userId } : undefined,
    });

    // Transform storage URLs for each challenge
    if (data?.data && Array.isArray(data.data)) {
      data.data = data.data.map(
        (challenge: { [key: string]: unknown }) => ({
          ...challenge,
          image_url: prefixStorageUrl(challenge.image_url as string | null),
          logo_url: prefixStorageUrl(challenge.logo_url as string | null),
          reward_image_url: prefixStorageUrl(
            challenge.reward_image_url as string | null
          ),
        })
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    return handleApiError(error, "GET /api/user/challenges");
  }
};
