import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { logger } from "@/app/lib/logger";
export const GET = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const { data } = await instance.get("/leaderboard", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    logger.error("API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
