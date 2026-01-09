"use client";

import SettingSection from "@/app/components/Application/Settings/SettingSection/SettingSection";
import SettingItem from "@/app/components/Application/Settings/SettingItem/SettingItem";
import { Shield, Globe, LogOut, Mail, User } from "lucide-react";
import { Separator } from "@/app/components/ui/separator";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import Integrations from "../Integrations/Integrations";
import axios from "axios";
import { useAppDispatch } from "@/app/lib/hooks";
import { clearUser } from "@/app/lib/features/user/userSlice";

const Settings = () => {
  const [emailUpdates, setEmailUpdates] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleGoTo = (link: string) => {
    router.push(link);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      dispatch(clearUser());
      await localStorage.removeItem("persist:root");
      router.replace("/");
      dispatch;
    } catch (error) {
      console.error("Error logging out: ", error);
    }
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
        <div className="px-2">
          <Integrations />
        </div>
      </SettingSection>

      <Separator className="my-6 bg-border" />

      <SettingSection title="Security" delay={2}>
        <SettingItem
          icon={<Shield className="w-4 h-4" />}
          label="Password"
          description="Change your account password"
          delay={2}
        />
      </SettingSection>

      <Separator className="my-6 bg-border" />

      <SettingSection title="Preferences" delay={3}>
        <SettingItem
          icon={<Globe className="w-4 h-4" />}
          label="Language"
          type="info"
          value="English"
          onClick={() => {}}
          delay={3}
        />
      </SettingSection>

      <Separator className="my-6 bg-border" />

      <SettingSection title="Notifications" delay={4}>
        <SettingItem
          icon={<Mail className="w-4 h-4" />}
          label="Email updates"
          description="Weekly digest and announcements"
          type="toggle"
          value={emailUpdates}
          onToggle={setEmailUpdates}
          delay={4}
        />
      </SettingSection>

      <Separator className="my-6 bg-border" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.25 }}
      >
        <SettingItem
          icon={<LogOut className="w-4 h-4" />}
          label="Sign out"
          onClick={handleLogout}
          delay={5}
        />
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
