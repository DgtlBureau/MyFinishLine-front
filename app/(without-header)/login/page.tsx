"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { useAppDispatch } from "@/app/lib/hooks";
import { setUser } from "@/app/lib/features/user/userSlice";
import { useRouter } from "next/navigation";
import GoogleLogin from "@/app/components/Shared/GoogleLogin/GoogleLogin";
import TermsLine from "@/app/components/Shared/TermsLine/TermsLine";
import Image from "next/image";
import { getFitbitAuthUrl } from "@/app/lib/utils/authWithFitbit";
import { motion } from "motion/react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: "",
    isLoading: false,
  });
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [leaving, setLeaving] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (countdown <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [countdown > 0]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      setForgotError("Please enter a valid email address");
      return;
    }
    setForgotLoading(true);
    setForgotError("");
    try {
      await axios.post("/api/auth/reset-password", { email: forgotEmail });
      setForgotSent(true);
      setCountdown(600);
    } catch (error: any) {
      setForgotError(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setForgotLoading(false);
    }
  };

  const closeForgotModal = () => {
    setShowForgot(false);
    setForgotEmail("");
    setForgotError("");
    setForgotSent(false);
    setCountdown(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const navigateWithFade = useCallback((provider: string, url: string) => {
    setLoadingProvider(provider);
    setLeaving(true);
    setTimeout(() => {
      window.location.href = url;
    }, 400);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    setFormData((prevState) => {
      return { ...prevState, error: "", isLoading: true };
    });

    e.preventDefault();
    try {
      // Use Next.js API route to avoid CORS
      const { data } = await axios.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      dispatch(setUser(data.user));
      if (data.user.has_activated_code === false) {
        router.replace("/confirm-challenge");
        return;
      }
      router.replace("/app");
    } catch (error: any) {
      setFormData((prevState) => {
        return { ...prevState, error: error.response?.data?.message || "Login failed" };
      });
    } finally {
      setFormData((prevState) => {
        return { ...prevState, isLoading: false };
      });
    }
  };

  const handleStravaLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
    const redirectUri = "https://dev.myfinishline.io/api/strava/callback";
    const scope = "activity:read_all,profile:read_all";
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&approval_prompt=force`;
    navigateWithFade("strava", authUrl);
  };

  const glassInputClassName =
    "w-full py-4 px-5 text-base rounded-xl bg-white/50 backdrop-blur-xl border border-white/60 text-[#1a1a2e] placeholder:text-[#1a1a2e]/40 outline-none focus:border-white/80 focus:ring-2 focus:ring-white/30 focus:shadow-[0_0_15px_rgba(255,255,255,0.35)] transition-all";

  return (
    <div className={`flex items-center justify-center px-6 py-12 min-h-svh transition-all duration-400 ${leaving ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
      <div className="max-w-xl lg:max-w-2xl w-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="hidden lg:flex justify-center mb-8"
          >
            <Image
              src="/images/logo-line.png"
              width={957}
              height={489}
              alt="MyFinishLine"
              className="h-10 w-auto drop-shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="bg-white/30 backdrop-blur-2xl backdrop-saturate-200 border border-white/40 rounded-3xl p-8 sm:p-10 lg:p-14 shadow-2xl shadow-black/10"
          >
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="text-4xl lg:text-5xl font-bold text-white text-center drop-shadow-sm tracking-tight"
            >
              Welcome back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-4 text-lg lg:text-xl text-white/70 text-center font-light"
            >
              Sign in to your account
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              onSubmit={handleLogin}
              className="mt-10 space-y-5"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1.5">Email:</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={glassInputClassName}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1.5">Password:</label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className={glassInputClassName}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    whileTap={{ scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
                  >
                    <motion.span
                      key={showPassword ? "off" : "on"}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.15 }}
                      className="block"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </motion.span>
                  </motion.button>
                </div>
              </div>
              {formData.error && (
                <span className="block text-sm text-center text-red-200 mt-1">
                  {formData.error}
                </span>
              )}

              <Button
                type="submit"
                variant="ghost"
                disabled={formData.isLoading}
                className={`group relative w-full py-4 px-5 text-base font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 rounded-xl overflow-hidden bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] text-white shadow-xl backdrop-blur-xl border border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] hover:bg-gradient-to-r hover:from-[#3B5CC6]/90 hover:to-[#4DA67A]/90 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99]
                ${formData.isLoading && "opacity-70 cursor-not-allowed"}
              `}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                {formData.isLoading ? (
                  <>
                    <div className="relative z-10 w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    <span className="relative z-10">Signing In...</span>
                  </>
                ) : (
                  <span className="relative z-10">Sign In</span>
                )}
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="mt-4"
            >
              <TermsLine />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="relative flex items-center my-8"
            >
              <div className="grow border-t border-white/25"></div>
              <span className="shrink mx-4 text-white/50 text-base tracking-wide uppercase">or</span>
              <div className="grow border-t border-white/25"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="space-y-3"
            >
              <Button
                variant="ghost"
                onClick={handleStravaLogin}
                disabled={formData.isLoading || !!loadingProvider}
                className={`w-full py-3.5 px-5 text-base font-medium cursor-pointer transition-all duration-300 flex items-center justify-center gap-2.5 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] hover:bg-white/30 hover:shadow-lg hover:text-white
                ${(formData.isLoading || loadingProvider) && "opacity-70 cursor-not-allowed"}
              `}
              >
                <div className="w-7 h-7 flex items-center justify-center shrink-0">
                  {loadingProvider === "strava" ? (
                    <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                  ) : (
                    <Image
                      src="/icons/strava-logo.png"
                      width={28}
                      height={28}
                      alt="Strava"
                      className="w-7 h-7 rounded-md"
                    />
                  )}
                </div>
                Sign in with Strava
              </Button>

              <Button
                variant="ghost"
                onClick={() => navigateWithFade("fitbit", getFitbitAuthUrl())}
                disabled={formData.isLoading || !!loadingProvider}
                className={`w-full py-3.5 px-5 text-base font-medium cursor-pointer transition-all duration-300 flex items-center justify-center gap-2.5 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] hover:bg-white/30 hover:shadow-lg hover:text-white
                ${(formData.isLoading || loadingProvider) && "opacity-70 cursor-not-allowed"}
              `}
              >
                <div className="w-7 h-7 flex items-center justify-center shrink-0">
                  {loadingProvider === "fitbit" ? (
                    <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                  ) : (
                    <Image
                      src="/icons/fitbit-logo.png"
                      width={28}
                      height={28}
                      alt="Fitbit"
                      className="w-7 h-7 rounded-md"
                    />
                  )}
                </div>
                Sign in with FitBit
              </Button>

              <GoogleLogin
                type="login"
                loading={loadingProvider === "google"}
                disabled={formData.isLoading || !!loadingProvider}
                onNavigate={(url) => navigateWithFade("google", url)}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.75 }}
              className="mt-8 space-y-4 text-lg"
            >
              <Link
                href="/signup"
                className="block text-white/80 hover:text-white transition-colors text-center font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
              >
                Don't have an account? <span className="underline underline-offset-2">Sign up</span>
              </Link>
              <button
                onClick={() => setShowForgot(true)}
                className="block w-full text-white/50 hover:text-white/70 transition-colors text-center text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] cursor-pointer"
              >
                Forgot your password?
              </button>
            </motion.div>
          </motion.div>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          onClick={closeForgotModal}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative bg-white/30 backdrop-blur-2xl backdrop-saturate-200 border border-white/40 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/10 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {!forgotSent ? (
              <>
                <h2 className="text-2xl font-bold text-white text-center drop-shadow-sm">
                  Forgot your password?
                </h2>
                <p className="mt-2 text-white/60 text-center text-sm">
                  Enter your email and we&apos;ll send you a reset link
                </p>
                <form onSubmit={handleForgotPassword} className="mt-6 space-y-4">
                  <Input
                    type="email"
                    className={glassInputClassName}
                    placeholder="Enter your email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />
                  {forgotError && (
                    <span className="block text-sm text-center text-red-200">{forgotError}</span>
                  )}
                  <Button
                    type="submit"
                    disabled={forgotLoading}
                    className={`group relative w-full py-4 px-6 text-base font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 rounded-2xl overflow-hidden bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] !text-white shadow-xl border border-white/30 hover:from-[#3B5CC6]/90 hover:to-[#4DA67A]/90
                      ${forgotLoading && "opacity-70 cursor-not-allowed"}
                    `}
                  >
                    {forgotLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      "Send reset link"
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white drop-shadow-sm">
                  Check your inbox
                </h2>
                <p className="mt-2 text-white/60 text-sm">
                  Reset link sent to <span className="text-white/80 font-medium">{forgotEmail}</span>
                </p>
                {countdown > 0 && (
                  <div className="mt-6">
                    <p className="text-white/50 text-xs mb-2">Link expires in</p>
                    <span className="text-3xl font-bold text-white drop-shadow-sm font-mono tracking-wider">
                      {formatTime(countdown)}
                    </span>
                  </div>
                )}
                <button
                  onClick={closeForgotModal}
                  className="mt-6 text-white/60 hover:text-white transition-colors text-sm cursor-pointer"
                >
                  Back to sign in
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
