"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAppDispatch } from "@/app/lib/hooks";
import { setUser } from "@/app/lib/features/user/userSlice";
import Link from "next/link";

const FitBitCallbackPage = () => {
  const [status, setStatus] = useState<string>(
    "Processing Fitbit authorization...",
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  const exchangeCodeForToken = async (code: string) => {
    try {
      const { data } = await axios.post("/api/fitbit/connect", {
        code,
        grant_type: "authorization_code",
        redirect_uri: `${window.location.origin}/auth/fitbit/callback`,
      });

      dispatch(setUser(data.user));

      if (data.status === 200) {
        setStatus(data.message);

        setTimeout(() => {
          router.push("/app/homepage");
        }, 3000);
      }
    } catch (error: any) {
      console.error("Failed to exchange code:", error.response.data.message);
      setStatus(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    exchangeCodeForToken(code!);
  }, []);

  return (
    <section className="grid min-h-svh lg:grid-cols-2">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold mb-4">Fitbit Authorization</h1>
        <p>{status}</p>
        {status.includes("successfully") && (
          <>
            <p className="block mt-4 text-gray-600">
              Redirecting to homepage...
            </p>
            <p className="block mt-4 text-gray-600">
              If you are not being redirected automatically, click{" "}
              <Link href="/app/homepage" className="underline">
                here
              </Link>
            </p>
          </>
        )}
      </div>
      <div className="relative hidden bg-[url(/images/gradient.webp)] bg-cover bg-center bg-no-repeat lg:block dark:bg-[url(/images/gradient-dark.webp)]"></div>
    </section>
  );
};

export default FitBitCallbackPage;
