import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/app/lib/api-error-handler";

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
    return NextResponse.json(data);
  } catch (error: unknown) {
    return handleApiError(error, "GET /api/user/challenges");
  }
};
