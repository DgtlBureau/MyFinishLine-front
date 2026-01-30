"use client";

import FeatureList from "@/app/components/Application/FeatureList/FeatureList";
import FeatureSkeleton from "@/app/components/Application/FeatureList/FeatureSkeleton";
import { IContract } from "@/app/types";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getUserContracts } from "@/app/lib/utils/userService";
import { toast } from "react-toastify";


type Tab = "all" | "achieved" | "still-to-get";

const tabs: { id: Tab; name: string }[] = [
  { id: "all", name: "All" },
  { id: "achieved", name: "Achieved" },
  { id: "still-to-get", name: "Still to get" },
];

const emptyMessages: Record<Tab, string> = {
  all: "No contracts found",
  achieved: "No achieved contracts yet",
  "still-to-get": "No contracts to get",
};

const ContractsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("still-to-get");
  const [contracts, setContracts] = useState<IContract[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadContracts = async (tab: Tab) => {
    setIsLoading(true);
    try {
      const queryMap: Record<Tab, "" | "completed" | "not_completed"> = {
        all: "",
        achieved: "completed",
        "still-to-get": "not_completed",
      };
      const data = await getUserContracts(queryMap[tab]);
      const sorted = [...data.data].sort((a: IContract, b: IContract) => {
        if (tab === "all" && a.is_completed !== b.is_completed)
          return a.is_completed ? 1 : -1;
        return b.id - a.id;
      });
      setContracts(sorted);
    } catch (error: any) {
      toast.error(
        "Error loading contracts: " +
          (error?.response?.data?.message || error?.message || "Unknown error"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoadContracts(activeTab);
  }, [activeTab]);

  return (
    <>
      <nav className="mt-2 mx-4 flex items-center gap-1 p-2 overflow-hidden bg-white/40 backdrop-blur-xl backdrop-saturate-200 border border-white/50 rounded-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="flex-1 p-1 py-3 text-sm text-center relative text-foreground cursor-pointer"
            onClick={() => setActiveTab(tab.id)}
          >
            {activeTab === tab.id && (
              <motion.div
                className="absolute w-full h-full left-0 top-0 bg-white/60 backdrop-blur-md rounded-xl shadow-sm border border-white/30"
                layoutId="contracts-tab"
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 30,
                }}
              />
            )}
            <span
              className={`${
                activeTab === tab.id && "font-semibold transition-all"
              } relative z-10 text-sm leading-5 flex items-center justify-center gap-1.5`}
            >
              {tab.name}
            </span>
          </button>
        ))}
      </nav>

      <div className="px-4">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FeatureSkeleton count={4} />
            </motion.div>
          ) : contracts.length > 0 ? (
            <motion.section
              key={`content-${activeTab}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-2"
            >
              <FeatureList features={contracts} />
            </motion.section>
          ) : (
            <motion.div
              key={`empty-${activeTab}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center gap-5 min-h-[50vh]"
            >
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/60"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                  <path d="M14 2v6h6" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xl font-semibold text-white/90">
                  {emptyMessages[activeTab]}
                </p>
                <p className="text-base text-white/60 text-center max-w-[280px]">
                  Complete challenges to earn contracts and rewards
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ContractsPage;
