import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithCache from './base-query';

const Api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithCache,
  endpoints: builder => ({}),
  tagTypes: ['anime', 'manga', 'recommendations'],
});

export default Api;
