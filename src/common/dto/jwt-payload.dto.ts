import { IsEmail, IsEnum, IsString, IsNotEmpty } from 'class-validator';

export enum Role {
  ESTUDIANTE = 'estudiante',
  TUTOR = 'tutor',
  ADMIN = 'admin',
}

export class JwtPayloadDto {
  @IsString()
  @IsNotEmpty()
  sub: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(Role)
  @IsNotEmpty()
  rol: Role;
}
