/*
  Warnings:

  - You are about to drop the column `sub_category_1` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sub_category_2` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sub_category_1",
DROP COLUMN "sub_category_2";
