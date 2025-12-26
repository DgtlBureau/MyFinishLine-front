import { googleAuthUrl } from "@/app/lib/utils/googleAuth";
import { Button } from "../../ui/button";
import Image from "next/image";

const GoogleLogin = ({ type = "login" }: { type: "login" | "sign-up" }) => {
  return (
    <Button
      className="mt-2 flex items-center font-semibold"
      variant="outline"
      onClick={() => (window.location.href = googleAuthUrl())}
    >
      <Image width={12} height={12} src="/icons/google.svg" alt="Google icon" />
      {type === "login" ? "Sign in" : "Sign up"} with Google
    </Button>
  );
};

export default GoogleLogin;
