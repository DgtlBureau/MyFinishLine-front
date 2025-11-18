"use client";

import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
    const redirectUri = `${window.location.origin}/api/strava/callback`;
    const scope = "activity:read_all";

    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&approval_prompt=force`;

    window.location.href = authUrl;
  };

  return (
    <section className="flex justify-center items-center min-h-screen p-5">
      <section className="bg-neutral-950 p-20 rounded-2xl text-center border border-[#fc4c02] w-full max-w-md ">
        <h1 className="text-white text-3xl font-semibold">Login to Strava</h1>
        <p className="text-white mt-2">Connect your Strava account</p>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full bg-[#fc4c02] mt-5 text-white border-none py-4 px-8 rounded-[10px] text-base font-semibold cursor-pointer transition-colors duration-300
            ${!loading ? "hover:bg-[#e44302]" : "opacity-70 cursor-not-allowed"}
          `}
        >
          {loading ? "Connecting..." : "Connect with Strava"}
        </button>
      </section>
    </section>
  );
}
