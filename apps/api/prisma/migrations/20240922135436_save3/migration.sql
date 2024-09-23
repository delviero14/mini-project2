-- AlterTable
ALTER TABLE `blog` ADD COLUMN `availableSeats` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `eventDateTime` DATETIME(3) NULL;
