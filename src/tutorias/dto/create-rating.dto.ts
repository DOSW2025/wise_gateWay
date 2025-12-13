import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsUUID,
  IsInt,
  Min,
  Max,
  IsString,
  IsOptional,
  MaxLength,
} from 'class-validator';

/**
 * DTO para la creación de una calificación de tutoría
 */
export class CreateRatingDto {
  @ApiProperty({
    description: 'ID del estudiante que califica la sesión',
    example: '770e8400-e29b-41d4-a716-446655440002',
    type: String,
    format: 'uuid',
  })
  @IsUUID('4', { message: 'El ID del estudiante debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID del estudiante es obligatorio' })
  raterId: string;

  @ApiProperty({
    description: 'ID de la sesión de tutoría a calificar',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String,
    format: 'uuid',
  })
  @IsUUID('4', { message: 'El ID de la sesión debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID de la sesión es obligatorio' })
  sessionId: string;

  @ApiProperty({
    description: 'Calificación numérica de 1 a 5',
    example: 5,
    type: Number,
    minimum: 1,
    maximum: 5,
  })
  @IsInt({ message: 'La calificación debe ser un número entero' })
  @Min(1, { message: 'La calificación mínima es 1' })
  @Max(5, { message: 'La calificación máxima es 5' })
  @IsNotEmpty({ message: 'La calificación es obligatoria' })
  score: number;

  @ApiProperty({
    description: 'Comentario opcional del estudiante sobre la tutoría',
    example:
      'Excelente tutor, explicó muy bien los conceptos y resolvió todas mis dudas',
    type: String,
    required: false,
    maxLength: 500,
  })
  @IsString({ message: 'El comentario debe ser una cadena de texto' })
  @MaxLength(500, { message: 'El comentario no puede exceder 500 caracteres' })
  @IsOptional()
  comment?: string;
}
