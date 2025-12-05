"use client";

import { Input } from "@/app/components/ui/input";
import useGetStravaUser from "@/app/hooks/useGetStravaUser";
import { motion } from "motion/react";

const page = () => {
  const { athlete } = useGetStravaUser();

  return (
    <div>
      <motion.h3
        className="mt-4 text-2xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Account info
      </motion.h3>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 * 0.05 }}
      >
        <Input
          className="mt-2"
          placeholder="Name"
          value={athlete.firstname + " " + athlete.lastname || ""}
          onChange={() => {}}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 * 0.05 }}
      >
        <Input
          className="mt-2"
          placeholder="Username"
          value={athlete.username || ""}
          onChange={() => {}}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 * 0.05 }}
      >
        <h3 className="mt-4">Account created</h3>
        <span>28.11.2025</span>
      </motion.div>
    </div>
  );
};

export default page;
