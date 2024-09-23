/*
  Warnings:

  - You are about to drop the column `location` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `blog` DROP COLUMN `location`,
    DROP COLUMN `price`;
