import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/app/lib/api-error-handler";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    let query = "";
    if (type === "completed") {
      query = "?type=completed";
    }
    if (type === "not_completed") {
      query = "?type=not_completed";
    }

    const { data } = await instance.get("/user/contracts" + query, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return NextResponse.json(data);
  } catch (error: unknown) {
    return handleApiError(error, "GET /api/user/contracts");
  }
};
