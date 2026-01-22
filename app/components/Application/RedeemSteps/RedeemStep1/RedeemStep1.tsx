import RedeemInput from "@/app/components/Shared/RedeemInput/RedeemInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { motion } from "framer-motion";
import { useMemo } from "react";
import countryList from "react-select-country-list";

interface IRedeemStep1Props {
  first_name: string;
  last_name: string;
  country: string;
  dial_code: string;
  phone: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateCountry: (value: string) => void;
}

const RedeemStep1 = ({
  first_name,
  last_name,
  country,
  dial_code,
  phone,
  handleChange,
  handleUpdateCountry,
}: IRedeemStep1Props) => {
  const options = useMemo(() => countryList().getLabels(), []);

  return (
    <>
      <RedeemInput
        id="first_name"
        label="First name"
        placeholder="Pedro"
        delay={0}
        value={first_name}
        onChange={handleChange}
      />
      <RedeemInput
        id="last_name"
        label="Last name"
        placeholder="Duarte"
        delay={0.1}
        value={last_name}
        onChange={handleChange}
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <label className="text-sm font-medium text-foreground">
          Shipping Country
        </label>
        <div className="mt-2">
          <Select value={country} onValueChange={handleUpdateCountry} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {options.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <div className="flex items-center gap-4">
        <RedeemInput
          id="dial_code"
          label="Dial code"
          placeholder="+1"
          delay={0.25}
          value={dial_code}
          onChange={handleChange}
        />
        <RedeemInput
          id="phone"
          label="Phone number"
          placeholder="Phone number"
          delay={0.3}
          value={phone}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default RedeemStep1;
