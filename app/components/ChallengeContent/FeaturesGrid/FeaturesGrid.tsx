"use client";

import Image from "next/image";

import Noise from "@/app/components/Shared/Noise/noise";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { cn } from "@/app/lib/utils";
import content from "@/app/lib/content/landing/content";

const FEATURES_DATA = content.grid_block.features;

export default function FeaturesGrid() {
  return (
    <section id="features-grid" className="section-padding relative">
      <Noise />
      <div className="container">
        {/* Section Header */}
        <div className="mx-auto max-w-5xl space-y-3 lg:space-y-4 lg:text-center">
          <h2 className="text-4xl tracking-tight lg:text-5xl">
            {content.grid_block.title}{" "}
          </h2>
          <p className="text-muted-foreground text-lg leading-snug lg:text-balance">
            {content.grid_block.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-8 grid grid-cols-1 gap-2 lg:mt-12 lg:grid-cols-6">
          {FEATURES_DATA.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  className?: string;
  width: number;
  height: number;
}

function FeatureCard({
  image,
  imageAlt,
  title,
  description,
  className,
  width,
  height,
}: FeatureCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      {/* Image Section */}
      <CardContent>
        <div className="overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={imageAlt}
            width={width}
            height={height}
            className="w-full object-cover"
          />
        </div>
      </CardContent>

      {/* Content Section */}
      <CardHeader>
        <CardTitle className="text-xl leading-tight font-semibold">
          {title}
        </CardTitle>
        <p className="text-muted-foreground/70 leading-relaxed">
          {description}
        </p>
      </CardHeader>
    </Card>
  );
}
