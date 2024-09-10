-- AlterTable
ALTER TABLE `author` ADD COLUMN `role` ENUM('Author', 'Admin') NOT NULL DEFAULT 'Author';
