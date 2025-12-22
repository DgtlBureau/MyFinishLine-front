import Link from "next/link";

const TermsLine = () => {
  return (
    <p className="text-xs leading-4 text-[#71717A] text-center">
      By countinuing, you agreee to{" "}
      <Link href="/terms-of-service" className="underline">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link href="/privacy" className="underline">
        Privacy Policy
      </Link>
    </p>
  );
};

export default TermsLine;
