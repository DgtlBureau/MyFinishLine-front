import { motion } from "framer-motion";

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const SettingSection = ({
  title,
  children,
  delay = 0,
}: SettingSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.05, duration: 0.25 }}
      className="mb-6"
    >
      <h2 className="text-xs font-medium text-white/70 uppercase tracking-wider mb-2 px-1">
        {title}
      </h2>
      <div className="bg-white/40 backdrop-blur-xl backdrop-saturate-200 rounded-2xl border border-white/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] p-3 space-y-0.5">
        {children}
      </div>
    </motion.div>
  );
};

export default SettingSection;
