import { Controller, Get, Param, Query } from '@nestjs/common';
import { FeatureFlagsService } from './feature-flags.service';

@Controller('feature-flags')
export class FeatureFlagsController {
  constructor(private readonly flags: FeatureFlagsService) {}

  // GET /wise/feature-flags/ia
  @Get('ia')
  async getIaFlag(@Query('default') defaultValue?: string) {
    const def = (defaultValue ?? 'false').toLowerCase() === 'true';
    const enabled = await this.flags.isEnabled('enable_ia_chat', def);
    return { key: 'enable_ia_chat', enabled };
  }

  // GET /wise/feature-flags/:key
  @Get(':key')
  async getFlag(@Param('key') key: string, @Query('default') defaultValue?: string) {
    const def = (defaultValue ?? 'false').toLowerCase() === 'true';
    const enabled = await this.flags.isEnabled(key, def);
    return { key, enabled };
  }
}
