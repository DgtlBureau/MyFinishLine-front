import { cn } from "@/app/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import { Check, ImageOff } from "lucide-react";
import { useState } from "react";

interface IPersonalizationItemProps {
  index: number;
  id: number;
  image_url: string;
  title: string;
  type: "frames" | "skins" | "banners";
  description: string;
  isSelected: boolean;
  handlePressSelect: (item: {
    id: number;
    title: string;
    image_url: string;
    description: string;
  }) => void;
}

const PersonalizationItem = ({
  index,
  id,
  isSelected,
  title,
  image_url,
  description,
  type,
  handlePressSelect,
}: IPersonalizationItemProps) => {
  const [imageError, setImageError] = useState(false);

  const handleSelectSkin = () => {
    handlePressSelect({ id, title, image_url, description });
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleSelectSkin}
      className={cn(
        "relative rounded-2xl p-3 cursor-pointer transition-all duration-300 overflow-hidden",
        "bg-white/20 backdrop-blur-xl border shadow-lg",
        isSelected
          ? "border-white/80 shadow-[0_0_20px_rgba(255,255,255,0.3),inset_0_1px_0_0_rgba(255,255,255,0.6)] ring-2 ring-white/50"
          : "border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]"
      )}
    >
      {/* Glass overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 via-white/5 to-white/15 pointer-events-none" />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden z-10"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 2,
            delay: index * 0.3 + 1,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Selected glow */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 to-white/10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Selected checkmark */}
      {isSelected && (
        <motion.div
          className="absolute top-2 right-2 z-20 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/60"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Check className="w-4 h-4 text-[#7B9AE8]" strokeWidth={3} />
        </motion.div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <div className={cn(
          "rounded-xl p-2 transition-all duration-300 aspect-square flex items-center justify-center",
          isSelected ? "bg-white/40" : "bg-white/20"
        )}>
          {!imageError && image_url ? (
            <Image
              className={cn(
                "w-full h-full rounded-xl",
                type === "banners" ? "object-cover" : "object-contain",
              )}
              src={image_url}
              width={300}
              height={300}
              alt={title}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full rounded-xl bg-white/20 flex items-center justify-center">
              <Image
                src="/icons/myfinishline-placeholder.png"
                alt="MyFinishLine"
                width={120}
                height={36}
                className="opacity-40 object-contain"
              />
            </div>
          )}
        </div>
        <p className="mt-2 font-medium text-sm text-white/80 text-center">
          {title}
        </p>
      </div>
    </motion.li>
  );
};

export default PersonalizationItem;
