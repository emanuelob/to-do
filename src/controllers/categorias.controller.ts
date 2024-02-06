import { Controller, Get, Param, Post, Body, Patch, Delete, NotFoundException } from '@nestjs/common';
import { CategoriasService } from 'src/services/categorias.service';
import { CreateCategoriaDTO } from 'src/DTOs/create-categoria.dto';
import { UpdateCategoriaDTO } from 'src/DTOs/update-categoria.dto';

@Controller('categoria')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  async createCategoria(@Body() createCategoriaDTO: CreateCategoriaDTO) {
    try {
      const categoria = await this.categoriasService.createCategoria(createCategoriaDTO);
      return { categoria };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }  

  @Get()
  async findAllCategorias() {
    const categorias = await this.categoriasService.findAllCategorias();
    return { categorias };
  }

  @Get(':categoriaId')
  async findOneCategoria(@Param('categoriaId') categoriaId: string) {
    try {
      const id = parseInt(categoriaId);
      if (isNaN(id)) {
        throw new NotFoundException('ID da categoria deve ser um número.');
      }
      const categoria = await this.categoriasService.findOneCategoria(id);
      return { categoria };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Patch(':categoriaId')
  async updateCategoria(@Param('categoriaId') categoriaId: string, @Body() updateCategoriaDTO: UpdateCategoriaDTO) {
    try {
      const id = parseInt(categoriaId);
      if (isNaN(id)) {
        throw new NotFoundException('ID da categoria deve ser um número.');
      }
      const categoriaAtualizada = await this.categoriasService.updateCategoria(id, updateCategoriaDTO);
      return { categoria: categoriaAtualizada };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':categoriaId')
  async deleteCategoria(@Param('categoriaId') categoriaId: string) {
    try {
      const id = parseInt(categoriaId);
      if (isNaN(id)) {
        throw new NotFoundException('ID da categoria deve ser um número.');
      }
      const categoriaDeletada = await this.categoriasService.deleteCategoria(id);
      return { categoria: categoriaDeletada };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
