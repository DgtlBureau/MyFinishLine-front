"use client";

import SettingSection from "@/app/components/Application/Settings/SettingSection/SettingSection";
import SettingItem from "@/app/components/Application/Settings/SettingItem/SettingItem";
import { Shield, Globe, LogOut, Mail, User, UserCog, Route, Check } from "lucide-react";
import { Separator } from "@/app/components/ui/separator";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import Integrations from "../Integrations/Integrations";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { clearUser, setDistanceUnit } from "@/app/lib/features/user/userSlice";
import { useI18n, Locale } from "@/app/lib/i18n";
import SheetContainer from "@/app/components/SheetContainer/SheetContainer";

const languageOptions: { value: Locale; label: string; flag: string }[] = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "ru", label: "Русский", flag: "🇷🇺" },
];

const Settings = () => {
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const measure = user.measure || "km";
  const { locale, setLocale } = useI18n();

  const currentLanguage = languageOptions.find((l) => l.value === locale);

  const handleLanguageSelect = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsLanguageSheetOpen(false);
  };

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

  const handleDistanceUnitChange = async (unit: "km" | "mile") => {
    const previousUnit = measure;
    dispatch(setDistanceUnit(unit));

    try {
      const formData = new FormData();
      formData.append("measure", unit);

      const response = await axios.post("/api/user/update-user", formData);

      if (response.status !== 200) {
        dispatch(setDistanceUnit(previousUnit));
      }
    } catch (error) {
      console.error("Error updating distance unit: ", error);
      dispatch(setDistanceUnit(previousUnit));
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
        <SettingItem
          icon={<UserCog className="w-4 h-4" />}
          label="Customize profile"
          description="Customize your profile visuals"
          onClick={() => handleGoTo("/app/profile/settings/personalization")}
          delay={1}
        />
        <Integrations />
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
          value={`${currentLanguage?.flag} ${currentLanguage?.label}`}
          onClick={() => setIsLanguageSheetOpen(true)}
          delay={3}
        />
        <SettingItem
          icon={<Route className="w-4 h-4" />}
          label="Distance unit"
          description="Choose your preferred distance measurement"
          type="segment"
          value={measure}
          onToggle={(value) => handleDistanceUnitChange(value as "km" | "mile")}
          segmentOptions={[
            { value: "km", label: "km" },
            { value: "mile", label: "mi" },
          ]}
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

      <SheetContainer
        isOpen={isLanguageSheetOpen}
        onClose={() => setIsLanguageSheetOpen(false)}
      >
        <div className="p-4 pb-8 max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-center mb-4">Select Language</h3>
          <div className="flex flex-col gap-1">
            {languageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleLanguageSelect(option.value)}
                className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                  locale === option.value
                    ? "bg-[#F4F4F5]"
                    : "bg-white hover:bg-[#F4F4F5]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{option.flag}</span>
                  <span className="text-sm">{option.label}</span>
                </div>
                {locale === option.value && (
                  <Check className="w-4 h-4 text-[#71717A]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </SheetContainer>
    </>
  );
};

export default Settings;
