export const linkFitbit = () => {
  const clientId = process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID;
  const redirectUri = encodeURIComponent(
    process.env.NEXT_PUBLIC_FITBIT_REDIRECT_URI!,
  );

  console.log(process.env.NEXT_PUBLIC_FITBIT_REDIRECT_URI);

  const fitbitAuthUrl = `https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=activity%20heartrate%20sleep&expires_in=604800`;

  window.location.href = fitbitAuthUrl;
};
