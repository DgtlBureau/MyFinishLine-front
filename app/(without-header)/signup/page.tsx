"use client";

import GoogleLogin from "@/app/components/Shared/GoogleLogin/GoogleLogin";
import TermsLine from "@/app/components/Shared/TermsLine/TermsLine";
import { authWithStrava } from "@/app/lib/utils/authWithStrava";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useAppDispatch } from "@/app/lib/hooks";
import { useRouter } from "next/navigation";
import { validate } from "./validate";
import { useFormik } from "formik";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import PasswordValidator from "@/app/components/PasswordValidator/PasswordValidator";
import { setUser } from "@/app/lib/features/user/userSlice";

interface IFormik {
  email: string;
  password: string;
  repeatPassword: string;
  code: string;
  error: string;
}

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [isCodeRevealed, setIsCodeRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

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

  console.log(errors);

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
              className="mt-2"
              placeholder="Create a password"
              disabled={isCodeRevealed}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password ? errors.password : ""}
            />
            {!isCodeRevealed && (
              <div className="mt-2">
                <PasswordValidator password={values.password} />
              </div>
            )}
            <Input
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              className="mt-2"
              placeholder="Repeat your password"
              disabled={isCodeRevealed}
              value={values.repeatPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.repeatPassword ? errors.repeatPassword : ""}
            />
            {isCodeRevealed && (
              <label className="block mt-1" htmlFor="code">
                <Input
                  id="code"
                  name="code"
                  className="w-full py-3 px-4"
                  placeholder="123456"
                  value={values.code}
                  onChange={handleChange}
                />
                <span className="block mt-2 leading-4 text-xs">
                  Enter code that was send to your email
                </span>
              </label>
            )}
            {isCodeRevealed && (
              <Button
                type="submit"
                disabled={isLoading}
                className={`mt-2 w-full border-none py-3 px-6 text-base font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2
              ${isLoading && "opacity-70 cursor-not-allowed"}
            `}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            )}
            {values.error && (
              <span className="text-red-400 text-xs leading-0">
                {values.error}
              </span>
            )}
            {!isCodeRevealed && (
              <Button
                variant="outline"
                type="submit"
                disabled={isLoading}
                className={`mt-2 w-full py-3 px-6 text-base font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2
              ${isLoading && "opacity-70 cursor-not-allowed"}
            `}
              >
                {isLoading ? (
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
