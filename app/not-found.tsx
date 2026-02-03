import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a2a4a] via-[#2a4a6a] to-[#1a3a3a] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#3B5CC6]/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#4DA67A]/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <h1 className="text-[120px] sm:text-[160px] md:text-[200px] font-bold leading-none tracking-tighter bg-gradient-to-r from-[#6B8BFF] to-[#7FD4A0] bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-xl md:text-2xl text-white/80 font-medium max-w-md">
          Looks like you wandered off the trail
        </p>
        <p className="text-base text-white/50 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-4 flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] rounded-full hover:from-[#3B5CC6]/90 hover:to-[#4DA67A]/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
