import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateTarefaDTO } from 'src/DTOs/create-tarefa.dto';
import { UpdateTarefaDTO } from 'src/DTOs/update-tarefa.dto';

@Injectable()
export class TarefasService {
  constructor(private prisma: PrismaService) {}

  async addTarefa(createTarefaDto: CreateTarefaDTO) {
    
    let categoriaId = createTarefaDto.categoriaId ?? null;

    if (createTarefaDto.categoriaId !== undefined && createTarefaDto.categoriaId !== null) {
      const categoriaExists = await this.prisma.categoriaEntity.findUnique({
        where: { id: createTarefaDto.categoriaId },
      });
  
      if (!categoriaExists) {
        throw new NotFoundException('Não foi possível adicionar a tarefa. A Categoria não existe!');
      }
    }
  
    const tarefa = await this.prisma.tarefaEntity.create({
      data: {
        nome: createTarefaDto.nome,
        categoriaId,
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

  async updateTarefa(tarefaId: number, updateTarefaDTO: UpdateTarefaDTO) {
    const { nome, categoriaId, isActive } = updateTarefaDTO;

    const tarefaExistente = await this.prisma.tarefaEntity.findUnique({
      where: { id: tarefaId },
    });

    if (!tarefaExistente) {
      throw new NotFoundException(`Tarefa com ID ${tarefaId} não encontrada.`);
    }

    if (categoriaId !== undefined) {
      const categoriaExistente = await this.prisma.categoriaEntity.findUnique({
        where: { id: categoriaId },
      });

      if (!categoriaExistente) {
        throw new NotFoundException(`A categoria com ID ${categoriaId} não existe.`);
      }
    }

    const tarefaAtualizada = await this.prisma.tarefaEntity.update({
      where: { id: tarefaId },
      data: {
        nome,
        categoriaId: categoriaId ?? undefined, 
        isActive,
      },
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
    const tarefasExcluidas = await this.prisma.tarefaEntity.findMany({
      where: {
        isActive: false,
      },
    });
  
    if (tarefasExcluidas.length === 0) {
      throw new NotFoundException('Não há tarefas completas para serem deletadas.');
    }
  
    const { count } = await this.prisma.tarefaEntity.deleteMany({
      where: {
        isActive: false,
      },
    });
  
    return { message: 'Todas as tarefas completas foram deletadas com sucesso.', tarefasExcluidas };
  }

  async getTarefasByStatus(isActive: boolean) {
    const tarefas = await this.prisma.tarefaEntity.findMany({
      where: {
        isActive,
      },
    });
  
    if (tarefas.length === 0) {
      throw new NotFoundException(`Não foram encontradas tarefas com o status ${isActive ? 'ativo' : 'inativo'}.`);
    }
  
    return tarefas;
  }

  async getTarefasByCategoriaId(categoriaId: number) {
    const categoria = await this.prisma.categoriaEntity.findUnique({
      where: { id: categoriaId },
    });
  
    if (!categoria) {
      throw new NotFoundException(`Não existe categoria com o ID ${categoriaId}.`);
    }
  
    const tarefas = await this.prisma.tarefaEntity.findMany({
      where: {
        categoriaId,
      },
    });
  
    return tarefas;
  }
}