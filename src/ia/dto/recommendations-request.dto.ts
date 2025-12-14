import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class RecommendationsRequestDto {
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  materias: string[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  temas: string[];
}
