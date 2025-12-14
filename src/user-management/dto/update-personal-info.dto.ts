import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePersonalInfoDto {
  @ApiProperty({
    description: 'Número de teléfono del usuario',
    example: '3001234567',
    required: false,
<<<<<<< HEAD
    maxLength: 20
=======
    maxLength: 20,
>>>>>>> 3fcc1564b689bcae8d6a0111746603fe35812b80
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @ApiProperty({
    description: 'Biografía o descripción personal del usuario',
<<<<<<< HEAD
    example: 'Estudiante de ingeniería de sistemas interesado en desarrollo web',
    required: false,
    maxLength: 500
=======
    example:
      'Estudiante de ingeniería de sistemas interesado en desarrollo web',
    required: false,
    maxLength: 500,
>>>>>>> 3fcc1564b689bcae8d6a0111746603fe35812b80
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  biografia?: string;
}
