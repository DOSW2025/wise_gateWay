/**
 * Represents a single cache entry for a feature flag.
 *
 * Each entry stores its own TTL (time-to-live) to allow for flexibility in cache expiration.
 * This design enables different entries to have different lifetimes if needed, and makes it
 * easy to support per-flag TTLs in the future. Currently, all entries use the same default TTL,
 * but the structure supports per-entry TTLs for extensibility.
 */
export interface CacheEntry<T> {
  value: T;
  fetchedAt: number;
  ttl: number;
}
