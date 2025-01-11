/*
  Warnings:

  - Changed the type of `discount` on the `Shop` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "discount",
ADD COLUMN     "discount" INTEGER NOT NULL;
