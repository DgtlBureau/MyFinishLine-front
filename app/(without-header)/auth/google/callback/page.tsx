"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useAppDispatch } from "@/app/lib/hooks";
import { setUser } from "@/app/lib/features/user/userSlice";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

const Content = () => {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const error = params.get("error");
  const [status, setStatus] = useState("Processing Google authorization...");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("/api/auth/google", {
        code,
      });
      dispatch(setUser(data.user));

      if (data.success) {
        setStatus("Signed in successfully! Redirecting to the app");
        setIsSuccess(true);
        setTimeout(() => {
          router.replace("/app");
        }, 3000);
      } else {
        setStatus("Google auth failed. Redirecting to login");
        setIsError(true);
        setTimeout(() => {
          router.replace("/login");
        }, 3000);
      }
    } catch (err: any) {
      setStatus("Google auth error: " + err.message + " Redirecting to login");
      setIsError(true);
      setTimeout(() => {
        router.replace("/login");
      }, 3000);
    }
  };

  useEffect(() => {
    if (error) {
      setStatus("Error signing in with Google. " + error);
      setIsError(true);
      return;
    }

    if (!code) return;
    handleLogin();
  }, [code, error, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#1a2a4a] via-[#2a4a6a] to-[#1a3a3a]">
      {/* Background decorative elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#4285F4]/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#34A853]/15 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-lg"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(66, 133, 244, 0.4) 0%, transparent 70%)"
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Main card */}
        <div className="relative bg-white/15 backdrop-blur-3xl backdrop-saturate-150 border border-white/30 rounded-3xl p-10 md:p-14 shadow-2xl shadow-black/20 ring-1 ring-inset ring-white/20">

          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(66, 133, 244, 0.4) 0%, transparent 70%)"
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.2, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Status icon */}
              <div className="relative bg-gradient-to-br from-[#4285F4] to-[#357AE8] p-5 rounded-full">
                {isError ? (
                  <AlertCircle className="w-16 h-16 text-white" strokeWidth={2.5} />
                ) : isSuccess ? (
                  <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
                ) : (
                  <Loader2 className="w-16 h-16 text-white animate-spin" strokeWidth={2.5} />
                )}
              </div>
            </div>
          </motion.div>

          {/* Google Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex justify-center mb-6"
          >
            <Image
              src="/icons/google-icon-new.svg"
              width={48}
              height={48}
              alt="Google"
              className="opacity-80"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
          >
            {isError ? "Authorization Failed" : isSuccess ? "Signed In Successfully!" : "Signing In with Google"}
          </motion.h1>

          {/* Status message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className={`text-center mb-6 text-lg ${isError ? "text-red-200" : "text-white/70"}`}
          >
            {status}
          </motion.p>

          {/* Success message */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-center space-y-3"
            >
              <p className="text-white/60 text-sm">
                Redirecting to app...
              </p>
              <p className="text-white/50 text-xs">
                If you are not being redirected automatically, click{" "}
                <Link href="/app/homepage" className="text-[#4285F4] hover:text-[#5A9EFF] underline underline-offset-2 transition-colors">
                  here
                </Link>
              </p>
            </motion.div>
          )}

          {/* Error action */}
          {isError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-6"
            >
              <Link
                href="/login"
                className="group relative w-full flex justify-center items-center py-4 px-6 text-lg font-semibold rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden bg-gradient-to-r from-[#4285F4] to-[#357AE8] text-white shadow-xl border border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">Back to Login</span>
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
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
