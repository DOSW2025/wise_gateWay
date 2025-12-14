import { IsString, MinLength, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para cancelar una tutoría confirmada
 */
export class CancelSessionDto {
  @ApiProperty({
    description: 'ID del usuario (tutor o estudiante) que cancela la tutoría',
    example: '660e8400-e29b-41d4-a716-446655440001',
    format: 'uuid',
  })
  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  userId: string;

  @ApiProperty({
    description: 'Razón de la cancelación de la tutoría (mínimo 10 caracteres)',
    example: 'Surgió un imprevisto familiar y no podré asistir a la sesión',
    minLength: 10,
  })
  @IsString({ message: 'La razón debe ser una cadena de texto' })
  @MinLength(10, {
    message: 'La razón de cancelación debe tener al menos 10 caracteres',
  })
  razon: string;
}
