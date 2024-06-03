-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(36) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "password" TEXT NOT NULL,
    "profile_picture_uri" TEXT,
    "profile_picture_media_type" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "fk_author_id" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_attachments" (
    "id" TEXT NOT NULL,
    "fk_post_id" TEXT NOT NULL,
    "uri" TEXT NOT NULL,

    CONSTRAINT "post_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "posts_fk_author_id_key" ON "posts"("fk_author_id");

-- CreateIndex
CREATE UNIQUE INDEX "post_attachments_fk_post_id_key" ON "post_attachments"("fk_post_id");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_fk_author_id_fkey" FOREIGN KEY ("fk_author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_attachments" ADD CONSTRAINT "post_attachments_fk_post_id_fkey" FOREIGN KEY ("fk_post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
