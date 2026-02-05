import instance from "@/app/lib/utils/instance";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({
        status: "error",
        message: "No activation code provided",
      });
    }

    const { data } = await instance.post(
      "/user/activate-purchase-code",
      {
        code,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );

    return NextResponse.json(data);
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Error sending code";

    return NextResponse.json({ message }, { status });
  }
};
