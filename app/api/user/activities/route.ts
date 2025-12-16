import instance from "@/app/lib/utils/instance";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

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

    const { data } = await instance.get("/user/activities", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error.response?.data.message || "Error getting user activities",
      },
      { status: 500 }
    );
  }
}
