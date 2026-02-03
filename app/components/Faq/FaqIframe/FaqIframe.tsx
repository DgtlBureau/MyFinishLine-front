"use client";

import { useEffect } from "react";
import { faqData } from "@/app/data/faqData";
import { FaqAccordion } from "../FaqAccordion/Accordion";

interface IFaqComponentProps {
  category?: string;
}

const filteredData = faqData.filter((item) => item.isVisible === true);

const faqCategories = filteredData.map((el) => el.category);

export const FaqShortComponent = ({ category }: IFaqComponentProps) => {
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const sendHeight = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ iframeHeight: height }, "*");
    };

    const updateHeightAfterAnimation = () => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        sendHeight();
      }, 320);
    };

    updateHeightAfterAnimation();

    const resizeObserver = new ResizeObserver(() => {
      updateHeightAfterAnimation();
    });

    resizeObserver.observe(document.body);

    return () => {
      if (timer) clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, []);
  const data =
    category && faqCategories.includes(category)
      ? faqData.find((item) => item.category === category)?.variants.slice(0, 4)
      : faqData[0].variants.slice(0, 5);

  return (
    <div className="flex w-full flex-col gap-12">
      <FaqAccordion items={data || []} search={""} />
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-white bg-white/20 rounded-md px-4 py-1 text-center text-sm font-semibold">
          Any questions?
        </p>
        <p className="text-center text-2xl font-medium text-white/80">
          Do you have any questions?
        </p>
        <span className="text-center text-sm text-white/60">
          If you cannot find the answer to your question in the FAQ, please
          contact us. We will respond promptly!
        </span>
        <a
          href={`/faq`}
          target="_parent"
          className="bg-white/15 backdrop-blur-xl border border-white/30 text-white rounded-md px-4 py-2 font-medium duration-300 hover:bg-white/25 hover:scale-105"
        >
          Go
        </a>
      </div>
    </div>
  );
};
