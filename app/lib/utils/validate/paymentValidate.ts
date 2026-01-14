import { emailRegex } from "../regex";

interface IValuesProps {
  firstName: string;
  lastName: string;
  email: string;
  cardNumber: string;
  expirityCardDate: string;
  cvc: string;
  country: string;
  promocode: string;
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

  // CardNumber
  if (!values.cardNumber) {
    errors.cardNumber = "Add card number";
  } else if (values.cardNumber && values.cardNumber.length < 16) {
    errors.cardNumber = "Card number is too short";
  }

  // expirityCardDate
  if (!values.expirityCardDate) {
    errors.expirityCardDate = "Add expirity card date";
  } else if (
    values.expirityCardDate &&
    values.expirityCardDate.replace("/", "").length < 4
  ) {
    errors.expirityCardDate = "Incorrect experity data";
  }

  //CVC
  if (!values.cvc) {
    errors.cvc = "CVC is required";
  } else if (values.cvc && values.cvc.length < 3) {
    errors.cvc = "CVC is too short";
  }

  //Country
  if (!values.country) {
    errors.country = "Choose the country";
  }

  return errors;
};
