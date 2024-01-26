import { Module } from '@nestjs/common';
import { CategoriasController } from '../controllers/categorias.controller';
import { CategoriasService } from '../services/categorias.service';
import { PrismaService } from '../services/prisma.service';

@Module({
  controllers: [CategoriasController],
  providers: [CategoriasService, PrismaService],
})
export class CategoriasModule {}
