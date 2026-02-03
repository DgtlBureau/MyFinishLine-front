"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";
import PageContainer from "@/app/components/Application/PageContainer/PageContainer";

const glassInputClassName =
  "h-12 text-base bg-white/15 backdrop-blur-xl border-white/30 text-white placeholder:text-white/40 focus:border-white/50 focus:ring-white/20";

const formItemVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 20,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const ChangePasswordPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (values: typeof form) => {
    const errs: Record<string, string> = {};
    if (!values.current_password) {
      errs.current_password = "Enter your current password";
    }
    if (!values.new_password) {
      errs.new_password = "Enter new password";
    } else if (values.new_password.length < 6) {
      errs.new_password = "Password must be at least 6 characters";
    }
    if (!values.new_password_confirmation) {
      errs.new_password_confirmation = "Confirm your new password";
    } else if (values.new_password && values.new_password !== values.new_password_confirmation) {
      errs.new_password_confirmation = "Passwords do not match";
    }
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    if (touched[e.target.name]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = { current_password: true, new_password: true, new_password_confirmation: true };
    setTouched(allTouched);
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);
    try {
      await axios.post("/api/user/change-password", form);
      toast.success("Password changed successfully");
      router.push("/app/profile/settings");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to change password";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer title="Password" description="Change your account password">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 pt-8 pb-24">
        <div className="space-y-6">
          <motion.label
            className="block w-full"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={formItemVariants}
          >
            <span className="text-base font-semibold text-white/80 tracking-wide">
              Current Password
            </span>
            <div className="relative mt-1">
              <Input
                name="current_password"
                type={showCurrent ? "text" : "password"}
                className={`pr-10 ${glassInputClassName}`}
                placeholder="Enter current password"
                value={form.current_password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.current_password ? errors.current_password : ""}
                displayError={false}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {touched.current_password && errors.current_password && (
              <span className="text-red-400 text-xs mt-1 block font-medium">{errors.current_password}</span>
            )}
          </motion.label>

          <motion.label
            className="block w-full"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={formItemVariants}
          >
            <span className="text-base font-semibold text-white/80 tracking-wide">
              New Password
            </span>
            <div className="relative mt-1">
              <Input
                name="new_password"
                type={showNew ? "text" : "password"}
                className={`pr-10 ${glassInputClassName}`}
                placeholder="At least 6 characters"
                value={form.new_password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.new_password ? errors.new_password : ""}
                displayError={false}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {touched.new_password && errors.new_password && (
              <span className="text-red-400 text-xs mt-1 block font-medium">{errors.new_password}</span>
            )}
          </motion.label>

          <motion.label
            className="block w-full"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={formItemVariants}
          >
            <span className="text-base font-semibold text-white/80 tracking-wide">
              Confirm New Password
            </span>
            <div className="relative mt-1">
              <Input
                name="new_password_confirmation"
                type={showConfirm ? "text" : "password"}
                className={`pr-10 ${glassInputClassName}`}
                placeholder="Repeat new password"
                value={form.new_password_confirmation}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.new_password_confirmation ? errors.new_password_confirmation : ""}
                displayError={false}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {touched.new_password_confirmation && errors.new_password_confirmation && (
              <span className="text-red-400 text-xs mt-1 block font-medium">{errors.new_password_confirmation}</span>
            )}
          </motion.label>
        </div>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={formItemVariants}
          className="mt-8"
        >
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-base font-semibold text-white bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all border-0"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Change Password"
            )}
          </Button>
        </motion.div>
      </form>
    </PageContainer>
  );
};

export default ChangePasswordPage;
