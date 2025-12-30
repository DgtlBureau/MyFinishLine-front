import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required", code: "NO_TOKEN" },
        { status: 401 }
      );
    }

    const response = await instance.post("/user/set-cosmetics", body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching user rewards:", error);

    // Handle different types of errors
    let errorMessage = "An unexpected error occurred";
    let statusCode = 500;
    let errorCode = "INTERNAL_ERROR";

    if (error.response) {
      const { status, data } = error.response;

      statusCode = status || 500;
      errorMessage = data?.message || data?.error || "API request failed";
      errorCode = data?.code || "API_ERROR";

      if (status === 401) {
        errorMessage = "Authentication failed. Please log in again.";
        errorCode = "UNAUTHORIZED";
      } else if (status === 403) {
        errorMessage = "You don't have permission to access rewards.";
        errorCode = "FORBIDDEN";
      } else if (status === 404) {
        errorMessage = "Rewards endpoint not found.";
        errorCode = "NOT_FOUND";
      }
    } else if (error.request) {
      errorMessage = "No response from server. Please check your connection.";
      errorCode = "NETWORK_ERROR";
      statusCode = 503;
    } else if (error.code === "ECONNABORTED") {
      errorMessage = "Request timeout. Please try again.";
      errorCode = "TIMEOUT";
      statusCode = 408;
    } else if (error.message?.includes("Network Error")) {
      errorMessage = "Network error. Please check your internet connection.";
      errorCode = "NETWORK_ISSUE";
      statusCode = 503;
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
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
