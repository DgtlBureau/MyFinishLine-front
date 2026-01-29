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

interface FormErrors {
  [key: string]: string | undefined;
}

interface FormTouched {
  [key: string]: boolean | undefined;
}

interface IRedeemStep1Props {
  first_name: string;
  last_name: string;
  country: string;
  dial_code: string;
  phone: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleUpdateCountry: (value: string) => void;
  errors: FormErrors;
  touched: FormTouched;
}

const RedeemStep1 = ({
  first_name,
  last_name,
  country,
  dial_code,
  phone,
  handleChange,
  handleBlur,
  handleUpdateCountry,
  errors,
  touched,
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
        onBlur={handleBlur}
        error={errors.first_name}
        touched={touched.first_name}
      />
      <RedeemInput
        id="last_name"
        label="Last name"
        placeholder="Duarte"
        delay={0.1}
        value={last_name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_name}
        touched={touched.last_name}
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-1"
      >
        <label className="text-sm font-medium text-foreground">
          Shipping Country<span className="text-gray-400">*</span>
        </label>
        <div className="mt-1">
          <Select value={country} onValueChange={handleUpdateCountry} required>
            <SelectTrigger className={`w-full ${touched.country && errors.country ? 'border-red-500' : ''}`}>
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
        {touched.country && errors.country && (
          <p className="text-red-500 text-[11px] leading-tight">{errors.country}</p>
        )}
      </motion.div>

      <div className="flex items-start gap-4">
        <RedeemInput
          id="dial_code"
          label="Dial code"
          placeholder="+1"
          delay={0.25}
          value={dial_code}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.dial_code}
          touched={touched.dial_code}
        />
        <RedeemInput
          id="phone"
          label="Phone number"
          placeholder="Phone number"
          delay={0.3}
          value={phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          touched={touched.phone}
        />
      </div>
    </>
  );
};

export default RedeemStep1;
