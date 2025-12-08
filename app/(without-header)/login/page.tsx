"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Image from "next/image";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    window.location.href = "/myfinishline";
  };

  const handleStravaLogin = () => {
    setLoading(true);
    const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
    const redirectUri = `${window.location.origin}/api/strava/callback`;
    const scope = "activity:read_all,profile:read_all";
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&approval_prompt=force`;
    window.location.href = authUrl;
  };

  return (
    <section className="grid min-h-svh lg:grid-cols-2">
      <div className="flex items-center justify-center px-2">
        <div className="max-w-[500px] w-full flex flex-col mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center">
            Welcome back
          </h1>
          <p className="mt-2 text-sm sm:text-base text-center">
            Sign in to your account
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
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
              className="w-full py-3 px-4"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              disabled={loading}
              className={`w-full border-none py-3 px-6 text-base font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2
              ${loading && "opacity-70 cursor-not-allowed"}
            `}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="relative flex items-center my-6">
            <div className="grow border-t border-gray-600"></div>
            <span className="shrink mx-4 text-gray-400 text-sm">or</span>
            <div className="grow border-t border-gray-600"></div>
          </div>

          <Button
            variant="outline"
            onClick={handleStravaLogin}
            disabled={loading}
            className={`w-full py-3 px-6 font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-3
            ${loading && "opacity-70 cursor-not-allowed"}
          `}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
            </svg>
            Sign in with Strava
          </Button>

          <Button
            variant="outline"
            disabled={loading}
            className="w-full mt-2 py-3 px-6 font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Image
              src="/icons/google.svg"
              width={12}
              height={12}
              alt="Google"
            />
            Sign in with Google
          </Button>
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
