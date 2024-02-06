import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bem-vindo ao meu gerenciador de tarefas, TO DO!';
  }
}
