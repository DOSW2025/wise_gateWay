import { Injectable, Logger } from '@nestjs/common';
import { getRemoteConfig } from '../config/firebase';
import { envs } from '../config/envs';
import { CacheEntry } from './types';

@Injectable()
export class FeatureFlagsService {
  private readonly logger = new Logger(FeatureFlagsService.name);
  private cache = new Map<string, CacheEntry<boolean>>();
  private defaultTtl = envs.featureFlagsRefreshMs ?? (process.env.NODE_ENV === 'production' ? 300_000 : 1_000);

  async isEnabled(flagKey: string, defaultValue = false): Promise<boolean> {
    const now = Date.now();
    const cached = this.cache.get(flagKey);
    if (cached && now - cached.fetchedAt < cached.ttl) {
      this.logger.debug(`[Cache HIT] Flag '${flagKey}' = ${cached.value}`);
      return cached.value;
    }

    this.logger.log(`[Cache MISS] Fetching flag '${flagKey}' from Remote Config...`);
    const rc = await getRemoteConfig();
    if (!rc) {
      this.logger.warn(`Firebase Remote Config unavailable - using default value (${defaultValue}) for '${flagKey}'`);
      this.setCache(flagKey, defaultValue);
      return defaultValue;
    }

    try {
      const template = await rc.getTemplate();
      const param = template.parameters?.[flagKey];
      const raw = param?.defaultValue && 'value' in param.defaultValue ? param.defaultValue.value : undefined;
      const value = typeof raw === 'string' ? raw.toLowerCase() === 'true' : defaultValue;
      this.logger.log(`✅ Remote Config fetched - Flag '${flagKey}' = ${value} (raw: ${raw})`);
      this.setCache(flagKey, value);
      return value;
    } catch (err) {
      this.logger.error(`❌ Failed to fetch Remote Config for '${flagKey}': ${err instanceof Error ? err.message : err}`);
      this.setCache(flagKey, defaultValue);
      return defaultValue;
    }
  }

  private setCache(key: string, value: boolean) {
    this.cache.set(key, { value, fetchedAt: Date.now(), ttl: this.defaultTtl });
  }
}
