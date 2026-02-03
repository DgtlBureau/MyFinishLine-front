"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { setChallenge } from "@/app/lib/features/challenge/challengeSlice";
import { clearUser, updateUser } from "@/app/lib/features/user/userSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { logger } from "@/app/lib/logger";
const ConfirmCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  useEffect(() => {
    const fullCode = code.join("");
    if (fullCode.length === 6) {
      handleSubmit(new Event("submit") as any);
    }
  }, [code]);

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const numbers = pastedData.replace(/\D/g, "").slice(0, 6).split("");

    const newCode = [...code];
    numbers.forEach((num, index) => {
      if (index < 6) {
        newCode[index] = num;
      }
    });

    setCode(newCode);

    const nextEmptyIndex = newCode.findIndex((val) => val === "");
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleGetActiveChallenge = async () => {
    try {
      const { data } = await axios.get("/api/user/active-challenge");
      dispatch(setChallenge(data));

      // Auto-mark step 0 (onboarding) as viewed
      const step0 = data?.steps?.find((step: any) => step.index === 0);
      if (step0?.id) {
        try {
          await axios.post("/api/user/view-story", { step_id: step0.id });
        } catch (e) {
          // Ignore errors - step 0 might not have stories
        }
      }

      router.replace("/app");
    } catch (error) {
      logger.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const verificationCode = code.join("");

    if (verificationCode.length !== 6) {
      setError("Please, provide valid code");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("/api/user/activate-code", {
        code: verificationCode,
      });
      if (data?.status) {
        dispatch(updateUser({ has_activated_code: true }));
      }
      handleGetActiveChallenge();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "Failed to activate code");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      dispatch(clearUser());
      localStorage.removeItem("persist:root");
      router.replace("/login");
    } catch (error) {
      logger.error("Error logging out: ", error);
    }
  };

  const handleClickLink = () => {
    handleLogout();
    router.push("/login");
  };

  return (
    <div className="fixed z-9999 w-screen h-screen top-0 left-0 bg-gradient-to-br from-[#3B5CC6] via-[#5C9BB8] via-50% to-[#4DA67A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo-line.png"
            width={957}
            height={489}
            alt="MyFinishLine"
            className="h-10 w-auto drop-shadow-lg"
          />
        </div>
        <div className="bg-white/15 backdrop-blur-3xl backdrop-saturate-150 border border-white/30 rounded-3xl p-8 shadow-2xl shadow-black/10 ring-1 ring-inset ring-white/20">
          <h1 className="block text-center text-3xl font-bold text-white drop-shadow-sm tracking-tight">
            Enter your challenge code below
          </h1>
          <p className="block mt-3 text-center text-white/70 text-sm">
            If you don&apos;t have challenge activation code, purchase one{" "}
            <button
              className="underline underline-offset-2 cursor-pointer text-white hover:text-white/90 transition-colors"
              onClick={handleClickLink}
            >
              here
            </button>
          </p>
          <div className="mt-8 flex items-center">
            <div className="h-px w-full bg-white/25" />
            <p className="block w-full mx-4 whitespace-nowrap font-medium text-base text-white/80 tracking-tight">
              Please enter it here
            </p>
            <div className="h-px w-full bg-white/25" />
          </div>
          <form className="mt-5" onSubmit={handleSubmit}>
            <div className="flex justify-center">
              {code.map((digit, index) => {
                if (index === 2) {
                  return (
                    <React.Fragment key={index}>
                      <Input
                        ref={(el) => {
                          if (inputRefs.current) {
                            inputRefs.current[index] = el;
                          }
                        }}
                        id={`code-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        className="w-11 h-11 rounded-none text-center text-xl font-bold bg-white/40 backdrop-blur-xl border border-white/50 text-white placeholder:text-white/40 focus:outline-none focus:border-white/80 focus:ring-2 focus:ring-white/30"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        disabled={loading}
                      />
                      <div className="w-4 h-0.5 bg-white/50 mx-2 my-auto rounded-lg"></div>
                    </React.Fragment>
                  );
                } else {
                  return (
                    <Input
                      key={index}
                      ref={(el) => {
                        if (inputRefs.current) {
                          inputRefs.current[index] = el;
                        }
                      }}
                      style={
                        index === 0
                          ? {
                              borderTopLeftRadius: 12,
                              borderBottomLeftRadius: 12,
                            }
                          : index === 5
                            ? {
                                borderTopRightRadius: 12,
                                borderBottomRightRadius: 12,
                              }
                            : {}
                      }
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="w-11 h-11 rounded-none text-center text-xl font-bold bg-white/40 backdrop-blur-xl border border-white/50 text-white placeholder:text-white/40 focus:outline-none focus:border-white/80 focus:ring-2 focus:ring-white/30"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      disabled={loading}
                    />
                  );
                }
              })}
            </div>

            <span className="mt-2 block text-red-500 font-medium text-sm text-center">
              {error}
            </span>

            <Button
              type="submit"
              variant="ghost"
              disabled={loading}
              className="group rounded-2xl mt-5 leading-none relative w-full flex justify-center py-6 px-4 text-base font-semibold cursor-pointer transition-all duration-300 overflow-hidden bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] text-white shadow-xl border border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              {loading ? (
                <div className="relative z-10 flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Loading
                </div>
              ) : (
                <span className="relative z-10">Continue</span>
              )}
            </Button>

            <Button
              type="button"
              onClick={handleLogout}
              variant="ghost"
              className="group rounded-2xl mt-3 leading-none relative w-full flex justify-center py-6 px-4 text-base font-semibold cursor-pointer transition-all duration-300 bg-white/20 backdrop-blur-xl border border-white/30 text-white hover:bg-white/30 hover:text-white hover:shadow-lg"
            >
              Logout
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCode;
