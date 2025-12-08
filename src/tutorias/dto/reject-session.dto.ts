import { IsString, MinLength, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para rechazar una tutoría pendiente
 */
export class RejectSessionDto {
  @ApiProperty({
    description: 'ID del tutor que rechaza la tutoría',
    example: '660e8400-e29b-41d4-a716-446655440001',
    format: 'uuid',
  })
  @IsUUID('4', { message: 'El ID del tutor debe ser un UUID válido' })
  tutorId: string;

  @ApiProperty({
    description: 'Razón del rechazo de la tutoría (mínimo 10 caracteres)',
    example: 'No tengo disponibilidad para ese horario debido a compromisos académicos',
    minLength: 10,
  })
  @IsString({ message: 'La razón debe ser una cadena de texto' })
  @MinLength(10, { message: 'La razón del rechazo debe tener al menos 10 caracteres' })
  razon: string;
}
