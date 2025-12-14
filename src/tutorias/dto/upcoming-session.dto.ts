import { ApiProperty } from '@nestjs/swagger';

export class UpcomingSessionDto {
  @ApiProperty({
    description: 'Nombre completo del tutor',
    example: 'Juan Pérez García',
  })
  tutorName: string;

  @ApiProperty({
    description: 'Nombre completo del estudiante',
    example: 'María López Rodríguez',
  })
  studentName: string;

  @ApiProperty({
    description: 'Nombre de la materia',
    example: 'Cálculo Diferencial',
  })
  subjectName: string;

  @ApiProperty({
    description: 'Fecha y hora programada de la sesión (ISO 8601)',
    example: '2025-12-10T14:00:00.000Z',
  })
  date: string;

  @ApiProperty({
    description: 'Día de la semana de la sesión',
    example: 'monday',
  })
  day: string;

  @ApiProperty({
    description: 'Hora de inicio de la sesión (formato HH:mm)',
    example: '14:00',
  })
  startTime: string;
}
