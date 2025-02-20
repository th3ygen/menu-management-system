-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "depth" INTEGER NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
