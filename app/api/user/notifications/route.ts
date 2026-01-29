import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const { data } = await instance.get("/user/notifications", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Notifications API error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          message: error.response.data?.message || "Failed getting notifications",
          error: error.response.data?.error || "api_error",
        },
        { status: error.response.status }
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
};
