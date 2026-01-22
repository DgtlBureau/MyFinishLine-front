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
      className="mb-8"
    >
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
        {title}
      </h2>
      <div className="space-y-0.5">{children}</div>
    </motion.div>
  );
};

export default SettingSection;
