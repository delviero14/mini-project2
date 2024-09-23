/*
  Warnings:

  - Added the required column `location` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `blog` ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL;
