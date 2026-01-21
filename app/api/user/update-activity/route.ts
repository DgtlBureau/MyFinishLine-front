import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const { data } = await instance.post(
      "/user/set-init",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
    return NextResponse.json({
      status: 200,
      ...data,
    });
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
};
