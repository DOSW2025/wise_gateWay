import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsDateString,
  IsUUID,
  IsOptional,
  MaxLength,
  Matches,
  IsIn,
} from 'class-validator';
export enum Modalidad {
  VIRTUAL = 'VIRTUAL',
  PRESENCIAL = 'PRESENCIAL',
}

/**
 * DTO para la creación de una sesión de tutoría
 */
export class CreateSessionDto {
  @ApiProperty({
    description: 'ID del tutor que impartirá la sesión',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String,
    format: 'uuid',
  })
  @IsUUID('4', { message: 'El ID del tutor debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID del tutor es obligatorio' })
  tutorId: string;

  @ApiProperty({
    description: 'ID del estudiante que solicita la tutoría',
    example: '660e8400-e29b-41d4-a716-446655440001',
    type: String,
    format: 'uuid',
  })
  @IsUUID('4', { message: 'El ID del estudiante debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID del estudiante es obligatorio' })
  studentId: string;

  @ApiProperty({
    description: 'Código de la materia a tutoriar (ej: DOSW, DOPO)',
    example: 'DOSW',
    type: String,
  })
  @IsString({ message: 'El código de materia debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código de materia es obligatorio' })
  codigoMateria: string;

  @ApiProperty({
    description: 'Fecha programada para la sesión (formato ISO 8601)',
    example: '2025-11-25T14:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsDateString(
    {},
    { message: 'La fecha debe estar en formato ISO 8601 válido' },
  )
  @IsNotEmpty({ message: 'La fecha programada es obligatoria' })
  scheduledAt: string;

  @ApiProperty({
    description: 'Día de la semana en inglés',
    example: 'monday',
    enum: [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ],
  })
  @IsIn(
    [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ],
    {
      message:
        'El día debe ser uno de: monday, tuesday, wednesday, thursday, friday, saturday, sunday',
    },
  )
  @IsNotEmpty({ message: 'El día es obligatorio' })
  day: string;

  @ApiProperty({
    description: 'Hora de inicio en formato HH:mm (24 horas)',
    example: '14:00',
    type: String,
  })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'La hora de inicio debe estar en formato HH:mm (ej: 14:00)',
  })
  @IsNotEmpty({ message: 'La hora de inicio es obligatoria' })
  startTime: string;

  @ApiProperty({
    description: 'Hora de fin en formato HH:mm (24 horas)',
    example: '16:00',
    type: String,
  })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'La hora de fin debe estar en formato HH:mm (ej: 16:00)',
  })
  @IsNotEmpty({ message: 'La hora de fin es obligatoria' })
  endTime: string;

  @ApiProperty({
    description: 'Modalidad de la sesión',
    enum: Modalidad,
    example: Modalidad.VIRTUAL,
    enumName: 'Modalidad',
  })
  @IsEnum(Modalidad, {
    message:
      'La modalidad debe ser uno de los valores permitidos: VIRTUAL o PRESENCIAL',
  })
  @IsNotEmpty({ message: 'La modalidad es obligatoria' })
  mode: Modalidad;

  @ApiProperty({
    description: 'Comentarios opcionales del estudiante al solicitar la sesión',
    example: 'Necesito ayuda con el proyecto final de la materia',
    type: String,
    required: false,
    maxLength: 500,
  })
  @IsString({ message: 'Los comentarios deben ser una cadena de texto' })
  @MaxLength(500, {
    message: 'Los comentarios no pueden exceder 500 caracteres',
  })
  @IsOptional()
  comentarios?: string;
}
