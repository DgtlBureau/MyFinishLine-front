"use client";

import PersonalizationList from "@/app/components/PersonalizationList/PersonalizationList";
import PersonalizationSkeleton from "@/app/components/PersonalizationList/PersonalizationSkeleton";
import { updateUser } from "@/app/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import {
  getUserFrames,
  getUserBanners,
  getUserSkins,
  getUserCards,
} from "@/app/lib/utils/userService";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "react-toastify";

import { logger } from "@/app/lib/logger";
type Tab = "frames" | "banners" | "skins" | "cards";

const tabs: { id: Tab; name: string }[] = [
  { id: "frames", name: "Frames" },
  { id: "banners", name: "Banners" },
  { id: "skins", name: "Skins" },
  { id: "cards", name: "Cards" },
];

const emptyMessages: Record<Tab, string> = {
  frames: "No frames available",
  banners: "No banners available",
  skins: "No skins available",
  cards: "No cards available",
};

// Cards are view-only (cannot be used for customization)
const viewOnlyTabs: Tab[] = ["cards"];

const PersonalizationPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("frames");
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const fetchMap: Record<Tab, () => Promise<any>> = {
    frames: getUserFrames,
    banners: getUserBanners,
    skins: getUserSkins,
    cards: getUserCards,
  };

  const handleLoad = async (tab: Tab) => {
    setIsLoading(true);
    try {
      const data = await fetchMap[tab]();
      setItems(data.data);
    } catch (error) {
      logger.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedIdMap: Record<Tab, number | undefined> = {
    frames: user.selected_frame?.id,
    banners: user.selected_banner?.id,
    skins: user.selected_skin?.id,
    cards: undefined, // Cards are view-only
  };

  const isViewOnly = viewOnlyTabs.includes(activeTab);

  const handleSetActive = async (item: {
    id: number;
    title: string;
    image_url: string | null;
    description: string;
  }) => {
    // Skip if this is a view-only tab
    if (isViewOnly) return;

    const updateKeyMap: Record<Tab, string> = {
      frames: "selected_frame",
      banners: "selected_banner",
      skins: "selected_skin",
      cards: "", // Not used
    };
    const cosmeticsKeyMap: Record<Tab, string> = {
      frames: "contracts_frame_id",
      banners: "contracts_banner_id",
      skins: "contracts_skin_id",
      cards: "", // Not used
    };

    const updateKey = updateKeyMap[activeTab];
    const cosmeticsKey = cosmeticsKeyMap[activeTab];
    const savedValue = user[updateKey as keyof typeof user];

    try {
      dispatch(updateUser({ [updateKey]: item }));
      await axios.post("/api/user/update-cosmetics", {
        [cosmeticsKey]: item.id,
      });
    } catch (error) {
      toast.error(`Error updating ${activeTab.slice(0, -1)}`);
      dispatch(updateUser({ [updateKey]: savedValue }));
      logger.log(error);
    }
  };

  useEffect(() => {
    handleLoad(activeTab);
  }, [activeTab]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-2 flex items-center gap-1 overflow-hidden bg-white/40 backdrop-blur-xl backdrop-saturate-200 rounded-2xl border border-white/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] p-1"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className="flex-1 p-2 py-2.5 text-sm text-center relative text-[#1a1a2e] rounded-xl cursor-pointer"
              onClick={() => setActiveTab(tab.id)}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-white/60 rounded-xl shadow-sm"
                  layoutId="personalization"
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                  }}
                />
              )}
              <span
                className={`${
                  isActive ? "font-semibold" : "font-medium text-[#1a1a2e]/70"
                } relative z-10 text-sm leading-5 flex items-center justify-center gap-1.5 transition-all`}
              >
                {tab.name}
              </span>
            </button>
          );
        })}
      </motion.nav>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PersonalizationSkeleton />
          </motion.div>
        ) : items.length > 0 ? (
          <motion.div
            key={`content-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <PersonalizationList
              type={activeTab}
              items={items}
              handleSelectItem={handleSetActive}
              selectedId={selectedIdMap[activeTab]}
              viewOnly={isViewOnly}
            />
          </motion.div>
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
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
              </svg>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xl font-semibold text-white/90">
                {emptyMessages[activeTab]}
              </p>
              <p className="text-base text-white/60 text-center max-w-[280px]">
                Complete contracts to unlock customization items
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PersonalizationPage;
