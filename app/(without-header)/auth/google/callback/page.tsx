"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useAppDispatch } from "@/app/lib/hooks";
import { setUser } from "@/app/lib/features/user/userSlice";
import Link from "next/link";

const Content = () => {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const error = params.get("error");
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

  if (error) {
    setStatus("Error signing in with google. " + error);
  }

  useEffect(() => {
    if (!code) return;

    handleLogin();
  }, [code, router]);

  return (
    <section className="grid min-h-svh lg:grid-cols-2">
      <div className="flex items-center justify-center flex-col">
        <p>{status}</p>
        {status.includes("Signed in successfully") && (
          <p className="block mt-4">
            if you are not redirected please{" "}
            <Link href="/app/homepage" className="underline">
              click here
            </Link>
          </p>
        )}
      </div>
      <div className="relative hidden bg-[url(/images/gradient.webp)] bg-cover bg-center bg-no-repeat lg:block dark:bg-[url(/images/gradient-dark.webp)]"></div>
    </section>
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
