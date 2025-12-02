import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeRoleDto {
  @ApiProperty({
    description: 'ID del nuevo rol a asignar al usuario',
    example: 2,
    type: Number
  })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  rolId: number;
}
