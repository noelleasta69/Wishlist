-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_wishlistId_fkey";

-- DropForeignKey
ALTER TABLE "WishlistUser" DROP CONSTRAINT "WishlistUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "WishlistUser" DROP CONSTRAINT "WishlistUser_wishlistId_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistUser" ADD CONSTRAINT "WishlistUser_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistUser" ADD CONSTRAINT "WishlistUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
