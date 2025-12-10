"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import RedeemInput from "@/app/components/Shared/RedeemInput/RedeemInput";

import "flag-icons/css/flag-icons.min.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const countries = [
  { id: 1, name: "Russian Federation", flag: <span className="fi fi-ru" /> },
  { id: 2, name: "Belarus", flag: <span className="fi fi-by" /> },
  { id: 3, name: "Kazakhstan", flag: <span className="fi fi-kz" /> },
  { id: 4, name: "Armenia", flag: <span className="fi fi-am" /> },
  { id: 5, name: "United States", flag: <span className="fi fi-us" /> },
  { id: 6, name: "Canada", flag: <span className="fi fi-ca" /> },
  { id: 7, name: "United Kingdom", flag: <span className="fi fi-gb" /> },
  { id: 8, name: "Germany", flag: <span className="fi fi-de" /> },
  { id: 9, name: "France", flag: <span className="fi fi-fr" /> },
  { id: 10, name: "Spain", flag: <span className="fi fi-es" /> },
  { id: 11, name: "Italy", flag: <span className="fi fi-it" /> },
  { id: 12, name: "Netherlands", flag: <span className="fi fi-nl" /> },
  { id: 13, name: "Australia", flag: <span className="fi fi-au" /> },
  { id: 14, name: "Japan", flag: <span className="fi fi-jp" /> },
];

const Redeem = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    shippingCountry: "",
    zip: "",
    address: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Medal claimed! Your medal is on its way.");
    router.push("/myfinishline/profile/journey");

    setIsSubmitting(false);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-semibold text-foreground">
          Congratulations!
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          You have completed your challenge, now claim your medal!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <RedeemInput
            id="fullName"
            label="Full name"
            placeholder="Pedro Duarte"
            delay={0}
            value={formData.fullName}
            onChange={handleChange}
          />

          <RedeemInput
            id="mobileNumber"
            label="Mobile number"
            placeholder="Shipping mobile number"
            delay={0.15}
            value={formData.mobileNumber}
            onChange={handleChange}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium text-foreground">
              Shipping Country
            </label>
            <div className="mt-2">
              <Select
                value={formData.shippingCountry}
                onValueChange={(value) => {
                  setFormData({ ...formData, shippingCountry: value });
                }}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.name}>
                      {country.flag}
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <RedeemInput
            id="zip"
            label="Zip"
            placeholder="Zip code"
            delay={0.25}
            value={formData.zip}
            onChange={handleChange}
          />

          <RedeemInput
            id="address"
            label="Address"
            placeholder="Address"
            delay={0.3}
            value={formData.address}
            onChange={handleChange}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex gap-3 mt-2"
          >
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Claiming..." : "Claim medal"}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default Redeem;
