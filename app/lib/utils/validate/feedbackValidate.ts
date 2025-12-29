import { emailRegex } from "../regex";

interface IValuesProps {
  email: string;
  question: string;
}

type Errors = Partial<IValuesProps>;

export const validate = (values: IValuesProps) => {
  const errors: Errors = {};

  if (!values.email) {
    errors.email = "Enter your email address";
  } else if (values.email && !emailRegex(values.email)) {
    errors.email = "Incorrect email";
  }

  if (!values.question) {
    errors.question = "Enter your question";
  }

  return errors;
};
