-- AlterTable
ALTER TABLE "users" ALTER COLUMN "username" SET DATA TYPE VARCHAR(40);

-- CreateTable
CREATE TABLE "folder" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "fk_owner_id" TEXT NOT NULL,
    "thumbnail" TEXT,

    CONSTRAINT "folder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_fk_owner_id_fkey" FOREIGN KEY ("fk_owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
