import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCategoriaDTO {
  @IsString()
  @IsNotEmpty()
  nome: string;
}