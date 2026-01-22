import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        if (!token) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

        const userId = req.nextUrl.searchParams.get("userId");
        if (!userId) return NextResponse.json({ message: "User ID is required" }, { status: 400 });

        const { data } = await instance.get(`/user/profile/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};
