"use client";

import { Input } from "@/app/components/ui/input";
import { motion } from "motion/react";
import { Trophy } from "lucide-react";

const fakeArray = [1, 2, 3, 4];

const textMotion = {
  rest: {
    opacity: 0,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    opacity: 1,
    y: -30,
    transition: {
      duration: 0.5,
    },
  },
};

const iconMotion = {
  rest: {
    y: 0,
    transition: {
      duration: 0.5,
      stiffness: 100,
    },
  },
  hover: {
    y: -10,
    transition: {
      duration: 0.5,
      stiffness: 100,
    },
  },
};

const blockMotion = {
  rest: {
    backdropFilter: "blur(0px)",
    transition: {
      duration: 0.5,
      stiffness: 100,
    },
  },
  hover: {
    backdropFilter: "blur(12px)",
    transition: {
      duration: 0.5,
      stiffness: 100,
    },
  },
};

const page = () => {
  return (
    <div>
      <h3 className="mt-4 text-2xl">Account info</h3>
      <Input className="mt-2" placeholder="Name" />
      <Input className="mt-2" placeholder="Email" />
      <h3 className="mt-4">Account created</h3>
      <span>28.11.2025</span>
      <h3 className="mt-4 text-2xl">Achievements</h3>
      <ul className="flex gap-2 mt-2">
        {fakeArray.map((_, index) => (
          <motion.li
            key={index}
            initial="rest"
            whileHover="hover"
            exit="rest"
            className="h-20 shadow-2xl overflow-hidden rounded w-full bg-[url(/images/gradient.webp)] bg-cover bg-center bg-no-repeat dark:bg-[url(/images/gradient-dark.webp)]"
          >
            <motion.div
              variants={blockMotion}
              className="w-full h-full ease-in-out p-2 flex items-center justify-center"
            >
              <motion.div variants={iconMotion}>
                <Trophy
                  className="mx-auto"
                  width={36}
                  height={36}
                  color="gold"
                />
              </motion.div>
              <motion.span
                className="absolute w-full left-0 -bottom-7 text-center text-lg select-none italic font-light"
                variants={textMotion}
              >
                Best Runner
              </motion.span>
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default page;
