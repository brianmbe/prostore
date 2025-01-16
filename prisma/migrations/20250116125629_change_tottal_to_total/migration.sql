/*
  Warnings:

  - You are about to drop the column `tottalPrice` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `totalPrice` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "tottalPrice",
ADD COLUMN     "totalPrice" DECIMAL(12,2) NOT NULL;
