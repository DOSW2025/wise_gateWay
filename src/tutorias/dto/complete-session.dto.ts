import { IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para completar una tutoría
 */
export class CompleteSessionDto {
  @ApiProperty({
    description: 'ID del tutor que completa la tutoría',
    example: '660e8400-e29b-41d4-a716-446655440001',
    format: 'uuid',
  })
  @IsUUID('4', { message: 'El ID del tutor debe ser un UUID válido' })
  tutorId: string;

  @ApiProperty({
    description: 'Comentarios finales del tutor sobre la sesión (opcional)',
    example: 'Excelente sesión, el estudiante demostró buen entendimiento de los conceptos',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Los comentarios deben ser una cadena de texto' })
  comentarios?: string;
}
