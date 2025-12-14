import { IsBoolean, IsEmail, IsString } from 'class-validator';

export enum TemplateNotificacionesEnum {
  SOLICITUD_ESTUDIANTE = 'SolicitudTutoriaEstudiante',
  SOLICITUD_TUTOR = 'SolicitudTutoriaTutor',
  CONFIRMACION_ESTUDIANTE = 'ConfirmacionTutoriaEstudiante',
  CONFIRMACION_TUTOR = 'ConfirmacionTutoriaTutor',
  RECHAZO_ESTUDIANTE = 'RechazoTutoriaEstudiante',
  RECHAZO_TUTOR = 'RechazoTutoriaTutor',
  CANCELACION_ESTUDIANTE = 'CancelacionTutoriaEstudiante',
  CANCELACION_TUTOR = 'CancelacionTutoriaTutor',
  COMPLETACION_ESTUDIANTE = 'CompletacionTutoriaEstudiante',
  COMPLETACION_TUTOR = 'CompletacionTutoriaTutor',
}
export class EmailDto {
  @IsEmail()
  email: string;

  @IsString()
  name!: string;

  @IsString()
  resumen!: string;

  @IsBoolean()
  guardar!: boolean;

  @IsString()
  template!: string;

  @IsString()
  materia?: string;

  @IsString()
  fecha?: string;

  @IsString()
  tutor?: string;

  @IsString()
  modalidad?: string;

  @IsString()
  hora?: string;

  @IsString()
  razon?: string;
}
