import Link from "next/link";

const TermsLine = () => {
  return (
    <p className="text-xs leading-4 text-white/50 text-center">
      By countinuing, you agreee to{" "}
      <Link href="https://myfinishline.io/terms-of-service" className="underline">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link href="https://myfinishline.io/privacy" className="underline">
        Privacy Policy
      </Link>
    </p>
  );
};

export default TermsLine;
