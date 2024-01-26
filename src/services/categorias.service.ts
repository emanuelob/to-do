import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateCategoriaDTO } from 'src/DTOs/create-categoria.dto';
import { UpdateCategoriaDTO } from 'src/DTOs/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}

  async createCategoria(createCategoriaDTO: CreateCategoriaDTO) {
    const categoria = await this.prisma.categoriaEntity.create({
      data: createCategoriaDTO,
    });
    return categoria;
  }

  async findAllCategorias() {
    const categorias = await this.prisma.categoriaEntity.findMany();
    return categorias;
  }

  async findOneCategoria(categoriaId: number) {
    const categoria = await this.prisma.categoriaEntity.findUnique({
      where: { id: categoriaId },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria com ID ${categoriaId} não encontrada`);
    }

    return categoria;
  }

  async updateCategoria(categoriaId: number, updateCategoriaDto: UpdateCategoriaDTO) {
    const categoria = await this.prisma.categoriaEntity.findUnique({
      where: { id: categoriaId },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria com ID ${categoriaId} não encontrada`);
    }

    const categoriaAtualizada = await this.prisma.categoriaEntity.update({
      where: { id: categoriaId },
      data: updateCategoriaDto,
    });

    return categoriaAtualizada;
  }

  async deleteCategoria(categoriaId: number) {
    const categoria = await this.prisma.categoriaEntity.findUnique({
      where: { id: categoriaId },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria com ID ${categoriaId} não encontrada`);
    }

    await this.prisma.categoriaEntity.delete({
      where: { id: categoriaId },
    });

    return categoria;
  }
}