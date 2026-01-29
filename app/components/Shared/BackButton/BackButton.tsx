"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute left-0 pl-4 flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-all duration-200 active:scale-90 active:opacity-70 cursor-pointer"
    >
      <ArrowLeft size={16} />
      Back
    </button>
  );
}
