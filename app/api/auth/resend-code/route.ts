import { NextResponse } from "next/server";

import { logger } from "@/app/lib/logger";
export async function POST() {
  try {
    const fakeCode = Math.floor(100000 + Math.random() * 900000).toString();

    logger.log(`New verification code: ${fakeCode}`);
    logger.log("Email sent with verification code (in demo mode)");

    return NextResponse.json({
      success: true,
      message: "Code was sent to email",
      code: fakeCode,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error sending code",
      },
      { status: 500 }
    );
  }
}
