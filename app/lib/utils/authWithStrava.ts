export const getStravaAuthUrl = () => {
  const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
  const redirectUri = `${window.location.origin}/api/strava/callback`;
  const scope = "activity:read_all,profile:read_all";
  const state = encodeURIComponent(window.location.pathname);
  return `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&approval_prompt=force&state=${state}`;
};

export const authWithStrava = () => {
  window.location.href = getStravaAuthUrl();
};

export const linkStrava = () => {
  const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
  const redirectUri = `${window.location.origin}/api/strava/link`;
  const scope = "activity:read_all,profile:read_all";
  const state = encodeURIComponent(window.location.pathname);
  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&approval_prompt=force&state=${state}`;
  window.location.href = authUrl;
};
