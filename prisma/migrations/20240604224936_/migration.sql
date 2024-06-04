/*
  Warnings:

  - You are about to drop the column `fk_user_id` on the `comment` table. All the data in the column will be lost.
  - Added the required column `fk_author_id` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_fk_user_id_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "fk_user_id",
ADD COLUMN     "fk_author_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_fk_author_id_fkey" FOREIGN KEY ("fk_author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
