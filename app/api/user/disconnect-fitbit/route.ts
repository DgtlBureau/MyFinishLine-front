import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }
    const { data } = await instance.post(
      "/user/fitbit/disconnect",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );

    cookieStore.delete("fitbit_access_token");
    cookieStore.delete("fitbit_refresh_token");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.response?.data.message || "Error disconnecting Strava",
      },
      { status: 500 },
    );
  }
};
