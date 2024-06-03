-- DropIndex
DROP INDEX "post_attachments_fk_post_id_key";

-- DropIndex
DROP INDEX "posts_fk_author_id_key";

-- DropIndex
DROP INDEX "react_post_fk_post_id_key";

-- DropIndex
DROP INDEX "react_post_fk_user_id_key";

-- CreateTable
CREATE TABLE "saved_posts" (
    "id" TEXT NOT NULL,
    "fk_folder_id" TEXT NOT NULL,
    "fk_post_id" TEXT NOT NULL,

    CONSTRAINT "saved_posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "saved_posts" ADD CONSTRAINT "saved_posts_fk_folder_id_fkey" FOREIGN KEY ("fk_folder_id") REFERENCES "folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_posts" ADD CONSTRAINT "saved_posts_fk_post_id_fkey" FOREIGN KEY ("fk_post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
