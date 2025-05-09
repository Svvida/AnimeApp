import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CacheEntry<T> {
  data: T;
  etag: string;
  expires: number;
}

const CACHE_PREFIX = 'api_cache:';

export const apiCache = {
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

  async set<T>(key: string, data: T, etag: string): Promise<void> {
    try {
      const expires = Date.now() + 24 * 60 * 60 * 1000;

      const entry: CacheEntry<T> = { data, etag, expires };

      await AsyncStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
    } catch (error) {
      console.error('Error setting cache entry:', error);
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(CACHE_PREFIX + key);
    } catch (error) {
      console.error('Error removing cache entry:', error);
    }
  },

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
