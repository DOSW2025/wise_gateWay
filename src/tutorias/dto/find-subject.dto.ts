import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class FindSubjectDto {
  @ApiProperty({
    description: 'Buscar por código de materia',
    example: 'dosw',
    required: false,
  })
  @IsString()
  @IsOptional()
  codigo?: string;

  @ApiProperty({
    description: 'Buscar por nombre de materia (búsqueda parcial)',
    example: 'cálculo',
    required: false,
  })
  @IsString()
  @IsOptional()
  nombre?: string;
}
