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
      router.replace("/app");
    } catch (error) {
      console.log(error);
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
    } catch (error: any) {
      setError(error.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      dispatch(clearUser());
      localStorage.removeItem("persist:root");
      router.replace("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const handleClickLink = () => {
    handleLogout();
    router.push("/#challenges");
  };

  return (
    <div className="fixed z-9999 to-white w-screen h-screen top-0 left-0 bg-white backdrop-blur-3xl flex items-center justify-center">
      <div className="absolute w-full h-[30vh] top-0 left-0 bg-linear-to-b from-[#C3B7E2] via-80% via-[#E9E0F6CC]"></div>
      <div className="fixed p-4 rounded-lg">
        <span className="block text-center text-3xl font-medium">
          Enter your challenge code below
        </span>
        <p className="block mt-2 text-center text-[#71717A] text-sm">
          If you don't have challenge activation code, purchase one{" "}
          <button
            className="underline cursor-pointer"
            onClick={handleClickLink}
          >
            here
          </button>
        </p>
        <div className="mt-10 flex items-center">
          <div className="h-px w-full bg-neutral-300" />
          <p className="block w-full mx-4 whitespace-nowrap font-medium text-lg tracking-tight">
            Please enter it here
          </p>
          <div className="h-px w-full bg-neutral-300" />
        </div>
        <form className="mt-4" onSubmit={handleSubmit}>
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
                      className="w-9 h-9 rounded-none text-center text-xl font-semibold border focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      disabled={loading}
                    />
                    <div className="w-4 h-0.5 bg-[#09090B] mx-2 my-auto rounded-lg"></div>
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
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                          }
                        : index === 5
                          ? {
                              borderTopRightRadius: 10,
                              borderBottomRightRadius: 10,
                            }
                          : {}
                    }
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-9 h-9 rounded-none text-center text-xl font-semibold border focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
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

          <span className="mt-2 block text-red-500 text-xs text-center">
            {error}
          </span>

          <Button
            type="submit"
            disabled={loading}
            className="group rounded-3xl mt-5 leading-none relative w-full flex justify-center py-6 px-4 border border-transparent text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading
              </div>
            ) : (
              "Continue"
            )}
          </Button>

          <Button
            type="button"
            onClick={handleLogout}
            variant="outline"
            className="group rounded-3xl mt-2 border border-[#DADADA] leading-none relative w-full flex justify-center py-6 px-4 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmCode;
