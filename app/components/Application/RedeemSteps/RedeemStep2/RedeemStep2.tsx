import RedeemInput from "@/app/components/Shared/RedeemInput/RedeemInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { motion } from "framer-motion";
import { countries } from "@/app/data/countries";

interface IRedeemStep2Props {
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zip_code: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateSelect: (value: string) => void;
}

const RedeemStep2 = ({
  address_1,
  address_2,
  city,
  state,
  zip_code,
  handleChange,
  handleUpdateSelect,
}: IRedeemStep2Props) => {
  return (
    <>
      <RedeemInput
        id="address_1"
        label="Address Line 1"
        placeholder=""
        delay={0}
        value={address_1}
        onChange={handleChange}
      />
      <RedeemInput
        id="address_2"
        label="Address Line 2"
        placeholder=""
        delay={0.15}
        value={address_2}
        onChange={handleChange}
      />
      <RedeemInput
        id="city"
        label="City"
        placeholder=""
        delay={0.2}
        value={city}
        onChange={handleChange}
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="space-y-2"
      >
        <label className="text-sm font-medium text-foreground">
          State / Province / Region
        </label>
        <div className="mt-2">
          <Select value={state} onValueChange={handleUpdateSelect} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.name}>
                  {country.flag}
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <RedeemInput
        id="zip_code"
        label="Zip"
        placeholder="Zip code"
        delay={0.3}
        value={zip_code}
        onChange={handleChange}
      />
    </>
  );
};

export default RedeemStep2;
