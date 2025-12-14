import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional, MaxLength } from 'class-validator';

export enum TipoContenido {
  THREAD = 'THREAD',
  RESPONSE = 'RESPONSE',
  MENSAJE_CHAT = 'MENSAJE_CHAT',
}

export enum MotivoReporte {
  SPAM = 'SPAM',
  LENGUAJE_OFENSIVO = 'LENGUAJE_OFENSIVO',
  ACOSO = 'ACOSO',
  CONTENIDO_INAPROPIADO = 'CONTENIDO_INAPROPIADO',
  INCUMPLIMIENTO_NORMAS = 'INCUMPLIMIENTO_NORMAS',
  FRAUDE_ACADEMICO = 'FRAUDE_ACADEMICO',
  OTRO = 'OTRO',
}

export class CreateReportDto {
  @ApiProperty({
    description: 'ID del contenido reportado (thread, response o mensaje de chat)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsNotEmpty({ message: 'El ID del contenido es requerido' })
  contenido_id: string;

  @ApiProperty({
    description: 'Tipo de contenido a reportar',
    enum: TipoContenido,
    example: TipoContenido.THREAD,
  })
  @IsEnum(TipoContenido, { message: 'El tipo de contenido debe ser válido' })
  @IsNotEmpty({ message: 'El tipo de contenido es requerido' })
  tipo_contenido: TipoContenido;

  @ApiProperty({
    description: 'Motivo del reporte',
    enum: MotivoReporte,
    example: MotivoReporte.SPAM,
  })
  @IsEnum(MotivoReporte, { message: 'El motivo del reporte debe ser válido' })
  @IsNotEmpty({ message: 'El motivo del reporte es requerido' })
  motivo: MotivoReporte;

  @ApiProperty({
    description: 'Descripción adicional del reporte (opcional)',
    example: 'Este contenido contiene información falsa y engañosa',
    required: false,
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'La descripción no puede exceder los 500 caracteres' })
  descripcion?: string;
}
