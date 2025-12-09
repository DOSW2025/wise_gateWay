import { ApiProperty } from '@nestjs/swagger';

export class UserSessionStatsDto {
  @ApiProperty({
    description: 'Total de sesiones del usuario (como tutor o estudiante)',
    example: 45,
  })
  totalSesiones: number;

  @ApiProperty({
    description: 'Cantidad de sesiones pendientes',
    example: 5,
  })
  sesionesPendientes: number;

  @ApiProperty({
    description: 'Cantidad de sesiones confirmadas',
    example: 8,
  })
  sesionesConfirmadas: number;

  @ApiProperty({
    description: 'Cantidad de sesiones completadas',
    example: 25,
  })
  sesionesCompletadas: number;

  @ApiProperty({
    description: 'Cantidad de sesiones canceladas',
    example: 5,
  })
  sesionesCanceladas: number;

  @ApiProperty({
    description: 'Cantidad de sesiones rechazadas',
    example: 2,
  })
  sesionesRechazadas: number;

  @ApiProperty({
    description: 'Total de calificaciones recibidas (solo si es tutor)',
    example: 20,
  })
  totalCalificaciones: number;

  @ApiProperty({
    description: 'Total de horas de tutoría completadas',
    example: 37.5,
  })
  horasDeTutoria: number;
}
