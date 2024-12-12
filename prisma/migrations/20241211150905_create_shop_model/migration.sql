-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "noOfRatings" INTEGER NOT NULL,
    "prices" INTEGER NOT NULL,
    "preOffer" INTEGER NOT NULL,
    "discount" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);
