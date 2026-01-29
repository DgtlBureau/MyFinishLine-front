export const getFitbitAuthUrl = () => {
  const clientId = process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID;
  const redirectUri = "https://dev.myfinishline.io/auth/fitbit/callback";
  const state = encodeURIComponent(window.location.pathname);
  return `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=activity%20heartrate%20sleep%20profile&state=${state}`;
};

export const linkFitbit = () => {
  window.location.href = getFitbitAuthUrl();
};
