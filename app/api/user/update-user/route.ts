import instance from "@/app/lib/utils/instance";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.formData();

    const { data } = await instance.post("/user?_method=put", body, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data.message || "Error updating user" },
      { status: 500 }
    );
  }
}
