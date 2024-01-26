import { Controller, Get, Param, Post, Body, Patch, Delete, NotFoundException } from '@nestjs/common';
import { CategoriasService } from 'src/services/categorias.service';
import { CreateCategoriaDTO } from 'src/DTOs/create-categoria.dto';
import { UpdateCategoriaDTO } from 'src/DTOs/update-categoria.dto';

@Controller('categoria')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  async createCategoria(@Body() createCategoriaDTO: CreateCategoriaDTO) {
    const categoria = await this.categoriasService.createCategoria(createCategoriaDTO);
    return { categoria };
  }

  @Get()
  async findAllCategorias() {
    const categorias = await this.categoriasService.findAllCategorias();
    return { categorias };
  }

  @Get(':categoriaId')
  async findOneCategoria(@Param('categoriaId') categoriaId: number) {
    try {
      const categoria = await this.categoriasService.findOneCategoria(categoriaId);
      return { categoria };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Patch(':categoriaId')
  async updateCategoria(@Param('categoriaId') categoriaId: number, @Body() updateCategoriaDTO: UpdateCategoriaDTO) {
    try {
      const categoriaAtualizada = await this.categoriasService.updateCategoria(categoriaId, updateCategoriaDTO);
      return { categoria: categoriaAtualizada };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':categoriaId')
  async deleteCategoria(@Param('categoriaId') categoriaId: number) {
    try {
      const categoriaDeletada = await this.categoriasService.deleteCategoria(categoriaId);
      return { categoria: categoriaDeletada };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
