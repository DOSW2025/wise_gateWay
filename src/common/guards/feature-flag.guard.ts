import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FeatureFlagsService } from '../../feature-flags/feature-flags.service';
import { FEATURE_FLAG_KEY } from '../decorators/feature-flag.decorator';

@Injectable()
export class FeatureFlagGuard implements CanActivate {
  constructor(private reflector: Reflector, private flags: FeatureFlagsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const flagKey = this.reflector.get<string | undefined>(FEATURE_FLAG_KEY, context.getHandler());
    if (!flagKey) return true;
    const enabled = await this.flags.isEnabled(flagKey, false);
    return enabled;
  }
}
