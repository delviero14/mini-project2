/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `blog` ADD COLUMN `type` ENUM('Free', 'Paid') NOT NULL DEFAULT 'Free';

-- DropTable
DROP TABLE `post`;
