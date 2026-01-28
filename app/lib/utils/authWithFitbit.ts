export const linkFitbit = () => {
  const clientId = process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID;
  const redirectUri = "https://dev.myfinishline.io/auth/fitbit/callback";

  const fitbitAuthUrl = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=activity%20heartrate%20sleep%20profile`;

  window.location.href = fitbitAuthUrl;
};
