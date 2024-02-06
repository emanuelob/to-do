import { Controller, Get, Param, Post, Body, Patch, Delete, NotFoundException, Query } from '@nestjs/common';
import { TarefasService } from 'src/services/tarefas.service';
import { CreateTarefaDTO } from 'src/DTOs/create-tarefa.dto';
import { UpdateTarefaDTO } from 'src/DTOs/update-tarefa.dto';

@Controller('tarefa')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Post()
  async addTarefa(@Body() createTarefaDTO: CreateTarefaDTO) {
    try {
      const tarefa = await this.tarefasService.addTarefa(createTarefaDTO);
      return { tarefa };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get()
  async findAllTarefas() {
    const tarefas = await this.tarefasService.findAllTarefas();
    return { tarefas };
  }

  @Get(':tarefaId')
  async getTarefaById(@Param('tarefaId') tarefaId: string, @Query('isActive') isActiveParam: string) {
    try {
      if (isActiveParam !== undefined && (isActiveParam === 'true' || isActiveParam === 'false')) {
        const isActive = isActiveParam === 'true';
        return this.getTarefasByStatus(isActive);
      }
      const id = parseInt(tarefaId);
      if (isNaN(id)) {
        throw new NotFoundException('ID da tarefa deve ser um número ou uma solicitação de filtro {true || false}.');
      }
      const tarefa = await this.tarefasService.getTarefaById(id);
      return { tarefa };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('filtro')
  async getTarefasByStatus(isActive: boolean) {
    try {
      const tarefas = await this.tarefasService.getTarefasByStatus(isActive);
      return { tarefas };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('categoria/:categoriaId')
  async getTarefasByCategoriaId(@Param('categoriaId') categoriaId: string) {
    try {
      const id = parseInt(categoriaId);
      if (isNaN(id)) {
        throw new NotFoundException('ID da categoria deve ser um número.');
      }
      const tarefas = await this.tarefasService.getTarefasByCategoriaId(id);
      return { tarefas };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Patch(':tarefaId')
  async updateTarefa(@Param('tarefaId') tarefaId: string, @Body() updateTarefaDTO: UpdateTarefaDTO) {
    try {
      const id = parseInt(tarefaId);
      if (isNaN(id)) {
        throw new NotFoundException('ID da tarefa deve ser um número.');
      }
      const tarefaAtualizada = await this.tarefasService.updateTarefa(id, updateTarefaDTO);
      return { tarefa: tarefaAtualizada };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':tarefaId')
  async deleteTarefa(@Param('tarefaId') tarefaId: string) {
    try {
      if (tarefaId === 'completas') {
        return await this.deleteTarefasCompletas();
      }
  
      const id = parseInt(tarefaId);
      if (isNaN(id)) {
        throw new NotFoundException('ID da tarefa deve ser um número ou solicitação de exclusão.');
      }
  
      const tarefaDeletada = await this.tarefasService.deleteTarefa(id);
      return { tarefa: tarefaDeletada };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  
  @Delete('completas')
  async deleteTarefasCompletas() {
    try {
      const { message, tarefasExcluidas } = await this.tarefasService.deleteTarefasCompletas();
      return { message, tarefasExcluidas };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
