import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsInt,
  IsUrl,
  MinLength,
  MaxLength,
  Min,
  Max,
} from 'class-validator';

/**
 * DTO para la creación de un nuevo usuario
 * Schema unificado: Integra gestión de usuarios + tutorías
 */
export class CreateUserDto {
  // ============================================================================
  // CAMPOS BÁSICOS DE IDENTIFICACIÓN (Obligatorios)
  // ============================================================================

  @ApiProperty({
    description: 'Email del usuario. Debe ser único en el sistema',
    example: 'juan.perez@escuelaing.edu.co',
    type: String,
  })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
    minLength: 2,
    maxLength: 100,
    type: String,
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Pérez González',
    minLength: 2,
    maxLength: 100,
    type: String,
  })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El apellido no puede exceder 100 caracteres' })
  apellido: string;

  @ApiProperty({
    description: 'Semestre académico del usuario',
    example: 5,
    minimum: 1,
    maximum: 12,
    default: 1,
    type: Number,
  })
  @IsInt({ message: 'El semestre debe ser un número entero' })
  @Min(1, { message: 'El semestre debe ser al menos 1' })
  @Max(12, { message: 'El semestre no puede ser mayor a 12' })
  semestre: number = 1;

  // ============================================================================
  // CAMPOS OPCIONALES
  // ============================================================================

  @ApiPropertyOptional({
    description: 'Número de teléfono del usuario',
    example: '+57 300 123 4567',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @MinLength(7, { message: 'El teléfono debe tener al menos 7 caracteres' })
  @MaxLength(20, { message: 'El teléfono no puede exceder 20 caracteres' })
  telefono?: string;

  @ApiPropertyOptional({
    description: 'Biografía o descripción del usuario',
    example: 'Estudiante de ingeniería de sistemas interesado en desarrollo web',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'La biografía debe ser una cadena de texto' })
  @MaxLength(500, { message: 'La biografía no puede exceder 500 caracteres' })
  biografia?: string;

  // ============================================================================
  // AUTENTICACIÓN OAUTH (Opcional)
  // ============================================================================

  @ApiPropertyOptional({
    description: 'ID de usuario de Google (OAuth)',
    example: '1234567890',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'El google_id debe ser una cadena de texto' })
  google_id?: string;

  @ApiPropertyOptional({
    description: 'URL del avatar del usuario',
    example: 'https://lh3.googleusercontent.com/a/default-user',
    type: String,
  })
  @IsOptional()
  @IsUrl({}, { message: 'El avatar_url debe ser una URL válida' })
  avatar_url?: string;

  // ============================================================================
  // RELACIONES (FK a tablas de gestión)
  // ============================================================================

  @ApiPropertyOptional({
    description: 'ID del rol del usuario (FK a tabla roles). 1=estudiante, 2=tutor, 3=profesor',
    example: 1,
    default: 1,
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'El rolId debe ser un número entero' })
  @Min(1, { message: 'El rolId debe ser al menos 1' })
  rolId?: number = 1;

  @ApiPropertyOptional({
    description: 'ID del estado del usuario (FK a tabla estados_usuario). 1=activo, 2=inactivo, 3=suspendido',
    example: 1,
    default: 1,
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'El estadoId debe ser un número entero' })
  @Min(1, { message: 'El estadoId debe ser al menos 1' })
  estadoId?: number = 1;

  // ============================================================================
  // DISPONIBILIDAD (Específico de tutorías)
  // ============================================================================

  @ApiPropertyOptional({
    description: 'Disponibilidad horaria del usuario. Estructura: { monday: [{start: "08:00", end: "10:00", modalidad: "VIRTUAL"}], tuesday: [], ... }',
    example: {
      monday: [{ start: '08:00', end: '10:00', modalidad: 'VIRTUAL' }],
      tuesday: [{ start: '14:00', end: '16:00', modalidad: 'PRESENCIAL' }],
      wednesday: [],
      thursday: [{ start: '09:00', end: '11:00', modalidad: 'VIRTUAL' }],
      friday: [],
      saturday: [],
      sunday: [],
    },
    required: false,
  })
  @IsOptional()
  @IsObject({ message: 'La disponibilidad debe ser un objeto JSON válido' })
  disponibilidad?: Record<string, any>;
}
