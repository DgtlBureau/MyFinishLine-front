"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useAppDispatch } from "@/app/lib/hooks";
import { setUser } from "@/app/lib/features/user/userSlice";

const Content = () => {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const [status, setStatus] = useState("Signing in with Google…");
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("/api/auth/google", {
        code,
      });
      dispatch(setUser(data.user));
      console.log("data from page", data);

      if (data.success) {
        setStatus("Signed in successfully! Redirecting to the app");
        setTimeout(() => {
          router.replace("/app");
        }, 3000);
      } else {
        setStatus("Google auth failed. Redirecting to login");
        setTimeout(() => {
          router.replace("/login");
        }, 3000);
      }
    } catch (err: any) {
      setStatus("Google auth error: " + err.message + " Redirecting to login");
      setTimeout(() => {
        router.replace("/login");
      }, 3000);
    }
  };

  useEffect(() => {
    if (!code) return;

    handleLogin();
  }, [code, router]);

  return (
    <div
      style={{ height: "calc(100vh - 513px)" }}
      className="w-full flex justify-center items-center font-bold"
    >
      {status}
    </div>
  );
};

const page = () => {
  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  );
};

export default page;
