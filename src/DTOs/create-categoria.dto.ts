import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoriaDTO {
  @IsString()
  @IsNotEmpty()
  nome: string;
}