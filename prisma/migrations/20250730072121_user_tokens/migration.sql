-- CreateTable
CREATE TABLE "public"."user_tokens" (
    "user_id" TEXT NOT NULL,
    "search_tokens" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "user_tokens_pkey" PRIMARY KEY ("user_id")
);
