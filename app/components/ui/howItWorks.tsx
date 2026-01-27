import content from "@/app/lib/content/landing/content";
import Image from "next/image";

const steps = content.roadmap.steps;
const stepKeys = [1, 2, 3, 4] as const;

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white via-green-300/30 via-30% to-white-50">
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col justify-center gap-4 md:gap-7 md:text-center">
          <h2 className="text-2xl md:text-4xl text-center">
            {content.roadmap.title}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base text-center">
            {content.roadmap.description}
          </p>
        </div>
        <div className="mx-auto mt-8 md:mt-14 flex max-w-5xl flex-col lg:px-16">
          {stepKeys.map((key, index) => {
            const isFirst = index === 0;
            const isLast = index === stepKeys.length - 1;
            return (
              <div key={key} className="flex gap-3 md:gap-4">

                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={`w-[3px] flex-1 min-h-4 ${isFirst
                      ? "bg-gradient-to-b from-transparent to-primary opacity-70"
                      : "bg-primary opacity-70"
                      }`}
                  />
                  <span className="bg-[#65AE6A] border-[#e4e4e7] text-white flex size-8 md:size-10 shrink-0 items-center justify-center rounded-full border font-mono text-base md:text-lg my-1">
                    {key}
                  </span>
                  <div
                    className={`w-[3px] flex-1 min-h-4 ${isLast
                      ? "bg-gradient-to-t from-transparent to-primary opacity-70"
                      : "bg-primary opacity-70"
                      }`}
                  />
                </div>

                <div className="flex flex-col min-[960px]:flex-row min-[960px]:items-center min-[960px]:gap-10 flex-1 py-3 min-[960px]:py-4">
                  <div className="flex flex-col justify-center gap-3 min-[960px]:gap-6 min-[960px]:max-w-md min-[960px]:px-4">
                    <h3 className="text-lg md:text-xl min-[960px]:text-2xl">
                      {steps[key].title}
                    </h3>
                    <p className="text-muted-foreground text-sm min-[960px]:text-base">
                      {steps[key].description}
                    </p>
                  </div>
                  <div className="w-full mt-4 min-[960px]:mt-0 min-[960px]:w-[389px] shrink-0 relative flex flex-col rounded-2xl md:rounded-3xl overflow-hidden aspect-[398/320]">
                    <Image
                      src={steps[key].image}
                      alt={steps[key].title}
                      width={1000}
                      height={1000}
                      className="z-10 object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { HowItWorks };
