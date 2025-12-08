import { IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    description: 'Número de página',
    example: 1,
    required: false,
    default: 1
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    description: 'Cantidad de registros por página',
    example: 10,
    required: false,
    default: 10
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({
    description: 'Desplazamiento de registros (alternativa a page)',
    example: 0,
    required: false,
    minimum: 0
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
