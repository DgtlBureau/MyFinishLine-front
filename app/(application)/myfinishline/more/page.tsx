import { ChevronRight } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <main className="max-w-4xl mx-auto">
      <ul>
        <li className="border-b border-border p-4 cursor-pointer">
          <Link
            href="/myfinishline/more/faq"
            className="flex items-center justify-between"
          >
            FAQ <ChevronRight />
          </Link>
        </li>
        <li className="border-b border-border p-4 cursor-pointer">
          <Link
            href="/myfinishline/more/contact-us"
            className="flex items-center justify-between"
          >
            Contact us <ChevronRight />
          </Link>
        </li>
        <li></li>
      </ul>
    </main>
  );
};

export default page;
