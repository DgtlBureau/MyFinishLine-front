"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const FitBitCallbackPage = () => {
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  const handleSendFitbit = async (token: string) => {
    try {
      const { data } = await axios.post("/api/fitbit/connect", {
        token,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      setToken(accessToken);
      handleSendFitbit(accessToken);

      // Store token in localStorage or send to your backend
      localStorage.setItem("fitbit_token", accessToken);
    } else {
      console.error("No access token found");
    }
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1>Fitbit Connected!</h1>
      {token ? (
        <>
          <p>
            Access Token:{" "}
            <code style={{ wordBreak: "break-all" }}>{token}</code>
          </p>
          <button onClick={() => router.push("/")} style={{ marginTop: 20 }}>
            Go Home
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FitBitCallbackPage;
