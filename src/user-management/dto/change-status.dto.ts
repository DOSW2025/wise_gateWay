import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeStatusDto {
  @ApiProperty({
<<<<<<< HEAD
    description: 'ID del nuevo estado a asignar al usuario (1: activo, 2: inactivo, 3: suspendido)',
    example: 1,
    type: Number
=======
    description:
      'ID del nuevo estado a asignar al usuario (1: activo, 2: inactivo, 3: suspendido)',
    example: 1,
    type: Number,
>>>>>>> 3fcc1564b689bcae8d6a0111746603fe35812b80
  })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  estadoId: number;
}
