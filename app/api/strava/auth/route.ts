import { STRAVA_CONFIG } from "@/app/lib/strava";

export async function GET() {
  const params = new URLSearchParams({
    client_id: STRAVA_CONFIG.clientId ?? "",
    redirect_uri: STRAVA_CONFIG.redirectUri,
    response_type: "code",
    scope: "activity:read_all,profile:read_all",
    approval_prompt: "force",
  });

  const authUrl = `${STRAVA_CONFIG.authUrl}?${params.toString()}`;
  console.log("Redirecting to:", authUrl);

  return Response.redirect(authUrl);
}
