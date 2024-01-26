import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateTarefaDTO } from 'src/DTOs/create-tarefa.dto';
import { UpdateTarefaDTO } from 'src/DTOs/update-tarefa.dto';

@Injectable()
export class TarefasService {
  constructor(private prisma: PrismaService) {}

  async addTarefa(createTarefaDto: CreateTarefaDTO) {
    
    const categoriaExists = await this.prisma.categoriaEntity.findUnique({
      where: { id: createTarefaDto.categoriaId },
    });
  
    if (!categoriaExists) {
      throw new NotFoundException('Não foi possível adicionar a tarefa. A Categoria não existe!');
    }
  
    const tarefa = await this.prisma.tarefaEntity.create({
        data: {
          nome: createTarefaDto.nome,
          categoriaId: createTarefaDto.categoriaId,
          isActive: true, 
        },
      });
    return tarefa;
  }

  async findAllTarefas() {
    const tarefas = await this.prisma.tarefaEntity.findMany();
    return tarefas;
  }

  async getTarefaById(tarefaId: number) {
    const tarefa = await this.prisma.tarefaEntity.findUnique({
      where: { id: tarefaId },
      include: { categoria: true },
    });

    if (!tarefa) {
      throw new NotFoundException(`Tarefa com ID ${tarefaId} não encontrada.`);
    }

    return tarefa;
  }

  async updateTarefa(tarefaId: number, updateTarefaDto: UpdateTarefaDTO) {
    const tarefa = await this.prisma.tarefaEntity.findUnique({
      where: { id: tarefaId },
    });

    if (!tarefa) {
      throw new NotFoundException(`Tarefa com ID ${tarefaId} não encontrada.`);
    }

    const tarefaAtualizada = await this.prisma.tarefaEntity.update({
      where: { id: tarefaId },
      data: updateTarefaDto,
    });

    return tarefaAtualizada;
  }

  async deleteTarefa(tarefaId: number) {
    const tarefa = await this.prisma.tarefaEntity.findUnique({
      where: { id: tarefaId },
    });

    if (!tarefa) {
      throw new NotFoundException(`Tarefa com ID ${tarefaId} não encontrada.`);
    }

    await this.prisma.tarefaEntity.delete({
      where: { id: tarefaId },
    });

    return tarefa;
  } 

  async deleteTarefasCompletas() {
    await this.prisma.tarefaEntity.deleteMany({
      where: {
        isActive: false,
      },
    });
  }

  async getTarefasByStatus(isActive: boolean) {
    const tarefas = await this.prisma.tarefaEntity.findMany({
      where: {
        isActive,
      },
    });
    return tarefas;
  }

  async getTarefasByCategoriaId(categoriaId: number) {
    const tarefas = await this.prisma.tarefaEntity.findMany({
      where: {
        categoriaId,
      },
    });
    return tarefas;
  }
}