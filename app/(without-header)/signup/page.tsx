"use client";

import GoogleLogin from "@/app/components/Shared/GoogleLogin/GoogleLogin";
import TermsLine from "@/app/components/Shared/TermsLine/TermsLine";
import { getStravaAuthUrl } from "@/app/lib/utils/authWithStrava";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useAppDispatch } from "@/app/lib/hooks";
import { useRouter } from "next/navigation";
import { validate } from "./validate";
import { useFormik } from "formik";
import { useState, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import PasswordValidator from "@/app/components/PasswordValidator/PasswordValidator";
import { setUser } from "@/app/lib/features/user/userSlice";
import { getFitbitAuthUrl } from "@/app/lib/utils/authWithFitbit";
import Image from "next/image";
import { motion } from "motion/react";

interface IFormik {
  email: string;
  password: string;
  repeatPassword: string;
  code: string;
  error: string;
}

export default function Register() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [leaving, setLeaving] = useState(false);
  const [isCodeRevealed, setIsCodeRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const navigateWithFade = useCallback((provider: string, url: string) => {
    setLoadingProvider(provider);
    setLeaving(true);
    setTimeout(() => {
      window.location.href = url;
    }, 400);
  }, []);

  const { values, errors, touched, handleSubmit, handleBlur, setFieldValue } =
    useFormik<IFormik>({
      validate,
      initialValues: {
        email: "",
        password: "",
        repeatPassword: "",
        code: "",
        error: "",
      },
      onSubmit: async (values) => {
        if (isCodeRevealed) {
          setIsLoading(true);
          try {
            const { data } = await axios.post("/api/auth/register", {
              email: values.email,
              password: values.password,
              confirmPassword: values.repeatPassword,
              code: +values.code,
            });
            dispatch(setUser(data.user));
            router.replace("/app");
          } catch (error: any) {
            setFieldValue("error", error.response.data.message);
            console.error("Registration error:", error);
          } finally {
            setLoading(false);
          }
        } else {
          handleSendCode();
        }
      },
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.name, e.target.value);
  };

  const handleSendCode = async () => {
    setIsLoading(true);
    try {
      setFieldValue("error", "");
      await axios.post("/api/auth/send-code", {
        email: values.email,
      });
      setIsCodeRevealed(true);
    } catch (error: any) {
      console.log(error);
      setFieldValue("error", error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const glassInputClassName =
    "w-full py-5 px-6 text-lg rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 text-[#1a1a2e] placeholder:text-[#1a1a2e]/40 outline-none focus:border-white/80 focus:ring-2 focus:ring-white/30 focus:shadow-[0_0_15px_rgba(255,255,255,0.35)] transition-all";

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
              Create Account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-4 text-lg lg:text-xl text-white/70 text-center font-light"
            >
              Sign up to get started
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              onSubmit={handleSubmit}
              className="mt-10 space-y-5"
            >
              <Input
                id="email"
                name="email"
                type="email"
                className={glassInputClassName}
                placeholder="Enter your email"
                disabled={isCodeRevealed}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email ? errors.email : ""}
              />
              <Input
                id="password"
                name="password"
                type="password"
                className={glassInputClassName}
                placeholder="Create a password"
                disabled={isCodeRevealed}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password ? errors.password : ""}
              />
              {!isCodeRevealed && (
                <div>
                  <PasswordValidator password={values.password} />
                </div>
              )}
              <Input
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                className={glassInputClassName}
                placeholder="Repeat your password"
                disabled={isCodeRevealed}
                value={values.repeatPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.repeatPassword ? errors.repeatPassword : ""}
              />
              {isCodeRevealed && (
                <div>
                  <Input
                    id="code"
                    name="code"
                    className={glassInputClassName}
                    placeholder="123456"
                    value={values.code}
                    onChange={handleChange}
                  />
                  <span className="block mt-2 leading-4 text-xs text-white/60">
                    Enter code that was sent to your email
                  </span>
                </div>
              )}
              {values.error && (
                <span className="block text-sm text-center text-red-200 mt-1">
                  {values.error}
                </span>
              )}

              <Button
                type="submit"
                variant="ghost"
                disabled={isLoading}
                className={`group relative w-full py-5 px-6 text-lg font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 rounded-2xl overflow-hidden bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] text-white shadow-xl backdrop-blur-xl border border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] hover:bg-gradient-to-r hover:from-[#3B5CC6]/90 hover:to-[#4DA67A]/90 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99]
                ${isLoading && "opacity-70 cursor-not-allowed"}
              `}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                {isLoading ? (
                  <>
                    <div className="relative z-10 w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                    <span className="relative z-10">
                      {isCodeRevealed ? "Creating Account..." : "Sending code..."}
                    </span>
                  </>
                ) : (
                  <span className="relative z-10">
                    {isCodeRevealed ? "Create Account" : "Send code"}
                  </span>
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
              className="space-y-4"
            >
              <Button
                variant="ghost"
                onClick={() => navigateWithFade("strava", getStravaAuthUrl())}
                disabled={!!loadingProvider}
                className={`w-full py-5 px-6 text-lg font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-3 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] hover:bg-white/30 hover:shadow-lg hover:text-white
                ${loadingProvider && "opacity-70 cursor-not-allowed"}
              `}
              >
                {loadingProvider === "strava" ? (
                  <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                ) : (
                  <Image
                    src="/icons/strava-logo.png"
                    width={36}
                    height={36}
                    alt="Strava"
                    className="w-9 h-9 shrink-0 rounded-lg"
                  />
                )}
                Sign up with Strava
              </Button>

              <Button
                variant="ghost"
                onClick={() => navigateWithFade("fitbit", getFitbitAuthUrl())}
                disabled={!!loadingProvider}
                className={`w-full py-5 px-6 text-lg font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-3 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] hover:bg-white/30 hover:shadow-lg hover:text-white
                ${loadingProvider && "opacity-70 cursor-not-allowed"}
              `}
              >
                {loadingProvider === "fitbit" ? (
                  <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                ) : (
                  <Image
                    src="/icons/fitbit-logo.png"
                    width={36}
                    height={36}
                    alt="Fitbit"
                    className="w-9 h-9 shrink-0 rounded-lg"
                  />
                )}
                Sign up with FitBit
              </Button>

              <GoogleLogin
                type="sign-up"
                loading={loadingProvider === "google"}
                disabled={!!loadingProvider}
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
                href="/login"
                className="block text-white/80 hover:text-white transition-colors text-center font-medium"
              >
                Already have an account? <span className="underline underline-offset-2">Sign in</span>
              </Link>
            </motion.div>
          </motion.div>
      </div>
    </div>
  );
}
