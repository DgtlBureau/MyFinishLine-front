import instance from "@/app/lib/utils/instance";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const perPage = searchParams.get("perPage");
    const page = searchParams.get("page");

    const params = {
      perPage: perPage || 10,
      page,
    };

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    const { data } = await instance.get("/user/activities", {
      headers: {
        Authorization: "Bearer " + token,
      },
      params,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error.response?.data.message || "Error getting user activities",
      },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    const { data } = await instance.post("/user/set-activity", body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error.response?.data.message || "Error getting user activities",
      },
      { status: 500 },
    );
  }
};
