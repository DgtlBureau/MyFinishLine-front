import RedeemInput from "@/app/components/Shared/RedeemInput/RedeemInput";

interface FormErrors {
  [key: string]: string | undefined;
}

interface FormTouched {
  [key: string]: boolean | undefined;
}

interface IRedeemStep2Props {
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zip_code: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  errors: FormErrors;
  touched: FormTouched;
}

const RedeemStep2 = ({
  address_1,
  address_2,
  city,
  state,
  zip_code,
  handleChange,
  handleBlur,
  errors,
  touched,
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
        onBlur={handleBlur}
        error={errors.address_1}
        touched={touched.address_1}
      />
      <RedeemInput
        id="address_2"
        label="Address Line 2"
        placeholder=""
        delay={0.15}
        value={address_2}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.address_2}
        touched={touched.address_2}
        required={false}
      />
      <RedeemInput
        id="city"
        label="City"
        placeholder=""
        delay={0.2}
        value={city}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.city}
        touched={touched.city}
      />
      <RedeemInput
        id="state"
        label="State / Province / Region"
        placeholder="Optional"
        delay={0.25}
        value={state}
        onChange={handleChange}
        onBlur={handleBlur}
        required={false}
      />

      <RedeemInput
        id="zip_code"
        label="Zip"
        placeholder="Zip code"
        delay={0.3}
        value={zip_code}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.zip_code}
        touched={touched.zip_code}
      />
    </>
  );
};

export default RedeemStep2;
