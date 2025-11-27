import Image from "next/image";
import { Button } from "../../ui/button";
import { Check, Dot, ListCheck } from "lucide-react";
import Link from "next/link";

interface IPurchaseChallengeProps {
  id: number;
  imageSrc: string;
  title: string;
}

const PurchaseChallenge = ({
  title,
  id,
  imageSrc,
}: IPurchaseChallengeProps) => {
  return (
    <div
      id="challenge-pricing"
      className="bg-background/45 border-background relative mt-10 justify-self-end overflow-hidden rounded-t-xl border p-2 md:mt-20 md:rounded-t-3xl md:p-4 lg:mt-25 mx-auto"
    >
      <div className="rounded relative h-60">
        <Image
          className="border-background/45 rounded-t-sm md:rounded-t-xl w-full object-cover"
          src={imageSrc}
          alt={"Challenge " + id}
          fill
        />
      </div>
      <h4 className="text-xl text-center mt-4">{title}</h4>
      <ul className="mt-4">
        <li className="flex items-center gap-2">
          <Check />1 year activation period
        </li>
        <li className="flex items-center gap-2">
          <Check />
          Instant activation
        </li>
        <li className="flex items-center gap-2">
          <Check />1 year warranty
        </li>
      </ul>
      <span className="block text-2xl mx-auto text-center font-medium mt-2">
        $19.00
      </span>
      <Link
        href="/payment"
        className="uppercase text-2xl px-20 py-2 mt-2 bg-card-foreground block rounded text-background"
      >
        Sign up now
      </Link>
    </div>
  );
};

export default PurchaseChallenge;
