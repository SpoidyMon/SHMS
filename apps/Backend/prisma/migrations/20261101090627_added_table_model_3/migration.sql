/*
  Warnings:

  - The values [VegNon,NONVEG] on the enum `VegNonveg` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VegNonveg_new" AS ENUM ('VEG', 'NON_VEG');
ALTER TABLE "MenuItem" ALTER COLUMN "isVeg" TYPE "VegNonveg_new" USING ("isVeg"::text::"VegNonveg_new");
ALTER TYPE "VegNonveg" RENAME TO "VegNonveg_old";
ALTER TYPE "VegNonveg_new" RENAME TO "VegNonveg";
DROP TYPE "public"."VegNonveg_old";
COMMIT;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "isActive" SET DEFAULT true;
