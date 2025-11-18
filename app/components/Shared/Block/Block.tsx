import Image from "next/image";
import Link from "next/link";

interface IBlockProps {
  title: string;
  children?: React.ReactNode;
  link?: string;
}

const Block = ({ title, link, children }: IBlockProps) => {
  return (
    <section className="w-full">
      <div className="flex justify-between items-center px-4">
        <h3 className="text-black font-semibold font-mono">{title}</h3>
        {link && (
          <Link
            href={link}
            className="ml-auto text-neutral-600 hover:underline font-mono text-sm flex items-center gap-1"
          >
            Показать все{" "}
            <Image
              src="/icons/chevron-right.svg"
              width={12}
              height={12}
              alt="Chevron right"
            />
          </Link>
        )}
      </div>
      {children && <div className="mt-2 font-mono">{children}</div>}
    </section>
  );
};

export default Block;
