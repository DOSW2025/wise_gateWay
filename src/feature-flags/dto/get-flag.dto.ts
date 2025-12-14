import { IsString, Matches, MaxLength } from 'class-validator';

export class GetFlagDto {
  @IsString()
  @MaxLength(64)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'key must be alphanumeric with underscores',
  })
  key!: string;
}
