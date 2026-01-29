import { googleAuthUrl } from "@/app/lib/utils/googleAuth";
import { Button } from "../../ui/button";
import Image from "next/image";

const GoogleLogin = ({
  type = "login",
  loading = false,
  disabled = false,
  onNavigate,
}: {
  type: "login" | "sign-up";
  loading?: boolean;
  disabled?: boolean;
  onNavigate?: (url: string) => void;
}) => {
  return (
    <Button
      className={`w-full py-4 px-6 text-base font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-3 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] hover:bg-white/30 hover:shadow-lg hover:text-white
        ${disabled && "opacity-70 cursor-not-allowed"}
      `}
      variant="ghost"
      disabled={disabled}
      onClick={() => {
        const url = googleAuthUrl();
        if (onNavigate) {
          onNavigate(url);
        } else {
          window.location.href = url;
        }
      }}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
      ) : (
        <div className="w-9 h-9 flex items-center justify-center shrink-0">
          <Image
            width={24}
            height={24}
            src="/icons/google.svg"
            alt="Google"
            className="w-6 h-6"
          />
        </div>
      )}
      {type === "login" ? "Sign in" : "Sign up"} with Google
    </Button>
  );
};

export default GoogleLogin;
