-- AlterTable
ALTER TABLE "_CategoryToPhoto" ADD CONSTRAINT "_CategoryToPhoto_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CategoryToPhoto_AB_unique";

-- AlterTable
ALTER TABLE "_PhotoToTag" ADD CONSTRAINT "_PhotoToTag_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_PhotoToTag_AB_unique";
