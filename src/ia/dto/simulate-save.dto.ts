import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class SimulateSaveDto {
  @IsNotEmpty()
  @IsString()
  saveType: string;

  @IsNotEmpty()
  @IsObject()
  payload: Record<string, any>;
}