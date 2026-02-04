"use client";

import { ChallengeInfo } from "./ChallengeInfo/ChallengeInfo";
import { IProduct, IShippingRate, IPricingPreview } from "@/app/types";
import PaymentForm from "./PaymentForm/PaymentForm";
import { useState } from "react";

interface IPaymentProps {
  product: IProduct;
}

export const Payment = ({ product }: IPaymentProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState<IShippingRate | null>(null);
  const [pricingPreview, setPricingPreview] = useState<IPricingPreview | null>(null);

  return (
    <div className="flex flex-col gap-4 lg:gap-18 md:flex-row">
      <PaymentForm
        product={product}
        quantity={quantity}
        selectedShipping={selectedShipping}
        setSelectedShipping={setSelectedShipping}
        setPricingPreview={setPricingPreview}
      />
      <ChallengeInfo
        product={product}
        quantity={quantity}
        onQuantityChange={setQuantity}
        selectedShipping={selectedShipping}
        pricingPreview={pricingPreview}
      />
    </div>
  );
};
