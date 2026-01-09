"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

export default function VerifyPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: verificationCode }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess("Code confirmed");
        setTimeout(() => {
          router.push("/app");
        }, 2000);
      } else {
        setError(data.message || "Wrong code");
        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid min-h-svh lg:grid-cols-2">
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-md w-full">
          <div className="rounded-2xl">
            <div className="text-center">
              <h2 className="mt-2 text-3xl font-extrabold">Activation</h2>
              <p className="mt-2 text-sm text-accent-foreground">
                Enter challenge activation code
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="flex justify-center space-x-2">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      if (inputRefs.current) {
                        inputRefs.current[index] = el;
                      }
                    }}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    disabled={loading}
                  />
                ))}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Loading
                  </div>
                ) : (
                  "Confirm"
                )}
              </Button>
            </form>
          </div>
          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-xs">
              {error}
            </div>
          )}

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 100,
                  damping: 25,
                  mass: 1,
                  duration: 0.6,
                }}
                className="absolute left-0 -bottom-20 w-full py-3 px-4 rounded-lg bg-green-200 text-green-700"
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="relative hidden bg-[url(/images/gradient.webp)] bg-cover bg-center bg-no-repeat lg:block dark:bg-[url(/images/gradient-dark.webp)]"></div>
    </section>
  );
}
