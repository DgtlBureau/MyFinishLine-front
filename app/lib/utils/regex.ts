export const emailRegex = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const passwordRegex = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/.test(
    password
  );

export const maxSybol = (value: string, max?: number) => {
  return max
    ? value.replace(/\D/g, "").slice(0, max)
    : value.replace(/\D/g, "");
};

export const numberRegex = (value: string, max?: number): string => {
  return maxSybol(value.replace(/\D/g, ""), max);
};

export const formatExpiryDate = (value: string): string => {
  let numbers = value.replace(/\D/g, "").slice(0, 4);

  const now = new Date();
  const currentYear = now.getFullYear() % 100;

  if (numbers.length >= 2) {
    const month = numbers.slice(0, 2);

    if (+month > 12) {
      numbers = "12" + numbers.slice(2);
    }

    if (month === "00") {
      numbers = "01" + numbers.slice(2);
    }
  }

  if (numbers.length === 4) {
    let year = parseInt(numbers.slice(2), 10);

    if (year < currentYear) {
      numbers = numbers.slice(0, 2) + currentYear.toString().padStart(2, "0");
    }
  }

  if (numbers.length < 3) return numbers;

  return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
};

export const formatCardNumber = (value: string) => {
  return value
    .replace(/(.{4})/g, "$1-") // после каждых 4 цифр добавляем "-"
    .replace(/-$/, "");
};
