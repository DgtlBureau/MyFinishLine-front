import { CurrencieSymbols } from "@/app/types";
import { IProduct } from "@/app/types";
import Image from "next/image";

export const ChallengeInfo = ({ product }: { product: IProduct }) => {
  const priceAmount = (Number(product.prices?.amount) / 100).toFixed(2);
  const currency = product.prices?.currency || "USD";

  return (
    <div className="flex flex-col gap-7.5 justify-between p-[20px_30px] pb-7.5 rounded-3xl border-1px bg-linear-to-b from-[#C3B7E2] to-[#917DC2] md:w-[40%] w-full">
      <div className="flex gap-7.25 items-start justify-between">
        <div>
          <p className="text-lg text-white leading-7">{product.name}</p>
          <span className="font-semibold text-5xl text-white">
            {CurrencieSymbols[currency as keyof typeof CurrencieSymbols] || '$'}
            {priceAmount}
          </span>
        </div>
        <div className="border-4 border-[#EEDFBA] aspect-square w-50 rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src={product.main_image || product.images}
            width={200}
            height={200}
            alt="product image"
            className="object-cover h-full w-full shrink-0 object-center"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3.5 font-bold text-[22px] text-white">
        <p className="text-[22px] text-bold">Order Summary</p>
        <div className="rounded-[12px] bg-white font-medium border text-[14px] text-black border-[#E4E4E7]">
          <div className="flex justify-between border-b border-[#E4E4E7] p-[10px_20px] w-full">
            <p>{product.name} Challenge</p>
            <p>
              {priceAmount} {CurrencieSymbols[currency as keyof typeof CurrencieSymbols] || '$'}
            </p>
          </div>
          <div className="flex justify-between border-b border-[#E4E4E7] p-[10px_20px]">
            <p>Shipping</p>
            <p>0 {CurrencieSymbols[currency as keyof typeof CurrencieSymbols] || '$'}</p>
          </div>
          <div className="flex justify-between p-[10px_20px] text-[16px]">
            <p className="">Total</p>
            <p>
              {priceAmount} {CurrencieSymbols[currency as keyof typeof CurrencieSymbols] || '$'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
