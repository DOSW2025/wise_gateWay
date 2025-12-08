import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

/**
 * DTO para búsqueda de sesión por ID
 */
export class FindSessionByIdDto {
  @ApiProperty({
    description: 'ID de la sesión de tutoría',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String,
    format: 'uuid',
  })
  @IsUUID('4', { message: 'El ID de la sesión debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID de la sesión es obligatorio' })
  id: string;
}
