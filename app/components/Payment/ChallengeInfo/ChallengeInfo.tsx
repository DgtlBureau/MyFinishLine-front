import { CurrencieSymbols } from "@/app/types";
import { IProduct, IShippingRate, IPricingPreview } from "@/app/types";
import Image from "next/image";
import { Minus, Plus, Route, Package, Tag } from "lucide-react";

function useIsImperial() {
  if (typeof navigator === "undefined") return false;
  const lang = navigator.language || "";
  return ["en-US", "en-GB", "en-MM", "en-LR"].some((l) => lang.startsWith(l));
}

interface ChallengeInfoProps {
  product: IProduct;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  selectedShipping: IShippingRate | null;
  pricingPreview: IPricingPreview | null;
}

export const ChallengeInfo = ({ product, quantity, onQuantityChange, selectedShipping, pricingPreview }: ChallengeInfoProps) => {
  const unitPrice = Number(product.prices?.amount) / 100;
  const shippingPrice = selectedShipping?.price ? Number(selectedShipping.price) : 0;

  // Если есть pricing preview (с промокодом), используем его
  let subtotal = unitPrice * quantity;
  let discountAmount = 0;
  let totalPrice = subtotal + shippingPrice;

  if (pricingPreview && pricingPreview.details && pricingPreview.details.line_items) {
    // Используем данные из Paddle preview
    subtotal = Number(pricingPreview.details.line_items[0]?.totals.subtotal || 0) / 100;
    discountAmount = Number(pricingPreview.discount?.total || 0) / 100;
    totalPrice = Number(pricingPreview.totals?.total || 0) / 100;
  }

  const currency = pricingPreview?.currency_code || product.prices?.currency || "USD";
  const symbol = CurrencieSymbols[currency as keyof typeof CurrencieSymbols] || "$";

  return (
    <div className="flex flex-col gap-5 p-6 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 shadow-lg md:w-[50%] w-full">
      {/* Challenge image with overlay info */}
      {(product.main_image || product.images) && (
        <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden">
          <Image
            src={product.main_image || product.images}
            fill
            alt={product.name}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Distance badge */}
          {Number(product.challenge_info?.total_distance ?? 0) > 0 && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/30">
              <Route size={14} className="text-white/80" />
              <span className="font-medium text-xs text-white">
                {useIsImperial() && product.challenge_info?.total_distance_mile
                  ? `${Math.round(product.challenge_info.total_distance_mile)} mi`
                  : `${(Number(product.challenge_info!.total_distance) / 1000).toFixed(0)} km`}
              </span>
            </div>
          )}

          {/* Bottom content on image */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1.5 bg-white/15 backdrop-blur-xl rounded-xl p-4 border border-white/25">
            <p className="text-xl text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">{product.name}</p>
            {product.description && (
              <p className="text-sm text-white/80 leading-relaxed line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{product.description}</p>
            )}
            <span className="font-bold text-3xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              {symbol}{unitPrice.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Order Summary */}
      <div className="flex flex-col gap-3.5">
        <p className="text-xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
          Order Summary
        </p>
        <div className="rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-sm text-white overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/15 p-3 px-5 gap-3">
            <p className="font-medium truncate">{product.name}</p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                className="w-6 h-6 rounded-md bg-white/15 border border-white/25 flex items-center justify-center text-white hover:bg-white/25 transition-colors cursor-pointer"
              >
                <Minus size={12} />
              </button>
              <span className="text-white font-bold w-5 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => onQuantityChange(Math.min(10, quantity + 1))}
                className="w-6 h-6 rounded-md bg-white/15 border border-white/25 flex items-center justify-center text-white hover:bg-white/25 transition-colors cursor-pointer"
              >
                <Plus size={12} />
              </button>
              <p className="font-medium ml-2 whitespace-nowrap">
                {subtotal.toFixed(2)} {symbol}
              </p>
            </div>
          </div>

          {/* Shipping row */}
          {selectedShipping && selectedShipping.price && (
            <div className="flex items-center justify-between border-b border-white/15 p-3 px-5 gap-3">
              <div className="flex items-center gap-2">
                <Package size={14} className="text-white/70" />
                <p className="font-medium">Shipping to {selectedShipping.country_name}</p>
              </div>
              <p className="font-medium whitespace-nowrap">
                {shippingPrice.toFixed(2)} {symbol}
              </p>
            </div>
          )}

          {/* Discount row */}
          {pricingPreview && discountAmount > 0 && (
            <div className="flex items-center justify-between border-b border-white/15 p-3 px-5 gap-3 text-green-400">
              <div className="flex items-center gap-2">
                <Tag size={14} className="text-green-400/70" />
                <p className="font-medium">Discount ({pricingPreview.discount?.code})</p>
              </div>
              <p className="font-medium whitespace-nowrap">
                -{discountAmount.toFixed(2)} {symbol}
              </p>
            </div>
          )}

          <div className="flex justify-between p-3 px-5 text-base font-bold">
            <p>Total</p>
            <p>
              {totalPrice.toFixed(2)} {symbol}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
