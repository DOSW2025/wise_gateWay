import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsString,
  ArrayNotEmpty,
  ArrayMinSize,
} from 'class-validator';

/**
 * DTO para remover materias de un tutor
 */
export class RemoveMateriasDto {
  @ApiProperty({
    description:
      'Array de códigos de materias a remover del tutor. Cada código es un acrónimo único (ej: DOSW, DOPO)',
    example: ['POOB', 'CVDS'],
    type: [String],
    minItems: 1,
    isArray: true,
  })
  @IsArray({ message: 'materiaCodigos debe ser un array' })
  @ArrayNotEmpty({ message: 'Debe proporcionar al menos un código de materia' })
  @ArrayMinSize(1, {
    message: 'Debe proporcionar al menos un código de materia',
  })
  @IsString({
    each: true,
    message: 'Cada código de materia debe ser una cadena de texto',
  })
  materiaCodigos: string[];
}
