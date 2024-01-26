import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriasModule } from './modules/categorias.module'; 
import { TarefasModule } from './modules/tarefas.module'; 

@Module({
  imports: [CategoriasModule, TarefasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
