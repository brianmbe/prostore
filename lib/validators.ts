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
  stock: z.coerce.number(), // comes as string from form and changes to number
  images: z.array(z.string()).min(1, "Atleast one image is required"),
  rating: z.number().positive().int(),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});
