import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiCache } from './cache-service';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const API_BASE_URL = 'https://api.jikan.moe/v4';

const getCacheKey = (endpoint: string, args: string | FetchArgs): string => {
  if (typeof args === 'string') {
    return `${endpoint}:${args}`;
  }

  const url = args.url || '';
  const params = args.params ? JSON.stringify(args.params) : '';
  return `${endpoint}:${url}:${params}`;
};

const baseQueryWithCache: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const endpoint = api.endpoint;
  const cacheKey = getCacheKey(endpoint, args);

  const cacheEntry = await apiCache.get<unknown>(cacheKey);

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: headers => {
      if (cacheEntry?.etag) {
        headers.set('If-None-Match', cacheEntry.etag);
      }
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.meta?.response?.status === 304 && cacheEntry) {
    return {
      data: cacheEntry.data,
    };
  }

  if (result.meta?.response?.status === 200 && result.data) {
    const etag = result.meta.response.headers.get('ETag');
    if (etag) {
      await apiCache.set(cacheKey, result.data, etag);
    }
  }

  return result;
};

export default baseQueryWithCache;
