import { Check } from "lucide-react";
import React from "react";

interface Props {
  password: string;
}

const PasswordValidator: React.FC<Props> = ({ password }) => {
  const validationRules = [
    {
      id: "length",
      label: "At least 8 latin characters",
      regex: /^.{8,32}$/,
      isValid: (pwd: string) => /^.{8,32}$/.test(pwd),
    },
    {
      id: "lowercase",
      label: "At least one lowercase letter",
      regex: /[a-z]/,
      isValid: (pwd: string) => /[a-z]/.test(pwd),
    },
    {
      id: "uppercase",
      label: "At least one uppercase letter",
      regex: /[A-Z]/,
      isValid: (pwd: string) => /[A-Z]/.test(pwd),
    },
    {
      id: "digit",
      label: "At least one number",
      regex: /\d/,
      isValid: (pwd: string) => /\d/.test(pwd),
    },
    {
      id: "special",
      label: "At least one special character (@$!%*?&)",
      regex: /[@$!%*?&]/,
      isValid: (pwd: string) => /[@$!%*?&]/.test(pwd),
    },
    {
      id: "validChars",
      label: "Only allowed characters (A-Z, a-z, 0-9, @$!%*?&)",
      regex: /^[A-Za-z\d@$!%*?&]+$/,
      isValid: (pwd: string) => pwd === "" || /^[A-Za-z\d@$!%*?&]+$/.test(pwd),
    },
  ];

  const getRuleStatus = (rule: (typeof validationRules)[0]) => {
    if (password.length === 0) return "pending";
    return rule.isValid(password) ? "valid" : "invalid";
  };

  return (
    <div className={`space-y-4`}>
      <div className="space-y-2">
        <p className="text-xs font-medium text-white/70">
          Password must contain:
        </p>
        <ul className="space-y-1">
          {validationRules.map((rule) => {
            const status = getRuleStatus(rule);
            return (
              <li key={rule.id} className="flex items-center">
                {status === "valid" ? (
                  <div className="w-4">
                    <Check width={10} height={10} color="green" />
                  </div>
                ) : (
                  <div className="w-4">
                    <div className="w-1 h-1 bg-white/40 rounded-full" />
                  </div>
                )}
                <span
                  className={`
                  text-xs
                  ${status === "valid" ? "text-green-300" : "text-white/50"}
                `}
                >
                  {rule.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PasswordValidator;
