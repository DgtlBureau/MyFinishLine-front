import instance from "@/app/lib/utils/instance";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError, handleApiError, HttpStatus } from "@/app/lib/api-error-handler";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      throw new ApiError("Not authenticated", HttpStatus.UNAUTHORIZED);
    }

    const body = await request.formData();

    const { data } = await instance.post("/user?_method=put", body, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    return handleApiError(error, "POST /api/user/update-user");
  }
}
