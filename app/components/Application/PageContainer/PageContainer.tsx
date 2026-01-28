"use client";

import React, { ReactNode } from "react";
import { useTranslation } from "@/app/lib/i18n";

interface IPageContainerProps {
  title?: string;
  titleKey?: string;
  description?: string;
  descriptionKey?: string;
  children: ReactNode;
}

const PageContainer = ({
  children,
  title,
  titleKey,
  description,
  descriptionKey,
}: IPageContainerProps) => {
  const t = useTranslation();

  const displayTitle = titleKey ? t(titleKey) : title;
  const displayDescription = descriptionKey ? t(descriptionKey) : description;

  return (
    <div className="pt-14 ">
      <div className="pt-7 bg-linear-to-b from-[#C3B7E2] via-[#E9E0F6CC] via-80% to-[#FFFFFF]">
        <h2 className="font-bold text-3xl leading-9 text-[#09090B] text-center">
          {displayTitle}
        </h2>
        <p className="mt-4 text-center text-sm text-[#71717A]">{displayDescription}</p>
      </div>
      <section className="mt-4 max-w-4xl mx-auto">{children}</section>
    </div>
  );
};

export default PageContainer;
