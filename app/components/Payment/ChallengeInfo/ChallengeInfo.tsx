import { CurrencieSymbols } from "@/app/types";
import { IProduct } from "@/app/types";
import Image from "next/image";

export const ChallengeInfo = ({ product }: { product: IProduct }) => {
  return (
    <div className="flex flex-col gap-7.5 justify-between p-[20px_30px] pb-7.5 rounded-3xl border-1px bg-linear-to-b from-[#5170D5] to-[#3D5AAF] md:w-[40%] w-full">
      <div className="flex gap-7.25 items-start justify-between">
        <div>
          <p className="text-lg text-white leading-7">{product.name}</p>
          <span className="font-semibold text-5xl text-white">
            {CurrencieSymbols[product.prices?.[0].currency]}
            {product.prices?.[0].amount}
          </span>
        </div>
        <div className="border-4 border-[#EEDFBA] w-50 h-50 rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src={product.main_image}
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
              {product.prices?.[0].amount}{" "}
              {CurrencieSymbols[product.prices?.[0].currency]}
            </p>
          </div>
          <div className="flex justify-between border-b border-[#E4E4E7] p-[10px_20px]">
            <p>Shipping</p>
            <p>0 {CurrencieSymbols[product.prices?.[0].currency]}</p>
          </div>
          <div className="flex justify-between p-[10px_20px] text-[16px]">
            <p className="">Total</p>
            <p>
              {product.prices?.[0].amount}{" "}
              {CurrencieSymbols[product.prices?.[0].currency]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
