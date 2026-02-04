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
        { status: 401 },
      );
    }

    const { data } = await instance.post("/challenges/start-quest", {}, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return NextResponse.json(data);
  } catch (error: any) {
    if (error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    return NextResponse.json(
      { message: "Service unavailable" },
      { status: 503 },
    );
  }
}
