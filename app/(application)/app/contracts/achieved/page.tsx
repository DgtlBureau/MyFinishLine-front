"use client";

import FeatureList from "@/app/components/Application/FeatureList/FeatureList";
import FeatureSkeleton from "@/app/components/Application/FeatureList/FeatureSkeleton";
import { IContract } from "@/app/types";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getUserContracts } from "@/app/lib/utils/userService";
import { toast } from "react-toastify";

const CACHE_KEY = "contracts_count_achieved";

const page = () => {
  const [contracts, setContracts] = useState<IContract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skeletonCount] = useState(() => {
    if (typeof window !== "undefined") {
      return Number(sessionStorage.getItem(CACHE_KEY)) || 4;
    }
    return 4;
  });

  const handleLoadContracts = async () => {
    setIsLoading(true);
    try {
      const data = await getUserContracts("completed");
      const sorted = [...data.data].sort((a: IContract, b: IContract) => b.id - a.id);
      setContracts(sorted);
      sessionStorage.setItem(CACHE_KEY, String(data.data.length));
    } catch (error: any) {
      toast.error("Error loading contracts: " + error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoadContracts();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div key="skeleton" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <FeatureSkeleton count={skeletonCount} />
        </motion.div>
      ) : contracts.length > 0 ? (
        <motion.section key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }} className="mt-2">
          <FeatureList features={contracts} />
        </motion.section>
      ) : (
        <motion.span key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="mt-2 block text-center text-neutral-400 text-md">
          No achieved contracts found
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default page;
