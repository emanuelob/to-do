import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTarefaDTO {
  @IsString({ message: 'O nome da tarefa deve ser do tipo string.' })
  @IsNotEmpty({ message: 'O nome da tarefa não pode estar vazio.' })
  nome: string;

  @IsInt({ message: 'O ID da categoria deve ser um número inteiro.' })
  @IsOptional()
  categoriaId: number;
}