import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ApiError, handleApiError, HttpStatus } from "@/app/lib/api-error-handler";

export const GET = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      throw new ApiError("Authentication required", HttpStatus.UNAUTHORIZED);
    }

    const response = await instance.get("/user/rewards", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    return handleApiError(error, "GET /api/user/rewards");
  }
};
