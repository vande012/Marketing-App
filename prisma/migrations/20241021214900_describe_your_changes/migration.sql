-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "email" TEXT;
