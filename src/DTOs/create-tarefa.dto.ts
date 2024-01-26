import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTarefaDTO {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsInt()
  categoriaId: number;
}