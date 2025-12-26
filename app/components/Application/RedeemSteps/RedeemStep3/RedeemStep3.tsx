import { Button } from "@/app/components/ui/button";
import { motion } from "motion/react";
import Image from "next/image";

interface IRedeemStep3Props {
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  zip_code: string;
  address_1: string;
  address_2: string;
  company_name: string;
  city: string;
  email: string;
  dial_code: string;
  state: string;
  isLoading: boolean;
}

const Label = ({ label, text }: { label: string; text: string }) => {
  return (
    <>
      <li className="font-medium text-xs leading-5 text-[#71717A]">{label}</li>
      <li className="font-medium text-xs leading-5 text-black">{text}</li>
    </>
  );
};

const RedeemStep3 = ({
  first_name,
  last_name,
  phone,
  country,
  zip_code,
  city,
  address_1,
  address_2,
  company_name,
  dial_code,
  state,
  isLoading,
}: IRedeemStep3Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-linear-to-b from-[#C3B7E2] via-[#FBFBFB] to-[#F4E8FD] border border-border rounded-xl py-6 px-4"
    >
      <div className="mx-auto relative flex items-center justify-center rounded-full max-w-30 max-h-30 bg-linear-to-b from-[#EEDFBA] to-[#CBA76D] p-1">
        <div className="bg-white w-29 h-29 rounded-full">
          <Image
            className="px-4 pb-3 w-full object-contain h-full"
            src="/images/application/medal.png"
            width={1080}
            height={1080}
            alt="Medal"
          />
        </div>
      </div>
      <span className="mt-4 block text-center font-medium leading-7 text-lg text-[#09090B]">
        Confirm delivery details
      </span>
      <ul className="mt-4 grid grid-cols-2 gap-2 w-fit">
        <Label label="First Name" text={first_name} />
        <Label label="Last Name" text={last_name} />
        <Label label="Address Line 1" text={address_1} />
        <Label label="Address Line 2" text={address_2} />
        <Label label="Country" text={country} />
        <Label label="City" text={city} />
        <Label label="State / Province" text={state} />
        <Label label="ZIP / Postcode" text={zip_code} />
        <Label label="Mobile Number" text={dial_code + phone} />
        <Label label="Company" text={company_name} />
      </ul>
      <Button className="mt-8 w-full" type="submit">
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Claiming medal...
          </>
        ) : (
          "Claim medal"
        )}
      </Button>
    </motion.div>
  );
};

export default RedeemStep3;
