import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// convert prisma object into a regular JS object
export function convertPrismaObjToObj<T>(value: T) {
  return JSON.parse(JSON.stringify(value));
}
