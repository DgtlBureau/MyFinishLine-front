export const emailRegex = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
