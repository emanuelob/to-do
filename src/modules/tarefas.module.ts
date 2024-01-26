import { Module } from '@nestjs/common';
import { TarefasController } from '../controllers/tarefas.controller';
import { TarefasService } from '../services/tarefas.service';
import { PrismaService } from '../services/prisma.service'; 

@Module({
  controllers: [TarefasController],
  providers: [TarefasService, PrismaService], 
})
export class TarefasModule {}
