import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class SimulateAnalysisDto {
  @IsNotEmpty()
  @IsString()
  analysisType: string;

  @IsNotEmpty()
  @IsObject()
  data: Record<string, any>;
}