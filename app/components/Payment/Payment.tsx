import { ChallengeInfo } from "./ChallengeInfo/ChallengeInfo";
import { PaymentForm } from "./PaymentForm/PaymentForm";
import { IProduct } from "@/app/types";

interface IPaymentProps {
  product: IProduct;
}

export const Payment = ({ product }: IPaymentProps) => {
  return (
    <div className="flex gap-[75px]">
      <PaymentForm />
      <ChallengeInfo product={product} />
    </div>
  );
};
