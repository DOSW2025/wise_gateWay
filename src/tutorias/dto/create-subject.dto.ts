import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, Matches, IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({
    description: 'Código único de la materia (solo MAYÚSCULAS)',
    example: 'DOSW',
    minLength: 4,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'El código debe tener mínimo 4 caracteres' })
  @Matches(/^[A-Z]+$/, {
    message: 'El código solo puede contener letras MAYÚSCULAS sin espacios',
  })
  codigo: string;

  @ApiProperty({
    description: 'Nombre de la materia',
    example: 'Desarrollo y Operaciones de Software',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre: string;
}
