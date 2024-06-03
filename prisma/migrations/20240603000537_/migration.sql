/*
  Warnings:

  - Added the required column `upvotes` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visibility` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VISIBILITY" AS ENUM ('HIDDEN', 'VISIBLE');

-- CreateEnum
CREATE TYPE "REACT" AS ENUM ('SMILE', 'REDSMILE', 'UNREACTED');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "upvotes" INTEGER NOT NULL,
ADD COLUMN     "visibility" "VISIBILITY" NOT NULL;

-- CreateTable
CREATE TABLE "react_post" (
    "id" TEXT NOT NULL,
    "fk_user_id" TEXT NOT NULL,
    "fk_post_id" TEXT NOT NULL,
    "react" "REACT" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "react_post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "react_post_fk_user_id_key" ON "react_post"("fk_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "react_post_fk_post_id_key" ON "react_post"("fk_post_id");

-- AddForeignKey
ALTER TABLE "react_post" ADD CONSTRAINT "react_post_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "react_post" ADD CONSTRAINT "react_post_fk_post_id_fkey" FOREIGN KEY ("fk_post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
