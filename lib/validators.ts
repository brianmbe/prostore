import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  .refine(
    (val) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(+val)),
    "Invalid price format"
  );

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters"),
  slug: z.string().min(3, "Slug must be atleast 3 characters"),
  category: z.string().min(3, "Category must be atleast 3 characters"),
  brand: z.string().min(3, "Brand must be atleast 3 characters"),
  description: z.string().min(3, "Category must be atleast 3 characters"),
  purchased: z.coerce.number(), // comes as string from form and changes to number
  stock: z.coerce.number(), // comes as string from form and changes to number
  images: z.array(z.string()).min(1, "Atleast one image is required"),
  rating: z.number().positive().int(),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// Schema for signing users in
export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be atleast 6 characters"),
});

// Schema for signing up users
export const signInUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be atleast 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be atleast 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be the same as the one above"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"], // Where the actin has to happen
  });

// Cart Schemas
export const cartItemSchema = z.object({
  product_id: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "slug is required"),
  qty: z.number().int().nonnegative("quantity must be a positive number"),
  image: z.string().min(1, "image is required"),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session cart id is required"),
  userId: z.string().optional().nullable(),
});

// Shipping address validator
export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, "Name must be atleast 3 characters"),
  streetAddress: z.string().min(3, "Street must be atleast 3 characters"),
  city: z.string().min(3, "City must be atleast 3 characters"),
  postalCode: z.string().min(3, "Postal code must be atleast 3 characters"),
  country: z.string().min(3, "Country must be atleast 3 characters"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});
