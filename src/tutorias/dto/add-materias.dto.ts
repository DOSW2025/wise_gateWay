import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

/**
 * DTO para agregar materias a un tutor
 */
export class AddMateriasDto {
  @ApiProperty({
    description: 'Array de códigos de materias a agregar al tutor. Cada código es un acrónimo único (ej: DOSW, DOPO)',
    example: ['DOSW', 'AREP'],
    type: [String],
    minItems: 1,
    isArray: true,
  })
  @IsArray({ message: 'materiaCodigos debe ser un array' })
  @ArrayNotEmpty({ message: 'Debe proporcionar al menos un código de materia' })
  @ArrayMinSize(1, { message: 'Debe proporcionar al menos un código de materia' })
  @IsString({ each: true, message: 'Cada código de materia debe ser una cadena de texto' })
  materiaCodigos: string[];
}
