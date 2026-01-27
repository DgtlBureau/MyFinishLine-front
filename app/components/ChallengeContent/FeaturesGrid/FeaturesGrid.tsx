"use client";

import Noise from "@/app/components/Shared/Noise/noise";
import { ParticipationCard } from "./ParticipationCard/ParticipationCard";
import { participationContent } from "@/app/lib/content/landing/participation";

export default function FeaturesGrid() {
  return (
    <section id="features-grid" className="section-padding relative">
      <Noise />
      <div className="container">
        <div className="mx-auto max-w-5xl space-y-3 lg:space-y-4 lg:text-center">
          <h2 className="text-4xl tracking-tight lg:text-5xl text-center">
            Participation Is Open To Everyone
          </h2>
          <p className="text-muted-foreground text-lg leading-snug lg:text-balance text-center">
            Workout at your own pace. Suitable for all fitness levels. Choose the sports that suit you best.
          </p>
        </div>

        <div
          className="flex flex-col gap-8 mt-8"
        >
          {participationContent.map((feature, idx) => (
            <ParticipationCard key={idx} title={feature.title} subtitle={feature.subtitle} description={feature.description} image={feature.image} reverse={idx % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
