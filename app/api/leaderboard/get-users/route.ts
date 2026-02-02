import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { logger } from "@/app/lib/logger";
export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const challengeId = searchParams.get("challenge_id");

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const { data } = await instance.get(
      "/leaderboard?challenge_id=" + challengeId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return NextResponse.json(data);
  } catch (error: any) {
    logger.error("API error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          message: error.response.data?.message || "Failed getting contracts",
          error: error.response.data?.error || "authentication_error",
          ...error.response.data,
        },
        { status: error.response.status }
      );
    }

    if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
      return NextResponse.json(
        {
          message: "Cannot connect to backend service",
          error: "service_unavailable",
        },
        { status: 503 }
      );
    }

    // Handle timeout
    if (error.code === "ECONNABORTED") {
      return NextResponse.json(
        {
          message: "Request timeout. Please try again.",
          error: "timeout_error",
        },
        { status: 408 }
      );
    }

    // Default error
    return NextResponse.json(
      {
        message: "Internal server error",
        error: "internal_error",
      },
      { status: 500 }
    );
  }
};
