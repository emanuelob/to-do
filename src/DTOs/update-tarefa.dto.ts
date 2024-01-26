import { IsString, IsBoolean, isNotEmpty, IsNotEmpty } from 'class-validator';

export class UpdateTarefaDTO {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}