import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsOptional,
  IsArray,
  MaxLength,
} from 'class-validator';

/**
 * DTO para crear un perfil de tutor
 */
export class CreateTutorDto {
  @ApiProperty({
    description:
      'ID del usuario que será tutor. Debe ser un UUID v4 válido y corresponder a un usuario existente',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String,
    format: 'uuid',
  })
  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  usuarioId: string;

  @ApiProperty({
    description:
      'Biografía o descripción del tutor. Información sobre su experiencia, especialidades, etc.',
    example:
      'Ingeniero de sistemas con 5 años de experiencia en desarrollo de software. Especializado en backend con Node.js y bases de datos.',
    required: false,
    nullable: true,
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'La biografía debe ser una cadena de texto' })
  @MaxLength(500, { message: 'La biografía no puede exceder 500 caracteres' })
  bio?: string;

  @ApiProperty({
    description:
      'Array de códigos de materias que el tutor puede enseñar. Cada código es un acrónimo único (ej: DOSW, DOPO)',
    example: ['DOSW', 'DOPO', 'POOB'],
    type: [String],
    required: false,
    isArray: true,
  })
  @IsOptional()
  @IsArray({ message: 'Las materias deben ser un array de códigos' })
  @IsString({
    each: true,
    message: 'Cada código de materia debe ser una cadena de texto',
  })
  materiaCodigos?: string[];
}
