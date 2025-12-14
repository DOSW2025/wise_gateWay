import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({
    description: 'Nombre del grupo de chat',
    example: 'Grupo de Estudio',
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  nombre: string;

  @ApiProperty({
    description: 'Lista de emails de los miembros del grupo',
    example: ['usuario1@example.com', 'usuario2@example.com'],
    type: [String],
    isArray: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsEmail({}, { each: true })
  emails: string[];
}
