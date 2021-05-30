/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.
  - Added the required column `keyboard_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mouse_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screen_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "totalPrice",
DROP COLUMN "userId",
ADD COLUMN     "keyboard_id" INTEGER NOT NULL,
ADD COLUMN     "mouse_id" INTEGER NOT NULL,
ADD COLUMN     "screen_id" INTEGER NOT NULL,
ADD COLUMN     "total_price" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordHash",
DROP COLUMN "userName",
ADD COLUMN     "password_hash" VARCHAR(255) NOT NULL,
ADD COLUMN     "user_name" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "Screen" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "manufacturer" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "interface" VARCHAR(255) NOT NULL,
    "note" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mouse" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "manufacturer" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "interface" VARCHAR(255) NOT NULL,
    "note" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyboard" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "manufacturer" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "interface" VARCHAR(255) NOT NULL,
    "note" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Computer" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "order_id" INTEGER NOT NULL,
    "cpu_id" INTEGER NOT NULL,
    "motherboard_id" INTEGER NOT NULL,
    "gpu_id" INTEGER NOT NULL,
    "psu_id" INTEGER NOT NULL,
    "case_id" INTEGER NOT NULL,
    "total_orice" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CPU" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "manufacturer" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "frequency" INTEGER NOT NULL DEFAULT 0,
    "cache" INTEGER NOT NULL DEFAULT 0,
    "core_count" INTEGER NOT NULL DEFAULT 0,
    "note" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GPU" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "manufacturer" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "core_freq" INTEGER NOT NULL DEFAULT 0,
    "mem_freq" INTEGER NOT NULL DEFAULT 0,
    "mem_capacity" INTEGER NOT NULL DEFAULT 0,
    "note" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motherboard" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "manufacturer" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "format" VARCHAR(255) NOT NULL,
    "socket_type" VARCHAR(255) NOT NULL,
    "supp_memory" VARCHAR(255) NOT NULL,
    "mem_capacity" INTEGER NOT NULL DEFAULT 0,
    "note" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PSU" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "manufacturer" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "power" INTEGER NOT NULL DEFAULT 0,
    "note" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "manufacturer" VARCHAR(255) NOT NULL,
    "format" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "note" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Storage" (
    "id" SERIAL NOT NULL,
    "disk_id" INTEGER NOT NULL,
    "computer_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disk" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "manufacturer" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "interface" VARCHAR(255) NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 0,
    "bandwith" INTEGER NOT NULL DEFAULT 0,
    "note" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Memory" (
    "id" SERIAL NOT NULL,
    "ramId" INTEGER NOT NULL,
    "computer_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RAM" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "manufacturer" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "frequency" INTEGER NOT NULL DEFAULT 0,
    "capacity" INTEGER NOT NULL DEFAULT 0,
    "note" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Storage" ADD FOREIGN KEY ("disk_id") REFERENCES "Disk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Storage" ADD FOREIGN KEY ("computer_id") REFERENCES "Computer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Computer" ADD FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Computer" ADD FOREIGN KEY ("cpu_id") REFERENCES "CPU"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Computer" ADD FOREIGN KEY ("motherboard_id") REFERENCES "Motherboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Computer" ADD FOREIGN KEY ("gpu_id") REFERENCES "GPU"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Computer" ADD FOREIGN KEY ("psu_id") REFERENCES "PSU"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Computer" ADD FOREIGN KEY ("case_id") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memory" ADD FOREIGN KEY ("ramId") REFERENCES "RAM"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memory" ADD FOREIGN KEY ("computer_id") REFERENCES "Computer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD FOREIGN KEY ("screen_id") REFERENCES "Screen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD FOREIGN KEY ("mouse_id") REFERENCES "Mouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD FOREIGN KEY ("keyboard_id") REFERENCES "Keyboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
