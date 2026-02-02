const guaranteeBadge = "/images/money-back-badge.svg";

const testimonials = [
  {
    name: "Maria Garcia",
    role: "Corredora Amateur",
    quote: "MyFinishLine cambio mi forma de entrenar! Ahora cada kilometro es una aventura emocionante.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "James Thompson",
    role: "Marathon Runner",
    quote: "The gamification aspect keeps me motivated. I've completed 3 quests and earned amazing medals!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Sophie Dubois",
    role: "Passionnee de Fitness",
    quote: "Une application geniale! Les quetes virtuelles m'ont aidee a rester constante dans mon entrainement.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Carlos Rodriguez",
    role: "Triatleta",
    quote: "Perfecto para mantener la motivacion durante el entrenamiento. Las recompensas son increibles.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Emma Williams",
    role: "Fitness Coach",
    quote: "I recommend MyFinishLine to all my clients. It makes fitness fun and goal-oriented!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Pierre Martin",
    role: "Cycliste",
    quote: "Les parcours virtuels sont fantastiques. J'ai decouvert l'Amazonie tout en pedalant chez moi!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
];

function TestimonialCard({ testimonial }: { testimonial: { name: string; role: string; quote: string; avatar: string } }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-10 shadow-sm flex-shrink-0 w-[360px] md:w-[480px] min-h-[180px] md:min-h-[220px]">
      <div className="flex gap-4 md:gap-5 items-center pb-5 md:pb-6">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0">
          <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col text-base md:text-lg text-white/60">
          <span className="font-medium leading-6 md:leading-7 text-white/80">{testimonial.name}</span>
          <span className="font-normal leading-6 md:leading-7">{testimonial.role}</span>
        </div>
      </div>
      <p className="font-normal text-lg md:text-xl text-white/90 leading-7 md:leading-8">
        &quot;{testimonial.quote}&quot;
      </p>
    </div>
  );
}

export default function Testimonials() {
  // Split testimonials into two rows
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3, 6);

  return (
    <section
      id="blog"
      className="flex flex-col items-center py-12 md:py-24 w-full overflow-hidden"
    >
      <div className="w-full">
        <div className="flex flex-col gap-8 md:gap-[60px] items-center">
          {/* Header */}
          <div className="flex flex-col gap-2 md:gap-3 items-center w-full px-4 md:px-8">
            <div className="pb-1 md:pb-2 w-full">
              <h2 className="font-semibold text-2xl sm:text-3xl md:text-[48px] text-center tracking-[-1px] md:tracking-[-1.92px] text-white leading-tight md:leading-none">
                Trusted by athletes worldwide
              </h2>
            </div>
            <p className="font-normal text-sm md:text-base text-center text-white/60 leading-5 md:leading-6 max-w-[640px]">
              Join thousands of marathoners, casual joggers, and fitness enthusiasts who rely on MyFinishLine to plan, track, and achieve their running goals.
            </p>
          </div>

          {/* Testimonials Marquee */}
          <div className="flex flex-col gap-4 md:gap-6 w-full">
            {/* Row 1 - scrolls right */}
            <div className="relative w-full overflow-hidden">
              <div className="marquee-row-right flex gap-4 md:gap-6">
                {/* Multiple sets for seamless infinite scroll */}
                {[...Array(4)].map((_, setIndex) => (
                  row1.map((testimonial, index) => (
                    <TestimonialCard key={`r1-${setIndex}-${index}`} testimonial={testimonial} />
                  ))
                ))}
              </div>
            </div>

            {/* Row 2 - scrolls left */}
            <div className="relative w-full overflow-hidden">
              <div className="marquee-row-left flex gap-4 md:gap-6">
                {/* Multiple sets for seamless infinite scroll */}
                {[...Array(4)].map((_, setIndex) => (
                  row2.map((testimonial, index) => (
                    <TestimonialCard key={`r2-${setIndex}-${index}`} testimonial={testimonial} />
                  ))
                ))}
              </div>
            </div>
          </div>

          {/* Money-Back Guarantee Banner */}
          <div
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[70px] w-full md:w-[1100px] max-w-[calc(100%-2rem)] mx-4 md:mx-auto px-8 md:px-[90px] py-10 md:py-12 rounded-2xl md:rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl"
          >
            {/* Badge */}
            <div className="w-[150px] h-[125px] md:w-[200px] md:h-[167px] flex-shrink-0">
              <img
                src={guaranteeBadge}
                alt="Money Back Guarantee"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-4 md:gap-5 text-center md:text-left">
              <h3 className="font-semibold text-3xl md:text-[52px] text-white leading-tight md:leading-none whitespace-nowrap">
                Money-Back Guarantee
              </h3>
              <p className="font-normal text-base md:text-lg text-white/80 leading-6 md:leading-7 max-w-[520px]">
                Unable to continue participating or start the quest? Contact us, and we&apos;ll issue a refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
