import { motion } from "motion/react";
import { Input } from "../../ui/input";

interface IRedeemInputProps {
  id: string;
  placeholder: string;
  label: string;
  delay: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RedeemInput = ({
  label,
  id,
  placeholder,
  delay,
  value,
  onChange,
}: IRedeemInputProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay }}
      className="space-y-2"
    >
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <Input
        className="mt-2"
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </motion.div>
  );
};

export default RedeemInput;
