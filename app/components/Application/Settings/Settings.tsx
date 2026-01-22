"use client";

import SettingSection from "@/app/components/Application/Settings/SettingSection/SettingSection";
import SettingItem from "@/app/components/Application/Settings/SettingItem/SettingItem";
import { Shield, User, UserCog } from "lucide-react";
import { Separator } from "@/app/components/ui/separator";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Integrations from "../Integrations/Integrations";

const Settings = () => {
  const router = useRouter();

  const handleGoTo = (link: string) => {
    router.push(link);
  };

  return (
    <>
      <SettingSection title="Account" delay={1}>
        <SettingItem
          icon={<User className="w-4 h-4" />}
          label="Edit account"
          description="Edit your account information"
          onClick={() => handleGoTo("/app/profile/settings/edit-account")}
          delay={1}
        />
        <SettingItem
          icon={<UserCog className="w-4 h-4" />}
          label="Customize profile"
          description="Customize your profile visuals"
          onClick={() => handleGoTo("/app/profile/settings/personalization")}
          delay={1}
        />
      </SettingSection>

      <Separator className="my-6 bg-border" />

      <SettingSection title="Integrations" delay={2}>
        <div className="px-2 py-3">
          <Integrations />
        </div>
      </SettingSection>

      <Separator className="my-6 bg-border" />

      <SettingSection title="Security" delay={3}>
        <SettingItem
          icon={<Shield className="w-4 h-4" />}
          label="Password"
          description="Change your account password"
          delay={2}
        />
      </SettingSection>

      <Separator className="my-6 bg-border" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.25 }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs text-muted-foreground text-center mt-2"
        >
          Version 1.0.0
        </motion.p>
      </motion.div>
    </>
  );
};

export default Settings;
