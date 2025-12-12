import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageBodyDto {
  @ApiProperty({
    description: 'Contenido del mensaje',
    example: 'Hola a todos!',
  })
  @IsString()
  @IsNotEmpty()
  contenido: string;
}
