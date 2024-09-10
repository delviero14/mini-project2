/*
  Warnings:

  - You are about to alter the column `category` on the `blog` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `blog` MODIFY `category` ENUM('Health', 'Sport', 'Tech', 'Science') NOT NULL;
