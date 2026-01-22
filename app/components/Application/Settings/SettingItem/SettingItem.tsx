import { Switch } from "@/app/components/ui/switch";
import { cn } from "@/app/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface SettingItemProps {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  type?: "link" | "toggle" | "info";
  value?: boolean | string;
  onToggle?: (value: boolean) => void;
  onClick?: () => void;
  delay?: number;
}

const SettingItem = ({
  icon,
  label,
  description,
  type = "link",
  value,
  onToggle,
  onClick,
  delay = 0,
}: SettingItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.03, duration: 0.2 }}
      className={cn(
        "flex items-center justify-between py-3 rounded-md transition-colors group hover:bg-[hsl(var(--setting-hover))] active:bg-[hsl(var(--setting-active))]",
        type !== "toggle" && onClick && "cursor-pointer",
      )}
      onClick={type !== "toggle" ? onClick : undefined}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {icon && <span className="text-icon-muted shrink-0">{icon}</span>}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {label}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {type === "toggle" && (
          <Switch checked={value as boolean} onCheckedChange={onToggle} />
        )}
        {type === "info" && typeof value === "string" && (
          <span className="text-sm text-muted-foreground">{value}</span>
        )}
        {type === "link" && (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
    </motion.div>
  );
};

export default SettingItem;
