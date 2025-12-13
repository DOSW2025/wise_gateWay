import { IsObject, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para actualizar la disponibilidad horaria de un usuario
 */
export class UpdateAvailabilityDto {
  @ApiProperty({
    description: 'Disponibilidad horaria del usuario. Estructura: { monday: [{start: "08:00", end: "10:00", modalidad: "VIRTUAL", lugar: "https://meet.google.com/abc"}], tuesday: [], ... }. NOTA: El campo "lugar" es OBLIGATORIO para TUTORES (deben especificar URL o ubicación física) y OPCIONAL para ESTUDIANTES.',
    example: {
      // Ejemplo para TUTOR (lugar obligatorio)
      monday: [
        { start: '08:00', end: '10:00', modalidad: 'VIRTUAL', lugar: 'https://meet.google.com/abc-defg-hij' },
        { start: '14:00', end: '16:00', modalidad: 'PRESENCIAL', lugar: 'A-201' },
      ],
      tuesday: [{ start: '09:00', end: '12:00', modalidad: 'VIRTUAL', lugar: 'https://zoom.us/j/123456789' }],
      wednesday: [],
      thursday: [{ start: '15:00', end: '18:00', modalidad: 'PRESENCIAL', lugar: 'Biblioteca - Sala 3' }],
      friday: [{ start: '08:00', end: '11:00', modalidad: 'VIRTUAL', lugar: 'https://meet.google.com/xyz-uvw-rst' }],
      saturday: [],
      sunday: [],
      // Ejemplo para ESTUDIANTE (lugar opcional)
      // monday: [{ start: '08:00', end: '10:00', modalidad: 'VIRTUAL' }],
      // tuesday: [{ start: '14:00', end: '16:00', modalidad: 'PRESENCIAL' }],
    },
    required: true,
  })
  @IsNotEmpty({ message: 'La disponibilidad es obligatoria' })
  @IsObject({ message: 'La disponibilidad debe ser un objeto JSON válido' })
  disponibilidad: Record<string, any>;
}
