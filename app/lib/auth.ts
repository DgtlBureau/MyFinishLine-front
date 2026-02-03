import { logger } from "@/app/lib/logger";
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export let users: any[] = [];

export async function sendVerificationEmail(email: string, code: string) {
  logger.log(`Verification code for ${email}: ${code}`);
}
