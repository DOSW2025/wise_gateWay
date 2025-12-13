import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class UserGrowthDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'El número de semanas debe ser al menos 1' })
  @Max(52, { message: 'El número de semanas no puede exceder 52 (1 año)' })
  weeks?: number = 12;
}
