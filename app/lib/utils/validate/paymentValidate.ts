import { emailRegex } from "../regex";

interface IValuesProps {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  phone: string;
  promoCode?: string;
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

  // Country
  if (!values.country) {
    errors.country = "Select your country";
  }

  // City
  if (!values.city) {
    errors.city = "Enter your city";
  } else if (values.city && values.city.length < 2) {
    errors.city = "City name is too short";
  }

  // Address
  if (!values.address) {
    errors.address = "Enter your address";
  } else if (values.address && values.address.length < 5) {
    errors.address = "Address is too short";
  }

  // Postal Code
  if (!values.postalCode) {
    errors.postalCode = "Enter your postal code";
  } else if (values.postalCode && values.postalCode.length < 3) {
    errors.postalCode = "Postal code is too short";
  }

  // Phone
  if (!values.phone) {
    errors.phone = "Enter your phone number";
  } else if (values.phone && !/^\+?[\d\s\-()]{7,}$/.test(values.phone)) {
    errors.phone = "Invalid phone number";
  }

  // Promo Code (optional)
  // No validation needed - it's optional

  return errors;
};
