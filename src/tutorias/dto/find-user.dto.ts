import { IsUUID, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para buscar usuario por ID
 */
export class FindUserByIdDto {
  @ApiProperty({
    description: 'ID único del usuario (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsUUID('4', { message: 'El ID debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID es obligatorio' })
  id: string;
}

/**
 * DTO para buscar usuario por email
 */
export class FindUserByEmailDto {
  @ApiProperty({
    description: 'Email del usuario',
    example: 'juan.perez@escuelaing.edu.co',
    format: 'email',
  })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;
}
