import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from './jwt-payload.dto';

export class UserRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  rol: Role;
}
