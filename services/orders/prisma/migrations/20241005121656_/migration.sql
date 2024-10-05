-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "products" JSONB NOT NULL,
    "total_amount" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
