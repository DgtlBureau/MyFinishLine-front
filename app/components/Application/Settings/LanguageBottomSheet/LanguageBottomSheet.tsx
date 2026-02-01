"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/app/components/ui/drawer";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { Language, LanguageOption, useTranslation } from "@/app/contexts/LanguageContext";

interface LanguageBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  languages: LanguageOption[];
  currentLanguage: Language;
  onSelectLanguage: (language: Language) => void;
}

const LanguageBottomSheet = ({
  isOpen,
  onClose,
  languages,
  currentLanguage,
  onSelectLanguage,
}: LanguageBottomSheetProps) => {
  const { t } = useTranslation();

  const handleSelect = (code: Language) => {
    onSelectLanguage(code);
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh] bg-[#1a2a4a] border-white/20">
        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-white/30 mb-2 mt-4" />
        <DrawerHeader>
          <DrawerTitle className="text-center text-xl font-semibold text-white">
            {t.settings.selectLanguage}
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-8 overflow-y-auto">
          <ul className="space-y-2">
            {languages.map((lang, index) => {
              const isSelected = lang.code === currentLanguage;
              return (
                <motion.li
                  key={lang.code}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                      isSelected
                        ? "bg-white/15 border-2 border-white/40"
                        : "bg-white/5 border-2 border-transparent hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{lang.flag}</span>
                      <div className="text-left">
                        <p
                          className={`font-semibold ${
                            isSelected ? "text-white" : "text-white/80"
                          }`}
                        >
                          {lang.nativeName}
                        </p>
                        <p className="text-sm text-white/50">{lang.name}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-[#3B5CC6] flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default LanguageBottomSheet;
