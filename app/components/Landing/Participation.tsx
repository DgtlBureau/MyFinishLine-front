"use client";

import { motion } from "framer-motion";

// Images - use local files
const imgYoungPeople = "/images/young-people.png";
const imgSportBeginners = "/images/sport-beginners.png";
const imgProfessionalAthlete = "/images/professional-athlete.png";
const imgFitnessEnthusiasts = "/images/fitness-enthusiasts.png";
const imgActiveAdults = "/images/active-adults.png";

const sections = [
  {
    title: "For Young people:",
    subtitle: " Move, explore, and become the hero of your own story",
    points: [
      "Turns physical activity into an immersive adventure, not a routine",
      "Progress unlocks new chapters, locations, and achievements",
      "Builds consistency and self-discipline through storytelling and gamification",
      "A global format that connects movement with curiosity and discovery",
    ],
    imagePosition: "left" as const,
    image: imgYoungPeople,
  },
  {
    title: "For Sport Beginners:",
    subtitle: " Start your journey at your own pace",
    points: [
      "No pressure — progress is personal",
      "Clear milestones make the first steps simple and motivating",
      "Designed to help build a habit, not chase performance",
      "Movement becomes part of a meaningful story, not an obligation",
    ],
    imagePosition: "right" as const,
    image: imgSportBeginners,
  },
  {
    title: "For Professional Athlete: ",
    subtitle: "Structure, motivation, and meaning beyond numbers",
    points: [
      "Adds narrative and emotional depth to daily training routines",
      "Works as a parallel motivation layer alongside professional programs",
      "Helps maintain consistency during off-season or recovery phases",
      "A new way to engage with sport beyond performance metrics",
    ],
    imagePosition: "left" as const,
    image: imgProfessionalAthlete,
  },
  {
    title: "For Fitness Enthusiasts:",
    subtitle: " Rediscover the joy of movement",
    points: [
      "Refreshes training routines with purpose and exploration",
      "Encourages long-term consistency through milestones and rewards",
      "Combines personal progress with a sense of global journey",
      "Makes everyday activity feel intentional and rewarding",
    ],
    imagePosition: "right" as const,
    image: imgFitnessEnthusiasts,
  },
  {
    title: "For Active Adults & Life-Experience Generation:",
    subtitle: " Move at your rhythm, enjoy the journey",
    points: [
      "Designed for flexible pace and personal comfort",
      "Encourages gentle, regular movement without pressure",
      "Provides motivation through storytelling, not competition",
      "A meaningful way to stay active, curious, and engaged",
    ],
    imagePosition: "left" as const,
    image: imgActiveAdults,
  },
];

export default function Participation() {
  return (
    <section id="about" className="bg-white flex flex-col items-center py-12 md:py-24 w-full">
      <div className="max-w-[1280px] px-4 md:px-8 w-full">
        {/* Header */}
        <div className="flex flex-col gap-2 md:gap-3 items-center mb-8 md:mb-16">
          <h2 className="font-semibold text-2xl sm:text-3xl md:text-[48px] tracking-[-1px] md:tracking-[-1.92px] text-black leading-tight md:leading-none text-center">
            Participation Is Open To Everyone
          </h2>
          <p className="font-normal text-sm md:text-base text-center text-[#71717a] leading-5 md:leading-6">
            Workout at your own pace. Suitable for all fitness levels. Choose the sports that suit you best.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-4 md:gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className={`flex flex-col md:flex-row items-center gap-0 md:gap-8 min-h-[400px] md:h-[512px] border border-[#b7b9e2] rounded-xl overflow-hidden ${
                section.imagePosition === "right" ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="w-full md:flex-1 h-[200px] md:h-full relative overflow-hidden">
                {"customImageStyle" in section && section.customImageStyle ? (
                  <img
                    src={section.image}
                    alt=""
                    className="absolute h-full md:h-[115%] w-full md:w-[177.5%] left-0 md:-left-[48.4%] top-0 md:-top-[0.14%] object-cover"
                  />
                ) : (
                  <img
                    src={section.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Text Content */}
              <div className="w-full md:flex-1 px-4 md:px-10 py-6 md:py-12 flex flex-col justify-center">
                <div className="flex flex-col gap-4 md:gap-6 max-w-[492px]">
                  <h3 className="font-semibold text-xl md:text-[30px] leading-6 md:leading-9">
                    <span
                      className="bg-clip-text"
                      style={{
                        backgroundImage: "linear-gradient(129deg, rgb(59, 85, 157) 0%, rgb(102, 175, 105) 101%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {section.title}
                    </span>
                    <span className="text-[#09090b]">{section.subtitle}</span>
                  </h3>
                  <ul className="list-disc ml-5 md:ml-7 space-y-0">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="text-sm md:text-lg text-[#71717a] leading-5 md:leading-7">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
