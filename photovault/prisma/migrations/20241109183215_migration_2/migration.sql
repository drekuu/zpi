/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "username" TEXT;

-- CreateTable
CREATE TABLE "Photograph" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "Photograph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "photographId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "license" BOOLEAN NOT NULL,
    "tags" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "licensePrice" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,

    CONSTRAINT "DeliveryData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DigitalTransaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "email" TEXT,
    "license" BOOLEAN NOT NULL,
    "photoId" INTEGER NOT NULL,

    CONSTRAINT "DigitalTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delivery" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhysicalTransaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "email" TEXT,
    "photoId" INTEGER NOT NULL,
    "deliveryId" INTEGER NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,
    "deliveryDataId" INTEGER NOT NULL,

    CONSTRAINT "PhysicalTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToPhoto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Photograph_userId_key" ON "Photograph"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_photographId_key" ON "Photo"("photographId");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryData_userId_key" ON "DeliveryData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DigitalTransaction_userId_key" ON "DigitalTransaction"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DigitalTransaction_photoId_key" ON "DigitalTransaction"("photoId");

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalTransaction_userId_key" ON "PhysicalTransaction"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalTransaction_photoId_key" ON "PhysicalTransaction"("photoId");

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalTransaction_deliveryId_key" ON "PhysicalTransaction"("deliveryId");

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalTransaction_paymentMethodId_key" ON "PhysicalTransaction"("paymentMethodId");

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalTransaction_deliveryDataId_key" ON "PhysicalTransaction"("deliveryDataId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToPhoto_AB_unique" ON "_CategoryToPhoto"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToPhoto_B_index" ON "_CategoryToPhoto"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Photograph" ADD CONSTRAINT "Photograph_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_photographId_fkey" FOREIGN KEY ("photographId") REFERENCES "Photograph"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryData" ADD CONSTRAINT "DeliveryData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DigitalTransaction" ADD CONSTRAINT "DigitalTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DigitalTransaction" ADD CONSTRAINT "DigitalTransaction_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalTransaction" ADD CONSTRAINT "PhysicalTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalTransaction" ADD CONSTRAINT "PhysicalTransaction_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalTransaction" ADD CONSTRAINT "PhysicalTransaction_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Delivery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalTransaction" ADD CONSTRAINT "PhysicalTransaction_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalTransaction" ADD CONSTRAINT "PhysicalTransaction_deliveryDataId_fkey" FOREIGN KEY ("deliveryDataId") REFERENCES "DeliveryData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPhoto" ADD CONSTRAINT "_CategoryToPhoto_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPhoto" ADD CONSTRAINT "_CategoryToPhoto_B_fkey" FOREIGN KEY ("B") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
