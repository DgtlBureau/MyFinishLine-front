import { emailRegex, passwordRegex } from "@/app/lib/utils/regex";
const codeRegex = /^[0-9]{1,5}$/;

interface IValuesProps {
  email: string;
  password: string;
  repeatPassword: string;
  code: string;
}

type Errors = Partial<IValuesProps>;

export const validate = (values: IValuesProps) => {
  const errors: Errors = {};

  if (!values.email) {
    errors.email = "Enter your email address";
  } else if (values.email && !emailRegex(values.email)) {
    errors.email = "Enter valid email address";
  }

  if (!values.password) {
    errors.password = "Enter valid password";
  } else if (!passwordRegex(values.password)) {
    errors.password = "Enter password that matches the rules";
  } else if (values.password !== values.repeatPassword) {
    errors.repeatPassword = "Passwords do not match";
  }

  return errors;
};
