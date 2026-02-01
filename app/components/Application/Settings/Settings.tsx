"use client";

import SettingSection from "@/app/components/Application/Settings/SettingSection/SettingSection";
import SettingItem from "@/app/components/Application/Settings/SettingItem/SettingItem";
import LanguageBottomSheet from "@/app/components/Application/Settings/LanguageBottomSheet/LanguageBottomSheet";
import { Shield, Globe, LogOut, User, UserCog, Ruler } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import Integrations from "../Integrations/Integrations";
import axios from "axios";
import { useAppDispatch } from "@/app/lib/hooks";
import { clearUser, updateUserMeasure } from "@/app/lib/features/user/userSlice";
import { useMeasure } from "@/app/hooks/useMeasure";
import { useTranslation } from "@/app/contexts/LanguageContext";
import { MeasureUnit } from "@/app/types/user";

const Settings = () => {
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
    const previousMeasure = measure;
    dispatch(updateUserMeasure(newMeasure));
    try {
      const formData = new FormData();
      formData.append("measure", newMeasure);
      const response = await axios.post("/api/user/update-user", formData);
      if (response.status !== 200) {
        dispatch(updateUserMeasure(previousMeasure));
      }
    } catch (error) {
      console.error("Error updating measure:", error);
      dispatch(updateUserMeasure(previousMeasure));
    } finally {
      setIsChangingMeasure(false);
    }
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

  const handleDistanceUnitChange = async (unit: "km" | "mile") => {
    const previousUnit = measure;
    dispatch(updateUserMeasure(unit));

    try {
      const formData = new FormData();
      formData.append("measure", unit);

      const response = await axios.post("/api/user/update-user", formData);

      if (response.status !== 200) {
        dispatch(updateUserMeasure(previousUnit));
      }
    } catch (error) {
      console.error("Error updating distance unit: ", error);
      dispatch(updateUserMeasure(previousUnit));
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
      </SettingSection>

      <SettingSection title={t.settings.security} delay={2}>
        <SettingItem
          icon={<Shield className="w-4 h-4" />}
          label={t.settings.password}
          description={t.settings.passwordDesc}
          onClick={() => handleGoTo("/app/profile/settings/change-password")}
          delay={2}
        />
      </SettingSection>

      <SettingSection title="Integrations" delay={3}>
        <Integrations />
      </SettingSection>

      <SettingSection title={t.settings.preferences} delay={4}>
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
            <span className="text-white/70 shrink-0">
              <Ruler className="w-4 h-4" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {t.settings.distanceUnit}
              </p>
              <p className="text-xs text-white/60 truncate mt-0.5">
                {t.settings.distanceUnitDesc}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white/30 backdrop-blur-xl rounded-lg p-1 border border-white/40">
            <button
              onClick={() => handleChangeMeasure("km")}
              disabled={isChangingMeasure}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                measure === "km"
                  ? "bg-white/80 text-[#09090B] shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              km
            </button>
            <button
              onClick={() => handleChangeMeasure("mile")}
              disabled={isChangingMeasure}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                measure === "mile"
                  ? "bg-white/80 text-[#09090B] shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              mi
            </button>
          </div>
        </motion.div>
      </SettingSection>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.25 }}
        className="bg-white/10 backdrop-blur-xl backdrop-saturate-200 rounded-2xl border border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] p-3"
      >
        <SettingItem
          icon={<LogOut className="w-4 h-4" />}
          label={t.settings.signOut}
          onClick={handleLogout}
          delay={5}
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs text-white/60 text-center mt-4"
      >
        {t.settings.version} 1.0.0
      </motion.p>

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
