"use server";

import { convertPrismaObjToObj } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { prisma } from "@/db/prisma";

// Get latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: LATEST_PRODUCTS_LIMIT,
  });

  return convertPrismaObjToObj(data);
}

// Get product by slug
export async function getProductBySlug(slug: string) {
  const productData = await prisma.product.findUnique({
    where: { slug: slug },
  });

  return convertPrismaObjToObj(productData);
}
