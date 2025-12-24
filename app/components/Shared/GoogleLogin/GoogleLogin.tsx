import { googleAuthUrl } from "@/app/lib/utils/googleAuth";
import { Button } from "../../ui/button";
import Image from "next/image";

export default function GoogleLogin() {
  return (
    <Button
      className="mt-2 flex items-center"
      variant="outline"
      onClick={() => (window.location.href = googleAuthUrl())}
    >
      <Image width={12} height={12} src="/icons/google.svg" alt="Google icon" />
      Continue with Google
    </Button>
  );
}
