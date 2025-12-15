import { ChevronRight } from "lucide-react";
import Link from "next/link";

const links = [
  {
    id: 1,
    label: "FAQ",
    href: "/app/more/faq",
  },
  {
    id: 2,
    label: "Contact us",
    href: "/app/more/contact-us",
  },
];

const page = () => {
  return (
    <main className="max-w-4xl mx-auto">
      <ul>
        {links.map((link) => (
          <li
            key={link.id}
            className="border-b border-border py-8 px-4 cursor-pointer"
          >
            <Link
              href={link.href}
              className="flex items-center justify-between text-xl"
            >
              {link.label} <ChevronRight />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default page;
