import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateTopicDto {
  @ApiProperty({
    description: 'Nombre del tema',
    example: 'Integrales triples',
    minLength: 3,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del tema es obligatorio' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(200, { message: 'El nombre no puede exceder 200 caracteres' })
  nombreTema: string;
}
