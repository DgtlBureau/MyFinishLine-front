"use client";

import { Medal, Target, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../../ui/button";
import Link from "next/link";

interface Award {
  id: number;
  title: string;
  description: string;
  icon: typeof Medal;
  claimed: boolean;
}

const awards: Award[] = [
  {
    id: 1,
    title: "@Atlantic challenge",
    description:
      "We travel from South Africa to Atlantica to find some treasures!",
    icon: Medal,
    claimed: false,
  },
  {
    id: 2,
    title: "@Marathon Master",
    description: "Complete your first full marathon distance in total runs.",
    icon: Trophy,
    claimed: true,
  },
  {
    id: 3,
    title: "@Weekly Warrior",
    description: "Run every day for a full week without missing a single day.",
    icon: Target,
    claimed: false,
  },
];

const AwardsList = () => {
  return (
    <div className="space-y-2">
      {awards.map((award, index) => (
        <motion.div
          key={award.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <award.icon className="w-5 h-5 text-foreground" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-foreground truncate">
              {award.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {award.description}
            </p>
          </div>

          <Link
            href="redeem"
            className={`shrink-0 text-xs p-2 px-4 rounded ${
              award.claimed
                ? "border-border text-muted-foreground"
                : "bg-foreground text-background hover:bg-foreground/90"
            }`}
          >
            {award.claimed ? "Claimed" : "Claim"}
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default AwardsList;
