import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const challengeId = searchParams.get("challenge_id");

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const { data } = await instance.get(
      "/challenges/challenge-one/" + challengeId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );

    return NextResponse.json(data);
  } catch (error: any) {
    if (error.response) {
      return NextResponse.json(
        {
          message: error.response.data?.message || "Failed getting contracts",
          error: error.response.data?.error || "authentication_error",
          ...error.response.data,
        },
        { status: error.response.status },
      );
    }
  }
};
