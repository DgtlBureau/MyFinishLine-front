import Image from "next/image";
import { CurrencieSymbols } from "@/app/types";
import { IProduct } from "@/app/types";

export const ChallengeInfo = ({ product }: { product: IProduct }) => {
  return (
    <div className="flex flex-col gap-[30px] justify-between p-[20px_30px] pb-[30px] rounded-3xl border-1px bg-gradient-to-b from-[#C3B7E2] to-[#917DC2] w-[40%]">
      <div className="flex gap-[29px] items-start justify-between">
        <div>
          <p className="text-lg text-white leading-7">{product.name}</p>
          <span className="font-semibold text-5xl text-white">
            {CurrencieSymbols[product.prices[0].currency]}
            {product.prices[0].amount}
          </span>
        </div>
        <div className="border-[4px] border-[#EEDFBA] w-[200px] h-[200px] rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src={product.main_image}
            width={200}
            height={200}
            alt="product image"
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className="flex flex-col gap-[14px] font-bold text-[22px] text-white">
        <p className="text-[22px] text-bold">Order Summary</p>
        <div className="rounded-[12px] bg-white font-medium border-[1px] text-[14px] text-black border-[#E4E4E7]">
          <div className="flex justify-between border-b-[1px] border-[#E4E4E7] p-[10px_20px] w-full">
            <p>{product.name} Challenge</p>
            <p>
              {product.prices[0].amount}{" "}
              {CurrencieSymbols[product.prices[0].currency]}
            </p>
          </div>
          <div className="flex justify-between border-b-[1px] border-[#E4E4E7] p-[10px_20px]">
            <p>Shipping</p>
            <p>0 {CurrencieSymbols[product.prices[0].currency]}</p>
          </div>
          <div className="flex justify-between p-[10px_20px] text-[16px]">
            <p className="">Total</p>
            <p>
              {product.prices[0].amount}{" "}
              {CurrencieSymbols[product.prices[0].currency]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
