import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCategoriaDTO {
  @IsString({ message: 'O nome da categoria deve ser do tipo string.' })
  @IsNotEmpty({ message: 'O nome da categoria não pode estar vazio.' })
  nome: string;
}