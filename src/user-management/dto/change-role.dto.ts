import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeRoleDto {
  @ApiProperty({
    description: 'ID del nuevo rol a asignar al usuario',
    example: 2,
<<<<<<< HEAD
    type: Number
=======
    type: Number,
>>>>>>> 3fcc1564b689bcae8d6a0111746603fe35812b80
  })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  rolId: number;
}
