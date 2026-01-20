"use client";

import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { useAppDispatch } from "@/app/lib/hooks";
import { setUser } from "@/app/lib/features/user/userSlice";
import { useRouter } from "next/navigation";
import ChallengesSwiper from "@/app/components/ChallengesSwiper/ChallengesSwiper";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    error: "",
    isLoading: false,
    step: "reset",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    setFormData((prevState) => {
      return { ...prevState, error: "", isLoading: true };
    });

    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/reset-password", {
        email: formData.email,
      });
      setFormData((prevState) => {
        return { ...prevState, step: "success" };
      });
    } catch (error: any) {
      setFormData((prevState) => {
        return { ...prevState, error: error.response?.data.message };
      });
    } finally {
      setFormData((prevState) => {
        return { ...prevState, isLoading: false };
      });
    }
  };

  return (
    <section className="grid min-h-svh grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2">
      <div className="flex items-center justify-center px-2">
        <div className="max-w-125 w-full flex flex-col mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center">
            {formData.step === "reset"
              ? "Forgot your password?"
              : "Check your inbox"}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-center">
            {formData.step === "reset"
              ? "Enter your account's email address"
              : "Your new password was sent to your email"}
          </p>

          {formData.step === "reset" ? (
            <form onSubmit={handleResetPassword} className="mt-6">
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
              {formData.error && (
                <span className="block text-xs text-center text-red-400 mt-2">
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
                    Sending email...
                  </>
                ) : (
                  "Reset password"
                )}
              </Button>
            </form>
          ) : (
            <Link
              href="/login"
              className="mt-4 w-full rounded-lg text-center p-1 bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 hover:before:bg-primary/80 border-[0.8px] border-background/15 before:absolute relative before:-inset-px hover:after:translate-y-full after:transition-all after:translate-y-[105%] after:blur-sm overflow-hidden"
            >
              Go to login
            </Link>
          )}
        </div>
      </div>
      <div className="relative bg-[url(/images/gradient.webp)] bg-cover bg-center bg-no-repeat dark:bg-[url(/images/gradient-dark.webp)] ">
        <div className="py-2 flex items-center justify-center h-full w-full">
          <ChallengesSwiper />
        </div>
      </div>
    </section>
  );
}
