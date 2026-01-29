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
      className={`w-full py-3.5 px-5 text-base font-medium cursor-pointer transition-all duration-300 flex items-center justify-center gap-2.5 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] hover:bg-white/30 hover:shadow-lg hover:text-white
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
        <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
      ) : (
        <div className="w-7 h-7 flex items-center justify-center shrink-0">
          <Image
            width={20}
            height={20}
            src="/icons/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
        </div>
      )}
      {type === "login" ? "Sign in" : "Sign up"} with Google
    </Button>
  );
};

export default GoogleLogin;
