import AsyncStorage from '@react-native-async-storage/async-storage';

// Define cache structure with data, etag, fingerprint, and expiration
export interface CacheEntry<T> {
  data: T;
  etag: string;
  expires: number; // Timestamp when the cache expires
}

const CACHE_PREFIX = 'api_cache:';

export const apiCache = {
  // Get cached data for a given key
  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    try {
      const storedData = await AsyncStorage.getItem(CACHE_PREFIX + key);
      if (!storedData) return null;

      const entry = JSON.parse(storedData) as CacheEntry<T>;

      if (Date.now() > entry.expires) {
        this.remove(key);
        return null;
      }

      return entry;
    } catch (error) {
      console.error('Error getting cache entry:', error);
      return null;
    }
  },

  // Save data to cache with an expiration time
  async set<T>(key: string, data: T, etag: string): Promise<void> {
    try {
      const expires = Date.now() + 24 * 60 * 60 * 1000; // Default to 24 hours

      const entry: CacheEntry<T> = { data, etag, expires };

      await AsyncStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
    } catch (error) {
      console.error('Error setting cache entry:', error);
    }
  },

  // Remove data from cache
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(CACHE_PREFIX + key);
    } catch (error) {
      console.error('Error removing cache entry:', error);
    }
  },

  // Clear all cache entries
  async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(CACHE_PREFIX));
      if (cacheKeys.length > 0) {
        await AsyncStorage.multiRemove(cacheKeys);
      }
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  },
};
