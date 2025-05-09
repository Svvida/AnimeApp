import Api from '../config/api';
import { IGetMangaByIdRequest, IGetTopMangasResponse, Manga, MangaDetail, MangaQueryParams, MangaRecommendationResponse } from '@/contract/manga';

export const mangaApi = Api.injectEndpoints({
  endpoints: builder => ({
    getMangaRecommendations: builder.query<MangaRecommendationResponse, void>({
      query: () => ({
        method: 'GET',
        url: '/recommendations/manga',
      }),
      providesTags: ['recommendations'],
    }),

    getMangaById: builder.query<MangaDetail, IGetMangaByIdRequest>({
      query: ({ id }) => ({
        method: 'GET',
        url: `/manga/${id}/full`,
      }),
      providesTags: ['manga'],
      transformResponse: (response: { data: MangaDetail }) => response.data,
    }),

    getRandomManga: builder.query<Manga, void>({
      query: () => ({
        method: 'GET',
        url: '/random/manga',
      }),
      providesTags: ['manga'],
    }),

    getTopMangas: builder.query<IGetTopMangasResponse, MangaQueryParams | void>({
      query: (params?: MangaQueryParams) => {
        const queryParams = new URLSearchParams();

        if (params?.filter) {
          queryParams.append('type', params.filter);
        }

        if (params?.page) {
          queryParams.append('page', params.page.toString());
        }

        if (params?.limit) {
          queryParams.append('limit', params.limit.toString());
        }

        const queryString = queryParams.toString();
        return `/top/manga${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['manga'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMangaRecommendationsQuery, useGetMangaByIdQuery, useGetRandomMangaQuery, useGetTopMangasQuery } = mangaApi;
