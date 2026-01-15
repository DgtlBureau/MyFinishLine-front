"use client";

import { FormEvent, Suspense, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useAppSelector } from "@/app/lib/hooks";
import RedeemStep1 from "@/app/components/Application/RedeemSteps/RedeemStep1/RedeemStep1";
import RedeemStep2 from "@/app/components/Application/RedeemSteps/RedeemStep2/RedeemStep2";
import RedeemStep3 from "@/app/components/Application/RedeemSteps/RedeemStep3/RedeemStep3";

import "flag-icons/css/flag-icons.min.css";

const Content = () => {
  const { user } = useAppSelector((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepIndex, setStepIndex] = useState(1);
  const [formData, setFormData] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    phone: user.phone || "",
    country: user.country || "",
    zip_code: "",
    address_1: "",
    address_2: "",
    company_name: "",
    city: "",
    email: user.email || "",
    dial_code: "",
    state: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const reward_id = searchParams.get("reward_id");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleUpdateCountry = useCallback((value: string) => {
    setFormData((prevState) => ({ ...prevState, country: value }));
  }, []);

  const handleUpdateState = useCallback((value: string) => {
    setFormData((prevState) => ({ ...prevState, state: value }));
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("/api/user/redeem-reward", {
        reward_id,
        ...formData,
        address: formData.address_1,
      });
      router.push("/app/profile/journey");
      toast.success("Medal claimed! Your medal is on its way.");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoToProfile = () => {
    router.push("/app/profile");
  };

  const handleGoNext = () => {
    setStepIndex((prevState) => prevState + 1);
  };

  return (
    <div className="p-4 pt-20 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl text-center font-semibold text-foreground">
          Amazonia Route
        </h1>
        <p className="text-sm text-center text-muted-foreground mt-1">
          Congratulations! You have completed you challenge, now claim your
          medal!
        </p>
      </motion.div>

      <div className="mt-4">
        <span className="block text-center text-sm leading-5 text-[#71717A]">
          Step {stepIndex} of 3
        </span>
        <div className="h-1 mt-2 bg-[#dadada] w-full rounded-2xl overflow-hidden">
          <motion.div
            style={{ width: stepIndex * 33.3 + "%" }}
            className="h-full bg-black"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8"
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          {stepIndex === 1 ? (
            <RedeemStep1
              {...formData}
              handleChange={handleChange}
              handleUpdateCountry={handleUpdateCountry}
            />
          ) : stepIndex === 2 ? (
            <RedeemStep2
              {...formData}
              handleChange={handleChange}
              handleUpdateSelect={handleUpdateState}
            />
          ) : (
            <RedeemStep3 {...formData} isLoading={isSubmitting} />
          )}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col gap-3 mt-2"
          >
            {stepIndex !== 3 && (
              <Button type="button" className="flex-1" onClick={handleGoNext}>
                Next
              </Button>
            )}
            <Button
              variant="outline"
              type="button"
              className="flex-1"
              onClick={handleGoToProfile}
            >
              Close
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

const Redeem = () => {
  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  );
};

export default Redeem;
