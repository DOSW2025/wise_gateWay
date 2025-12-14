import { Injectable, Logger } from '@nestjs/common';
import { getRemoteConfig } from '../config/firebase';
import { envs } from '../config/envs';

interface CacheEntry<T> { value: T; fetchedAt: number; ttl: number }

@Injectable()
export class FeatureFlagsService {
  private readonly logger = new Logger(FeatureFlagsService.name);
  private cache = new Map<string, CacheEntry<boolean>>();
  private defaultTtl = envs.featureFlagsRefreshMs ?? (process.env.NODE_ENV === 'production' ? 300_000 : 0);

  async isEnabled(flagKey: string, defaultValue = false): Promise<boolean> {
    const now = Date.now();
    const cached = this.cache.get(flagKey);
    if (cached && now - cached.fetchedAt < cached.ttl) {
      return cached.value;
    }

    const rc = getRemoteConfig();
    if (!rc) {
      // Firebase not configured; return default
      this.setCache(flagKey, defaultValue);
      return defaultValue;
    }

    try {
      const template = await rc.getTemplate();
      const param = template.parameters?.[flagKey];
      const raw = (param?.defaultValue as any)?.value as string | undefined;
      const value = typeof raw === 'string' ? raw.toLowerCase() === 'true' : defaultValue;
      this.setCache(flagKey, value);
      return value;
    } catch (err) {
      this.logger.error(`Failed to fetch Remote Config: ${err instanceof Error ? err.message : err}`);
      this.setCache(flagKey, defaultValue);
      return defaultValue;
    }
  }

  private setCache(key: string, value: boolean) {
    this.cache.set(key, { value, fetchedAt: Date.now(), ttl: this.defaultTtl });
  }
}
