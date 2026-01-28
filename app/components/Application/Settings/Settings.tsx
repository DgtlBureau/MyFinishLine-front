"use client";

import SettingSection from "@/app/components/Application/Settings/SettingSection/SettingSection";
import SettingItem from "@/app/components/Application/Settings/SettingItem/SettingItem";
import LanguageBottomSheet from "@/app/components/Application/Settings/LanguageBottomSheet/LanguageBottomSheet";
import { Shield, Globe, LogOut, Mail, User, UserCog, Ruler } from "lucide-react";
import { Separator } from "@/app/components/ui/separator";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import Integrations from "../Integrations/Integrations";
import axios from "axios";
import { useAppDispatch } from "@/app/lib/hooks";
import { clearUser } from "@/app/lib/features/user/userSlice";
import { useMeasure } from "@/app/hooks/useMeasure";
import { useTranslation } from "@/app/contexts/LanguageContext";
import { MeasureUnit } from "@/app/types/user";

const Settings = () => {
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [isChangingMeasure, setIsChangingMeasure] = useState(false);
  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { measure, setMeasure } = useMeasure();
  const { language, setLanguage, getCurrentLanguage, languages, t } = useTranslation();

  const handleGoTo = (link: string) => {
    router.push(link);
  };

  const handleChangeMeasure = async (newMeasure: MeasureUnit) => {
    if (newMeasure === measure || isChangingMeasure) return;
    setIsChangingMeasure(true);
    const success = await setMeasure(newMeasure);
    setIsChangingMeasure(false);
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
      <SettingSection title={t.settings.account} delay={1}>
        <SettingItem
          icon={<User className="w-4 h-4" />}
          label={t.settings.editAccount}
          description={t.settings.editAccountDesc}
          onClick={() => handleGoTo("/app/profile/settings/edit-account")}
          delay={1}
        />
        <SettingItem
          icon={<UserCog className="w-4 h-4" />}
          label={t.settings.customizeProfile}
          description={t.settings.customizeProfileDesc}
          onClick={() => handleGoTo("/app/profile/settings/personalization")}
          delay={1}
        />
        <Integrations />
      </SettingSection>

      <Separator className="my-6 bg-border" />

      <SettingSection title={t.settings.security} delay={2}>
        <SettingItem
          icon={<Shield className="w-4 h-4" />}
          label={t.settings.password}
          description={t.settings.passwordDesc}
          delay={2}
        />
      </SettingSection>

      <Separator className="my-6 bg-border" />

      <SettingSection title={t.settings.preferences} delay={3}>
        <SettingItem
          icon={<Globe className="w-4 h-4" />}
          label={t.settings.language}
          type="info"
          value={getCurrentLanguage().nativeName}
          onClick={() => setIsLanguageSheetOpen(true)}
          delay={3}
        />
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 * 0.03, duration: 0.2 }}
          className="flex items-center justify-between py-3 rounded-md"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-icon-muted shrink-0">
              <Ruler className="w-4 h-4" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {t.settings.distanceUnit}
              </p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {t.settings.distanceUnitDesc}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => handleChangeMeasure("km")}
              disabled={isChangingMeasure}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                measure === "km"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              km
            </button>
            <button
              onClick={() => handleChangeMeasure("mile")}
              disabled={isChangingMeasure}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                measure === "mile"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              mi
            </button>
          </div>
        </motion.div>
      </SettingSection>

      <Separator className="my-6 bg-border" />

      <SettingSection title={t.settings.notifications} delay={4}>
        <SettingItem
          icon={<Mail className="w-4 h-4" />}
          label={t.settings.emailUpdates}
          description={t.settings.emailUpdatesDesc}
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
          label={t.settings.signOut}
          onClick={handleLogout}
          delay={5}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs text-muted-foreground text-center mt-2"
        >
          {t.settings.version} 1.0.0
        </motion.p>
      </motion.div>

      <LanguageBottomSheet
        isOpen={isLanguageSheetOpen}
        onClose={() => setIsLanguageSheetOpen(false)}
        languages={languages}
        currentLanguage={language}
        onSelectLanguage={setLanguage}
      />
    </>
  );
};

export default Settings;
