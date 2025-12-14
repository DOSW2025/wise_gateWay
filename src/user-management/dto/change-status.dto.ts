import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeStatusDto {
  @ApiProperty({
    description:
      'ID del nuevo estado a asignar al usuario (1: activo, 2: inactivo, 3: suspendido)',
    example: 1,
    type: Number,
  })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  estadoId: number;
}
