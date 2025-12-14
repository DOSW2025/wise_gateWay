import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class RecommendationsDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsObject()
  preferences: Record<string, any>;
}
