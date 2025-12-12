import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({
    description: 'ID del grupo de chat',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  grupoId: string;

  @ApiProperty({
    description: 'Contenido del mensaje',
    example: 'Hola a todos!',
  })
  @IsString()
  @IsNotEmpty()
  contenido: string;
}
