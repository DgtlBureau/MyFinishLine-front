import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const { data } = await instance.post("user/reward-ticket", body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching reward-tickets:", error);

    let errorMessage = "Failed to redeem medal";
    let statusCode = 500;
    let errorCode = "FETCH_ERROR";

    if (error.response) {
      const { status, data } = error.response;

      statusCode = status || 500;
      errorMessage = data?.message || data?.error || "Failed to redeem reward";
      errorCode = data?.code || "API_ERROR";

      if (status === 401 || status === 403) {
        errorMessage = "Authentication error";
        errorCode = "AUTH_ERROR";
      } else if (status === 404) {
        errorMessage = "Endpoint not found";
        errorCode = "ENDPOINT_NOT_FOUND";
      } else if (status === 429) {
        errorMessage = "Too many requests";
        errorCode = "RATE_LIMITED";
      }
    } else if (error.request) {
      errorMessage = "Service is unreachable. Please try again later.";
      errorCode = "SERVICE_UNAVAILABLE";
      statusCode = 503;
    } else if (error.code === "ECONNABORTED") {
      errorMessage = "Request timed out";
      errorCode = "TIMEOUT";
      statusCode = 408;
    } else if (error.message?.includes("Network Error")) {
      errorMessage = "Network error. Cannot connect to server.";
      errorCode = "NETWORK_ERROR";
      statusCode = 503;
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        code: errorCode,
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV === "development" && {
          debug: error.message,
          stack: error.stack,
        }),
      },
      { status: statusCode }
    );
  }
};
