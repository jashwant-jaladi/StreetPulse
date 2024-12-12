/*
  Warnings:

  - The `bestSeller` column on the `Shop` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `newest` column on the `Shop` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "bestSeller",
ADD COLUMN     "bestSeller" BOOLEAN,
DROP COLUMN "newest",
ADD COLUMN     "newest" BOOLEAN;
