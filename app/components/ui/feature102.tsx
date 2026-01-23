import content from "@/app/lib/content/landing/content";

const steps = content.roadmap.steps;

const Feature102 = () => {
  return (
    <section id="how-it-works" className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col justify-center gap-7 md:text-center">
          <h2 className="text-2xl md:text-4xl">{content.roadmap.title}</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {content.roadmap.description}
          </p>
        </div>
        <div className="mx-auto mt-14 flex max-w-5xl flex-col gap-4 lg:px-16">
          <div className="flex flex-col items-center justify-between min-[960px]:flex-row min-[960px]:gap-10">
            <div className="flex gap-4 min-[960px]:max-w-md">
              <div className="flex flex-col items-center justify-between gap-1">
                <span className="h-20 shrink-0"></span>
                <span className="bg-[#65AE6A] border-[#e4e4e7] text-white flex size-10 shrink-0 items-center justify-center rounded-full border font-mono text-lg">
                  1
                </span>
                <span className="bg-linear-to-b to-primary h-20 w-[3px] shrink-0 from-transparent opacity-70"></span>
              </div>
              <div className="flex flex-col justify-center gap-5 px-0 min-[960px]:gap-6 min-[960px]:px-4 min-[960px]:py-4">
                <h3 className="text-xl min-[960px]:text-2xl">
                  {steps[1].title}
                </h3>
                <p className="text-muted-foreground text-sm min-[960px]:text-base">
                  {steps[1].description}
                </p>
              </div>
            </div>
            <img
              src={steps[1].image}
              alt="placeholder"
              className="z-10 aspect-video w-full rounded-xl border object-cover min-[960px]:max-h-56 min-[960px]:w-auto"
            />
          </div>
          <div className="flex flex-col items-center justify-between min-[960px]:flex-row min-[960px]:gap-10">
            <div className="flex gap-4 min-[960px]:max-w-md">
              <div className="relative flex flex-col items-center justify-between gap-1">
                <span className="bg-primary absolute -top-8 mx-auto h-8 w-[3px] shrink-0 opacity-70"></span>
                <span className="bg-primary absolute -bottom-8 mx-auto h-8 w-[3px] shrink-0 opacity-70"></span>
                <span className="bg-primary h-20 w-[3px] shrink-0 opacity-70"></span>
                <span className="bg-[#65AE6A] border-[#e4e4e7] text-white flex size-10 shrink-0 items-center justify-center rounded-full border font-mono text-lg">
                  2
                </span>
                <span className="bg-primary h-20 w-[3px] shrink-0 opacity-70"></span>
              </div>
              <div className="flex flex-col justify-center gap-5 px-0 min-[960px]:gap-6 min-[960px]:px-4 min-[960px]:py-4">
                <h3 className="text-xl min-[960px]:text-2xl">
                  {steps[2].title}
                </h3>

                <p className="text-muted-foreground text-sm min-[960px]:text-base">
                  {steps[2].description}
                </p>
              </div>
            </div>

            <img
              src={steps[2].image}
              alt="placeholder"
              className="z-10 max-h-56 w-full rounded-xl border object-cover min-[960px]:aspect-video min-[960px]:w-auto"
            />
          </div>
          <div className="flex flex-col items-center justify-between min-[960px]:flex-row min-[960px]:gap-10">
            <div className="flex gap-4 min-[960px]:max-w-md">
              <div className="relative flex flex-col items-center justify-between gap-1">
                <span className="bg-primary absolute -top-8 mx-auto h-8 w-[3px] shrink-0 opacity-70"></span>
                <span className="bg-primary absolute -bottom-8 mx-auto h-8 w-[3px] shrink-0 opacity-70"></span>
                <span className="bg-primary h-20 w-[3px] shrink-0 opacity-70"></span>
                <span className="bg-[#65AE6A] border-[#e4e4e7] text-white flex size-10 shrink-0 items-center justify-center rounded-full border font-mono text-lg">
                  3
                </span>
                <span className="bg-primary h-20 w-[3px] shrink-0 opacity-70"></span>
              </div>
              <div className="flex flex-col justify-center gap-5 px-0 min-[960px]:gap-6 min-[960px]:px-4 min-[960px]:py-4">
                <h3 className="text-xl min-[960px]:text-2xl">
                  {steps[3].title}
                </h3>

                <p className="text-muted-foreground text-sm min-[960px]:text-base">
                  {steps[3].description}
                </p>
              </div>
            </div>
            <img
              src={steps[3].image}
              alt="placeholder"
              className="z-10 max-h-56 w-full rounded-xl border object-cover min-[960px]:aspect-video min-[960px]:w-auto"
            />
          </div>
          <div className="flex flex-col items-center justify-between min-[960px]:flex-row min-[960px]:gap-10">
            <div className="flex gap-4 min-[960px]:max-w-md">
              <div className="flex flex-col items-center justify-between gap-1">
                <span className="bg-linear-to-t to-primary h-20 w-[3px] shrink-0 from-transparent opacity-70"></span>
                <span className="bg-[#65AE6A] border-[#e4e4e7] text-white flex size-10 shrink-0 items-center justify-center rounded-full border font-mono text-lg">
                  4
                </span>
                <span className="h-20 shrink-0"></span>
              </div>
              <div className="flex flex-col justify-center gap-5 px-0 min-[960px]:gap-6 min-[960px]:px-4 min-[960px]:py-4">
                <h3 className="text-xl min-[960px]:text-2xl">
                  {steps[4].title}
                </h3>

                <p className="text-muted-foreground text-sm min-[960px]:text-base">
                  {steps[4].description}
                </p>
              </div>
            </div>
            <img
              src={steps[4].image}
              alt="placeholder"
              className="z-10 max-h-56 w-full rounded-xl border object-cover min-[960px]:aspect-video min-[960px]:w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature102 };
