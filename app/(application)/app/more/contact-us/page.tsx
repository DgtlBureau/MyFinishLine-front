"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

const contactInfo = [
  {
    id: "1",
    icon: Mail,
    label: "Email",
    value: "hello@company.com",
  },
  {
    id: "2",
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
  },
  {
    id: "3",
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
  },
];

const page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-2 pb-8"
      >
        <h1 className="text-2xl font-semibold text-foreground">Contact Us</h1>
        <p className="text-sm text-muted-foreground mt-1">
          We'd love to hear from you
        </p>
      </motion.div>

      <div className="px-6 pb-8">
        <div className="flex flex-col gap-4">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-4 border border-border rounded-lg"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <item.icon className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-medium text-foreground">
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
