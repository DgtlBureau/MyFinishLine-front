"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useAppSelector } from "@/app/lib/hooks";
import RedeemStep1 from "@/app/components/Application/RedeemSteps/RedeemStep1/RedeemStep1";
import RedeemStep2 from "@/app/components/Application/RedeemSteps/RedeemStep2/RedeemStep2";
import RedeemStep3 from "@/app/components/Application/RedeemSteps/RedeemStep3/RedeemStep3";
import { isValidPhone } from "@/app/lib/utils/regex";

import "flag-icons/css/flag-icons.min.css";
import PageContainer from "@/app/components/Application/PageContainer/PageContainer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { IActiveChallenge } from "@/app/types";

interface FormValues {
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  zip_code: string;
  address_1: string;
  address_2: string;
  city: string;
  email: string;
  dial_code: string;
  state: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface FormTouched {
  [key: string]: boolean | undefined;
}

const validateStep1 = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.first_name.trim()) {
    errors.first_name = "First name is required";
  } else if (values.first_name.length < 2) {
    errors.first_name = "First name must be at least 2 characters";
  }

  if (!values.last_name.trim()) {
    errors.last_name = "Last name is required";
  } else if (values.last_name.length < 2) {
    errors.last_name = "Last name must be at least 2 characters";
  }

  if (!values.country) {
    errors.country = "Country is required";
  }

  if (!values.dial_code.trim()) {
    errors.dial_code = "Dial code is required";
  } else if (!/^\+?\d{1,4}$/.test(values.dial_code.replace(/\s/g, ''))) {
    errors.dial_code = "Invalid dial code";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!isValidPhone(values.phone)) {
    errors.phone = "Invalid phone number";
  }

  return errors;
};

const validateStep2 = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.address_1.trim()) {
    errors.address_1 = "Address is required";
  }

  if (!values.city.trim()) {
    errors.city = "City is required";
  }

  if (!values.zip_code.trim()) {
    errors.zip_code = "Zip code is required";
  } else if (!/^[a-zA-Z0-9\s\-]{3,10}$/.test(values.zip_code)) {
    errors.zip_code = "Invalid zip code";
  }

  return errors;
};

const Content = () => {
  const { user } = useAppSelector((state) => state.user);
  const [stepIndex, setStepIndex] = useState(1);
  const [challenge, setChallenge] = useState<IActiveChallenge>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const reward_id = searchParams.get("reward_id");
  const challenge_name = searchParams.get("challenge_name");
  const challenge_id = searchParams.get("challenge_id");

  const [values, setValues] = useState<FormValues>({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    phone: user.phone || "",
    country: user.country || "",
    zip_code: "",
    address_1: "",
    address_2: "",
    city: "",
    email: user.email || "",
    dial_code: "",
    state: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});

  const handleLoadChallenge = async () => {
    try {
      const { data } = await axios.get(
        "/api/user/challenge?challenge_id=" + challenge_id,
      );
      setChallenge(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadChallenge();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    // Validate the field
    const allErrors = { ...validateStep1(values), ...validateStep2(values) };
    setErrors(prev => ({ ...prev, [name]: allErrors[name] }));
  };

  const handleUpdateCountry = (value: string) => {
    setValues(prev => ({ ...prev, country: value }));
    setTouched(prev => ({ ...prev, country: true }));

    const updatedValues = { ...values, country: value };
    const countryError = validateStep1(updatedValues).country;
    setErrors(prev => ({ ...prev, country: countryError }));
  };

  const handleGoNext = () => {
    const currentStepErrors = stepIndex === 1
      ? validateStep1(values)
      : validateStep2(values);

    // Touch all fields in current step
    if (stepIndex === 1) {
      setTouched(prev => ({
        ...prev,
        first_name: true,
        last_name: true,
        country: true,
        dial_code: true,
        phone: true,
      }));
    } else if (stepIndex === 2) {
      setTouched(prev => ({
        ...prev,
        address_1: true,
        city: true,
        zip_code: true,
      }));
    }

    setErrors(prev => ({ ...prev, ...currentStepErrors }));

    if (Object.keys(currentStepErrors).length === 0) {
      setStepIndex(prev => prev + 1);
    }
  };

  const handleGoBack = () => {
    setStepIndex(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (stepIndex !== 3) return;

    setIsSubmitting(true);
    try {
      await axios.post("/api/user/redeem-reward", {
        reward_id,
        ...values,
        address: values.address_1,
      });
      router.push("/app/profile/journey");
      toast.success("Medal claimed! Your medal is on its way.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer
      title={challenge_name || "Claim your medal"}
      description="Congratulations! You have completed you challenge, now claim your
            medal!"
    >
      <div className="px-4">
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {stepIndex === 1 ? (
              <RedeemStep1
                first_name={values.first_name}
                last_name={values.last_name}
                country={values.country}
                dial_code={values.dial_code}
                phone={values.phone}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleUpdateCountry={handleUpdateCountry}
                errors={errors}
                touched={touched}
              />
            ) : stepIndex === 2 ? (
              <RedeemStep2
                address_1={values.address_1}
                address_2={values.address_2}
                city={values.city}
                state={values.state}
                zip_code={values.zip_code}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            ) : (
              <RedeemStep3
                {...values}
                isLoading={isSubmitting}
                rewardImage={challenge?.reward?.image_url || ""}
              />
            )}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex gap-3 mt-2"
            >
              {stepIndex !== 1 && (
                <Button
                  variant="outline"
                  type="button"
                  className="flex-1"
                  onClick={handleGoBack}
                >
                  <ArrowLeft />
                  Back
                </Button>
              )}
              {stepIndex !== 3 && (
                <Button type="button" className="flex-1" onClick={handleGoNext}>
                  Next <ArrowRight />
                </Button>
              )}
            </motion.div>
          </form>
        </motion.div>
      </div>
    </PageContainer>
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
