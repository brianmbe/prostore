export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Prostore";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Prostore is a simple e-commerce platform built with Next.js and Prisma.";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;
export const signInDefaultValues = {
  email: "",
  password: "",
};
export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const shippingAddressDefaultValues = {
  fullName: "Nyingambe Brian",
  streetAddress: "Kla-Ebbz Express",
  city: "Kampala",
  postalCode: "256",
  country: "Uganda",
};

export const dollarRate = 3697.79;
export const product_currency = "UGX";
export const product_price_discount = 2.2;
export const vatFee = 18 / 100;
export const shippingFee = 3 / 100;
