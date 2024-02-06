-- DropForeignKey
ALTER TABLE "tarefas" DROP CONSTRAINT "tarefas_categoriaId_fkey";

-- AlterTable
ALTER TABLE "tarefas" ALTER COLUMN "categoriaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
