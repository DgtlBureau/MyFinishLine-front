"use client";

import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface ChallengeCard {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  logo_url: string | null;
  price: number | null;
  total_distance: number;
  status: { id: number; name: string; type: string };
}

function ActiveCard({ ch }: { ch: ChallengeCard }) {
  return (
    <div className="relative w-full md:flex-1 rounded-2xl md:rounded-3xl overflow-hidden">
      {ch.image_url ? (
        <img src={ch.image_url} alt={ch.name} className="w-full h-auto block" />
      ) : (
        <div className="w-full aspect-[4/5] bg-gradient-to-br from-[#3B5CC6] to-[#4DA67A]" />
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {ch.logo_url && (
        <div className="absolute top-4 md:top-6 right-4 md:right-6 w-[100px] md:w-[150px]">
          <img
            src={ch.logo_url}
            alt={ch.name}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      <div className="absolute bottom-0 left-4 md:left-6 right-4 md:right-6 pb-4 md:pb-6">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg md:text-2xl text-white leading-6 md:leading-8">
                {ch.name}
              </h3>
              {ch.total_distance > 0 && (
                <span className="text-xs md:text-sm text-white/80 leading-5 md:leading-6">
                  {(ch.total_distance / 1000).toFixed(0)} km
                </span>
              )}
            </div>
            {ch.description && (
              <p className="text-xs md:text-sm text-white/80 leading-5 md:leading-6 max-w-[260px] line-clamp-2">
                {ch.description}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Link href={`/challenges/${ch.id}`}>
              <button className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-[#fafafa] bg-[#18181b] rounded-md hover:bg-[#27272a] transition-colors">
                Choose a Quest
                <ArrowRight size={14} className="md:w-4 md:h-4" />
              </button>
            </Link>
            {ch.price != null && ch.price > 0 && (
              <span className="font-semibold text-xl md:text-2xl text-white tracking-[-0.96px]">
                ${ch.price}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComingSoonCard({ ch }: { ch: ChallengeCard }) {
  return (
    <div className="relative w-full md:flex-1 rounded-2xl md:rounded-3xl overflow-hidden">
      {ch.image_url ? (
        <img
          src={ch.image_url}
          alt=""
          className="w-full h-auto block blur-sm scale-105"
        />
      ) : (
        <div className="w-full aspect-[4/5] bg-gradient-to-br from-[#5170D5] to-[#CEE9D8] blur-sm scale-105" />
      )}

      <div className="absolute inset-0 bg-white/30" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
          <Clock size={22} className="text-white/80" />
        </div>
        <span className="font-semibold text-lg text-white/90">Coming Soon</span>
        <span className="text-sm text-white/60">New quests are on the way</span>
      </div>
    </div>
  );
}

export default function CTA() {
  const [challenges, setChallenges] = useState<ChallengeCard[]>([]);

  useEffect(() => {
    axios
      .get("/api/challenges/list")
      .then(({ data }) => {
        if (Array.isArray(data)) setChallenges(data);
      })
      .catch(() => {});
  }, []);

  const active = challenges.filter((c) => c.status?.type === "active");
  const comingSoon = challenges.filter(
    (c) => c.status?.type === "coming_soon",
  );

  // Show max 2 cards: prioritize active first, then coming_soon
  const cards: { ch: ChallengeCard; type: "active" | "coming_soon" }[] = [];
  for (const ch of active) {
    if (cards.length >= 2) break;
    cards.push({ ch, type: "active" });
  }
  for (const ch of comingSoon) {
    if (cards.length >= 2) break;
    cards.push({ ch, type: "coming_soon" });
  }
  // If we still have room, fill with a generic coming soon placeholder
  if (cards.length === 1) {
    cards.push({
      ch: {
        id: 0,
        name: "Coming Soon",
        description: null,
        image_url: null,
        logo_url: null,
        price: null,
        total_distance: 0,
        status: { id: 0, name: "Coming Soon", type: "coming_soon" },
      },
      type: "coming_soon",
    });
  }

  if (cards.length === 0) return null;

  return (
    <section
      id="level-up"
      className="flex flex-col items-center py-12 md:py-24 w-full"
      style={{
        background:
          "linear-gradient(to bottom, white 18%, #b4c6ff 74%, white 100%)",
      }}
    >
      <div className="max-w-[1280px] px-4 md:px-8 w-full">
        <div className="flex flex-col gap-8 md:gap-12 items-center">
          <h2 className="font-semibold text-2xl sm:text-3xl md:text-[48px] tracking-[-1px] md:tracking-[-1.92px] text-black leading-tight md:leading-none text-center">
            Level Up Your
            <br />
            Sports Experience
          </h2>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
            {cards.map(({ ch, type }) =>
              type === "active" ? (
                <ActiveCard key={ch.id} ch={ch} />
              ) : (
                <ComingSoonCard key={ch.id || "coming-soon"} ch={ch} />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
