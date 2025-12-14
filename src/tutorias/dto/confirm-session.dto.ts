import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para confirmar una tutoría pendiente
 */
export class ConfirmSessionDto {
  @ApiProperty({
    description: 'ID del tutor que confirma la tutoría',
    example: '660e8400-e29b-41d4-a716-446655440001',
    format: 'uuid',
  })
  @IsUUID('4', { message: 'El ID del tutor debe ser un UUID válido' })
  tutorId: string;
}
