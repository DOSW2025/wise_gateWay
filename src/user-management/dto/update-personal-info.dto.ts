import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePersonalInfoDto {
  @ApiProperty({
    description: 'Número de teléfono del usuario',
    example: '3001234567',
    required: false,
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @ApiProperty({
    description: 'Biografía o descripción personal del usuario',
    example: 'Estudiante de ingeniería de sistemas interesado en desarrollo web',
    required: false,
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  biografia?: string;
}
