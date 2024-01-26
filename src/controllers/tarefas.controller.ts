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
  async getTarefaById(@Param('tarefaId') tarefaId: number) {
    try {
      const tarefa = await this.tarefasService.getTarefaById(tarefaId);
      return { tarefa };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Patch(':tarefaId')
  async updateTarefa(@Param('tarefaId') tarefaId: number, @Body() updateTarefaDTO: UpdateTarefaDTO) {
    try {
      const tarefaAtualizada = await this.tarefasService.updateTarefa(tarefaId, updateTarefaDTO);
      return { tarefa: tarefaAtualizada };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':tarefaId')
  async deleteTarefa(@Param('tarefaId') tarefaId: number) {
    try {
      const tarefaDeletada = await this.tarefasService.deleteTarefa(tarefaId);
      return { tarefa: tarefaDeletada };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete('deltacompletas')
  async deleteTarefasCompletas() {
    try {
      await this.tarefasService.deleteTarefasCompletas();
      return { message: 'Todas as tarefas completas foram deletadas com sucesso.' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('filtro')
  async getTarefasByStatus(@Query('isActive') isActive: boolean) {
    try {
      const tarefas = await this.tarefasService.getTarefasByStatus(isActive);
      return { tarefas };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('categoria/:categoriaId')
  async getTarefasByCategoriaId(@Param('categoriaId') categoriaId: number) {
    try {
      const tarefas = await this.tarefasService.getTarefasByCategoriaId(categoriaId);
      return { tarefas };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  
}
