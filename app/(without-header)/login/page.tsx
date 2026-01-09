"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { useAppDispatch } from "@/app/lib/hooks";
import { setUser } from "@/app/lib/features/user/userSlice";
import { useRouter } from "next/navigation";
import GoogleLogin from "@/app/components/Shared/GoogleLogin/GoogleLogin";
import TermsLine from "@/app/components/Shared/TermsLine/TermsLine";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: "",
    isLoading: false,
  });
  const dispatch = useAppDispatch();
  const router = useRouter();

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
        return { ...prevState, error: error.response?.data.message };
      });
    } finally {
      setFormData((prevState) => {
        return { ...prevState, isLoading: false };
      });
    }

    // window.location.href = "/app";
    // cookieStore.set({
    //   name: "user_authenticated",
    //   value: "true", // or "1" or user ID
    //   path: "/",
    //   sameSite: "strict",
    // });
  };

  const handleStravaLogin = () => {
    setFormData((prevState) => {
      return { ...prevState, isLoading: true };
    });
    const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
    const redirectUri = `${window.location.origin}/api/strava/callback`;
    const scope = "activity:read_all,profile:read_all";
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&approval_prompt=force`;
    window.location.href = authUrl;
  };

  return (
    <section className="grid min-h-svh lg:grid-cols-2">
      <div className="flex items-center justify-center px-2">
        <div className="max-w-125 w-full flex flex-col mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center">
            Welcome back
          </h1>
          <p className="mt-2 text-sm sm:text-base text-center">
            Sign in to your account
          </p>

          <form onSubmit={handleLogin} className="mt-6">
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="w-full py-3 px-4"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="w-full py-3 px-4 mt-2"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {formData.error && (
              <span className="block text-center text-red-400 mt-2">
                {formData.error}
              </span>
            )}

            <Button
              type="submit"
              disabled={formData.isLoading}
              className={`mt-2 w-full border-none py-3 px-6 text-base font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2
              ${formData.isLoading && "opacity-70 cursor-not-allowed"}
            `}
            >
              {formData.isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="mt-2">
            <TermsLine />
          </div>

          <div className="relative flex items-center my-6">
            <div className="grow border-t border-gray-600"></div>
            <span className="shrink mx-4 text-gray-400 text-sm">or</span>
            <div className="grow border-t border-gray-600"></div>
          </div>

          <Button
            variant="outline"
            onClick={handleStravaLogin}
            disabled={formData.isLoading}
            className={`w-full py-3 px-6 font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-3
            ${formData.isLoading && "opacity-70 cursor-not-allowed"}
          `}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
            </svg>
            Sign in with Strava
          </Button>
          <GoogleLogin type="login" />
          <div className="mt-6 space-y-3 text-sm">
            <Link
              href="/signup"
              className="block text-orange-400 transition-colors text-center"
            >
              Don't have an account? Sign up
            </Link>
            <Link
              href="/forgot-password"
              className="block text-accent-foreground transition-colors text-center"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-[url(/images/gradient.webp)] bg-cover bg-center bg-no-repeat lg:block dark:bg-[url(/images/gradient-dark.webp)]"></div>
    </section>
  );
}
