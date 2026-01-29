import { motion } from "motion/react";
import { Input } from "../../ui/input";

interface IRedeemInputProps {
  id: string;
  placeholder: string;
  label: string;
  delay: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

const RedeemInput = ({
  label,
  id,
  placeholder,
  delay,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = true,
}: IRedeemInputProps) => {
  const showError = touched && error;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="space-y-1 w-full"
    >
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}{required && <span className="text-gray-400">*</span>}
      </label>
      <Input
        className={`mt-1 ${showError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
      />
      {showError && (
        <p className="text-red-500 text-[11px] leading-tight">{error}</p>
      )}
    </motion.div>
  );
};

export default RedeemInput;
