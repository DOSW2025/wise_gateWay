import { Controller, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { FeatureFlagsService } from './feature-flags.service';
import { GetFlagDto } from './dto/get-flag.dto';

@Controller('feature-flags')
export class FeatureFlagsController {
  constructor(private readonly flags: FeatureFlagsService) {}

  // GET /feature-flags/:key (relative to global prefix /wise)
  @Get(':key')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getFlag(@Param() params: GetFlagDto, @Query('default') defaultValue?: string) {
    const { key } = params;
    const def = (defaultValue ?? 'false').toLowerCase() === 'true';
    const enabled = await this.flags.isEnabled(key, def);
    return { key, enabled };
  }
}
