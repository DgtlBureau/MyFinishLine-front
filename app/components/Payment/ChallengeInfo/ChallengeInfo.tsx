import { CurrencieSymbols } from "@/app/types";
import { IProduct } from "@/app/types";
import Image from "next/image";

export const ChallengeInfo = ({ product }: { product: IProduct }) => {
  const priceAmount = (Number(product.prices?.amount) / 100).toFixed(2);
  const currency = product.prices?.currency || "USD";

  return (
    <div className="flex flex-col gap-6 justify-between p-6 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 shadow-lg md:w-[40%] w-full">
      <div className="flex gap-6 items-start justify-between">
        <div>
          <p className="text-lg text-white/80 leading-7 font-medium">{product.name}</p>
          <span className="font-bold text-5xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            {CurrencieSymbols[currency as keyof typeof CurrencieSymbols] || '$'}
            {priceAmount}
          </span>
        </div>
        <div className="border-4 border-[#EEDFBA] w-50 h-50 rounded-full overflow-hidden flex items-center justify-center shadow-lg">
          <Image
            src={product.main_image || product.images}
            width={200}
            height={200}
            alt="product image"
            className="object-cover h-full w-full shrink-0 object-center"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3.5">
        <p className="text-xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
          Order Summary
        </p>
        <div className="rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-sm text-white overflow-hidden">
          <div className="flex justify-between border-b border-white/15 p-3 px-5">
            <p className="font-medium">{product.name} Challenge</p>
            <p className="font-medium">
              {priceAmount}{" "}
              {CurrencieSymbols[currency as keyof typeof CurrencieSymbols] || '$'}
            </p>
          </div>
          <div className="flex justify-between border-b border-white/15 p-3 px-5">
            <p className="text-white/70">Shipping</p>
            <p className="text-white/70">0 {CurrencieSymbols[currency as keyof typeof CurrencieSymbols] || '$'}</p>
          </div>
          <div className="flex justify-between p-3 px-5 text-base font-bold">
            <p>Total</p>
            <p>
              {priceAmount} {CurrencieSymbols[currency as keyof typeof CurrencieSymbols] || '$'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
