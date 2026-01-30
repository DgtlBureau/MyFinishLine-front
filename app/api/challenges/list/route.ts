import instance from "@/app/lib/utils/instance";
import { NextResponse } from "next/server";

const BACKEND_ORIGIN = (
  process.env.BACKEND_URL || "https://dev.myfinishline.io/back/api"
).replace(/\/api\/?$/, "");

function prefixStorageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("/storage/")) return BACKEND_ORIGIN + url;
  return url;
}

export async function GET() {
  try {
    const { data } = await instance.get("/challenges/list");

    if (Array.isArray(data)) {
      for (const ch of data) {
        ch.image_url = prefixStorageUrl(ch.image_url);
        ch.logo_url = prefixStorageUrl(ch.logo_url);
      }
    }

    return NextResponse.json(data);
  } catch (error: any) {
    if (error.response) {
      return NextResponse.json(
        { message: error.response.data?.message || "Failed" },
        { status: error.response.status },
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
