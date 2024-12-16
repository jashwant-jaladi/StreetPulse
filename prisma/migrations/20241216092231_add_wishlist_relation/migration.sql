-- CreateTable
CREATE TABLE "Wishlist" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "shopId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_shopId_key" ON "Wishlist"("userId", "shopId");

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
