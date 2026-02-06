import { NextRequest, NextResponse } from "next/server";
import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { challenge_step_id, type } = body;

    if (!challenge_step_id || !type) {
      return NextResponse.json(
        { error: "challenge_step_id and type are required" },
        { status: 400 }
      );
    }

    // Get auth token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const endpoint = type === 'badge' ? '/challenges/claim-badge' : '/challenges/claim-card';

    // Pass token in Authorization header
    const { data } = await instance.post(endpoint, {
      challenge_step_id,
    }, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Claim cosmetic error:", error);

    if (error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    return NextResponse.json(
      { error: error.message || "Failed to claim cosmetic" },
      { status: 500 }
    );
  }
}
