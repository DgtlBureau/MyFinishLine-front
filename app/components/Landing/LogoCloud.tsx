const logos = [
  { src: "/images/logos/nike.png", alt: "Nike" },
  { src: "/images/logos/spotify.svg", alt: "Spotify" },
  { src: "/images/logos/netflix.svg", alt: "Netflix" },
  { src: "/images/logos/ibm.svg", alt: "IBM" },
  { src: "/images/logos/logitech.svg", alt: "Logitech" },
];

export default function LogoCloud() {
  return (
    <section className="flex flex-col items-center py-12 md:py-24 w-full">
      <div className="flex items-center max-w-[1280px] px-4 md:px-8 w-full">
        <div className="flex flex-col items-start flex-1">
          {/* Text */}
          <p className="font-normal text-sm md:text-base leading-6 text-white/60 text-center w-full">
            Over 2+ million players worldwide are gaming their way to fitness with MyFinishLine.
          </p>

          {/* Logos */}
          <div className="flex flex-wrap gap-6 md:gap-12 items-center justify-center pt-6 md:pt-8 w-full">
            {logos.map((logo) => (
              <div key={logo.alt} className="h-[24px] md:h-[32px] w-auto grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all invert">
                <img src={logo.src} alt={logo.alt} className="h-full w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
