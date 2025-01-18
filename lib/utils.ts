import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { product_currency } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// convert prisma object into a regular JS object
export function convertPrismaObjToObj<T>(value: T) {
  return JSON.parse(JSON.stringify(value));
}

// Format numbers with decimal places and commas
export function formatNumberWithDecimal(num: number): string {
  const [int, decimals] = num.toString().split(".");

  return decimals ? `${int}.${decimals.padEnd(2, "0")}` : `${int}.00`;
}

// format display errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  if (error.name === "ZodError") {
    // Handle ZodError
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );

    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    // Handle Prisma error
    const field = error.meta?.target ? error.meta.target[0] : "Field";

    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists `;
  } else {
    // handle other errors
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}

// Round number to 2 decimal places
export function round2(value: number | string) {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((+value + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Value is not a number or a string");
  }
}

// Currency formatter
const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: product_currency,
  style: "currency",
  minimumFractionDigits: 2,
});


// Format currency
export function formatCurrency(amount:number|string|null) {
  if (typeof amount === "number") {
    return CURRENCY_FORMATTER.format(amount);
  } else if (typeof amount === 'string') {
    return CURRENCY_FORMATTER.format(+amount);
  } else{
    return 'NaN'
  }
}