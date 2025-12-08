import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, Matches, IsOptional } from 'class-validator';

export class UpdateSubjectDto {
  @ApiProperty({
    description: 'Código único de la materia (solo MAYÚSCULAS)',
    example: 'DOSW',
    minLength: 4,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(4, { message: 'El código debe tener mínimo 4 caracteres' })
  @Matches(/^[A-Z]+$/, {
    message: 'El código solo puede contener letras MAYÚSCULAS sin espacios',
  })
  codigo?: string;

  @ApiProperty({
    description: 'Nombre de la materia',
    example: 'Desarrollo y Operaciones de Software',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre?: string;
}
