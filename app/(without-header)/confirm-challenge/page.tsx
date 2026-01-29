"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useAppDispatch } from "@/app/lib/hooks";
import { setUser } from "@/app/lib/features/user/userSlice";
import Link from "next/link";
import ConfirmCode from "@/app/components/ConfirmCode/ConfirmCode";

const Content = () => {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const [status, setStatus] = useState("Signed in successfully");
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("/api/auth/google", {
        code,
      });
      dispatch(setUser(data.user));

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

  return <ConfirmCode />;
};

const page = () => {
  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  );
};

export default page;
