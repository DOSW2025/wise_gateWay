import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export enum EstadoReporte {
  PENDIENTE = 'PENDIENTE',
  EN_REVISION = 'EN_REVISION',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
  RESUELTO = 'RESUELTO',
}

export class UpdateReportStatusDto {
  @ApiProperty({
    description: 'Nuevo estado del reporte',
    enum: EstadoReporte,
    example: EstadoReporte.EN_REVISION,
  })
  @IsEnum(EstadoReporte, { message: 'El estado del reporte debe ser válido' })
  estado: EstadoReporte;

  @ApiProperty({
    description: 'Notas de moderación (opcional)',
    example: 'El contenido fue revisado y se encontró que viola las normas de la comunidad',
    required: false,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Las notas de moderación no pueden exceder los 1000 caracteres' })
  notas_moderacion?: string;
}
