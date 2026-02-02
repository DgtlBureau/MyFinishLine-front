import instance from "@/app/lib/utils/instance";
import { NextResponse } from "next/server";
import { handleApiError } from "@/app/lib/api-error-handler";

export async function GET() {
  try {
    const { data } = await instance.get("/challenges/list");

    return NextResponse.json(data);
  } catch (error: unknown) {
    return handleApiError(error, "GET /api/challenges/list");
  }
}
