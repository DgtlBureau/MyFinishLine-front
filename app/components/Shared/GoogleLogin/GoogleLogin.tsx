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
  const logoSize = type === "sign-up" ? "w-7 h-7" : "w-6 h-6";
  const logoWidth = type === "sign-up" ? 28 : 24;
  const buttonPadding = type === "sign-up" ? "py-5 px-6" : "py-3.5 px-5";
  const buttonTextSize = type === "sign-up" ? "text-lg font-semibold" : "text-base font-medium";
  const buttonGap = type === "sign-up" ? "gap-3" : "gap-2.5";
  const buttonRadius = type === "sign-up" ? "rounded-2xl" : "rounded-xl";
  const dropShadow = type === "sign-up" ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]" : "drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]";

  return (
    <Button
      className={`w-full ${buttonPadding} ${buttonTextSize} cursor-pointer transition-all duration-300 flex items-center justify-center ${buttonGap} ${buttonRadius} bg-white/20 backdrop-blur-xl border border-white/30 text-white ${dropShadow} hover:bg-white/30 hover:shadow-lg hover:text-white
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
      <div className={`${logoSize} flex items-center justify-center shrink-0 relative`}>
        {loading ? (
          <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
        ) : (
          <Image
            width={logoWidth}
            height={logoWidth}
            src="/icons/google-icon-new.svg"
            alt="Google"
            className="w-full h-full object-contain"
            style={{ display: 'block' }}
          />
        )}
      </div>
      {type === "login" ? "Sign in" : "Sign up"} with Google
    </Button>
  );
};

export default GoogleLogin;
