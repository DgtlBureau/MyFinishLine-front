"use client";

import Image from "next/image";
import Xarrow from "react-xarrows";

const challenge = {
  steps: [
    {
      id: 1,
      title: "Welcome to MyFinishLine",
      index: 1,
      completed: true,
    },
    {
      id: 2,
      title: "You first steps",
      index: 2,
    },
    {
      id: 3,
      title: "Almost there!",
      index: 1,
    },
    {
      id: 4,
      title: "Champion!",
      index: 2,
    },
  ],
};

const stepsAmount = challenge.steps.length || 1;

const randomize = () => {
  return Math.floor(Math.random() * (stepsAmount - 1 + 1)) + 1;
};

const page = () => {
  return (
    <main className="max-w-3xl mx-auto bg-foreground w-full min-h-[calc(100vh-72px)] relative flex flex-col">
      <Image
        objectFit="cover"
        src="/images/application/map.png"
        fill
        alt="Map"
      />
      <div
        style={{
          gridTemplateColumns: `repeat(${stepsAmount},1fr)`,
          gridTemplateRows: `repeat(${stepsAmount},1fr)`,
        }}
        className={`absolute p-2 h-full z-10 w-full grid gap-2 items-center justify-center`}
      >
        {challenge.steps.reverse().map((step) => {
          const array: any[] = [null, null, null, null];

          const currentStepId = `challenge-step-${step.id}`;
          const nextStepId =
            step.id > stepsAmount - 1 ? null : `challenge-step-${step.id + 1}`;

          array[step.index] = (
            <>
              <div
                id={`challenge-step-${step.id}`}
                key={step.id}
                className="bg-blue-300 shadow-2xl shadow-blue-900 h-15 w-15 rounded-full relative flex items-center justify-center cursos-pointer"
              >
                <div className="w-12 h-12 bg-blue-400 rounded-full"></div>
                <div className="absolute bottom-full">{step.title}</div>
              </div>
              {!!nextStepId && (
                <Xarrow
                  dashness
                  color="white"
                  start={currentStepId}
                  end={nextStepId}
                  showHead={false}
                />
              )}
            </>
          );

          return array.map((item) => {
            if (item) {
              return item;
            } else {
              return <div />;
            }
          });
        })}
      </div>
    </main>
  );
};

export default page;
