const authWithStrava = () => {
  const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
  const redirectUri = `${window.location.origin}/api/strava/callback`;
  const scope = "activity:read_all,profile:read_all";
  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&approval_prompt=force`;
  window.location.href = authUrl;
};

export default authWithStrava;
