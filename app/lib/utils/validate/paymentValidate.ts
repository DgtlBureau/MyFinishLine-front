import { emailRegex } from "../regex";

interface IValuesProps {
  firstName: string;
  lastName: string;
  email: string;
}

type Errors = Partial<IValuesProps>;

export const validate = (values: IValuesProps) => {
  const errors: Errors = {};

  // Name
  if (!values.firstName) {
    errors.firstName = "Add your First Name";
  } else if (values.firstName && values.firstName.length < 2) {
    errors.firstName = "First name is too short";
  }

  // LastName
  if (!values.lastName) {
    errors.lastName = "Add your Last Name";
  } else if (values.lastName && values.lastName.length < 2) {
    errors.lastName = "Last Name name is too short";
  }

  // Email
  if (!values.email) {
    errors.email = "Enter your email address";
  } else if (values.email && !emailRegex(values.email)) {
    errors.email = "Incorrect email";
  }

  return errors;
};
