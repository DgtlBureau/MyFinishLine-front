"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/lib/hooks";
import { setUser } from "@/app/lib/features/user/userSlice";
import { authWithStrava } from "@/app/lib/utils/authWithStrava";
import TermsLine from "@/app/components/Shared/TermsLine/TermsLine";
import GoogleLogin from "@/app/components/Shared/GoogleLogin/GoogleLogin";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [isCodeRevealed, setIsCodeRevealed] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
    error: "",
  });
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setFormData((prevState) => {
      return { ...prevState, error: "" };
    });

    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setFormData((prevState) => {
        return { ...prevState, error: "Passwords do not match" };
      });
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setFormData((prevState) => {
        return {
          ...prevState,
          error: "Password should contain at least 6 characters",
        };
      });
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("/api/auth/register", formData);
      dispatch(setUser(data.user));
      router.replace("/app");
    } catch (error: any) {
      console.error("Registration error:", error);
      setFormData((prevState) => {
        return { ...prevState, error: error.response?.data.message };
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async () => {
    try {
      const { data } = await axios.post("/api/auth/send-code", {
        email: formData.email,
      });
      setIsCodeRevealed(true);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="grid min-h-svh lg:grid-cols-2">
      <section className="flex items-center justify-center px-2">
        <div className="max-w-125 w-full flex flex-col mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center">
            Create Account
          </h1>
          <p className="mt-2 text-sm sm:text-base text-center">
            Sign up to get started
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="w-full py-3 px-4 mt-2"
              placeholder="Repeat your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {isCodeRevealed && (
              <label className="block mt-2" htmlFor="code">
                <Input
                  id="code"
                  name="code"
                  required
                  className="w-full py-3 px-4"
                  placeholder="123456"
                  value={formData.code}
                  onChange={handleChange}
                />
                <span className="block leading-4 text-xs">
                  Enter code that was send to your email
                </span>
              </label>
            )}
            {formData.error && (
              <span className="block text-center w-fit text-red-400 pl-4 mt-2">
                {formData.error}
              </span>
            )}

            {isCodeRevealed && (
              <Button
                type="submit"
                disabled={loading}
                className={`mt-2 w-full border-none py-3 px-6 text-base font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2
              ${loading && "opacity-70 cursor-not-allowed"}
            `}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            )}

            {!isCodeRevealed && (
              <Button
                variant="outline"
                type="button"
                onClick={handleSendCode}
                disabled={loading}
                className={`mt-2 w-full py-3 px-6 text-base font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2
              ${loading && "opacity-70 cursor-not-allowed"}
            `}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending code...
                  </>
                ) : (
                  "Send code"
                )}
              </Button>
            )}
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
            onClick={() => {
              setLoading(true);
              authWithStrava();
            }}
            disabled={loading}
            className={`w-full py-3 px-6 font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-3
            ${loading && "opacity-70 cursor-not-allowed"}
          `}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
            </svg>
            Sign up with Strava
          </Button>
          <GoogleLogin type="sign-up" />

          <div className="mt-6 space-y-3 text-sm">
            <Link
              href="/login"
              className="block text-orange-400 hover:text-[#e44302] transition-colors text-center"
            >
              Already have an account? Sign in
            </Link>
          </div>

          <p className="text-gray-400 text-xs mt-4 text-center">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy
          </p>
        </div>
      </section>
      <div className="relative hidden bg-[url(/images/gradient.webp)] bg-cover bg-center bg-no-repeat lg:block dark:bg-[url(/images/gradient-dark.webp)]"></div>
    </section>
  );
}
