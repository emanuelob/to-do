import { IsString, IsBoolean, isNotEmpty, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class UpdateTarefaDTO {
  @IsString({ message: 'O nome da tarefa deve ser do tipo string.' })
  @IsNotEmpty({ message: 'O nome da tarefa não pode estar vazio.' })
  @IsOptional()
  nome: string;

  @IsInt({ message: 'O ID da categoria deve ser um número inteiro.' })
  @IsOptional()
  categoriaId: number;  

  @IsBoolean({ message: 'O status da tarefa deve ser um booleano.' })
  @IsNotEmpty({ message: 'O status da tarefa não pode estar vazio.' })
  @IsOptional()
  isActive: boolean;
}