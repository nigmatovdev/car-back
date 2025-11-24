-- AlterTable
ALTER TABLE "services" ADD COLUMN     "durationMin" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
