import { IsNotEmpty, IsString } from 'class-validator';

export class ChatNavigationDto {
  @IsNotEmpty({ message: 'Message is required' })
  @IsString({ message: 'Message must be a string' })
  message: string;
}
