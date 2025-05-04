import Api from '../config/api';
import { IGetMangaByIdRequest, IGetTopMangasResponse, Manga, MangaDetail, MangaQueryParams, MangaRecommendationResponse } from '@/contract/manga';

export const mangaApi = Api.injectEndpoints({
  endpoints: builder => ({
    // Get manga recommendations
    getMangaRecommendations: builder.query<MangaRecommendationResponse, void>({
      query: () => ({
        method: 'GET',
        url: '/recommendations/manga',
      }),
      providesTags: ['recommendations'],
    }),

    // Get manga by ID
    getMangaById: builder.query<MangaDetail, IGetMangaByIdRequest>({
      query: ({ id }) => ({
        method: 'GET',
        url: `/manga/${id}/full`,
      }),
      providesTags: ['manga'],
    }),

    // Get random manga
    getRandomManga: builder.query<Manga, void>({
      query: () => ({
        method: 'GET',
        url: '/random/manga',
      }),
      providesTags: ['manga'],
    }),

    // Get top mangas
    getTopMangas: builder.query<IGetTopMangasResponse, MangaQueryParams | void>({
      query: (params?: MangaQueryParams) => {
        const queryParams = new URLSearchParams();

        if (params?.filter) {
          queryParams.append('filter', params.filter);
        }

        if (params?.sfw) {
          queryParams.append('sfw', params.sfw.toString());
        }

        if (params?.unapproved) {
          queryParams.append('unapproved', params.unapproved.toString());
        }

        if (params?.continuing) {
          queryParams.append('continuing', params.continuing.toString());
        }

        if (params?.page) {
          queryParams.append('page', params.page.toString());
        }

        if (params?.limit) {
          queryParams.append('limit', params.limit.toString());
        }

        const queryString = queryParams.toString();
        return `/manga/top${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['manga'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMangaRecommendationsQuery, useGetMangaByIdQuery, useGetRandomMangaQuery, useGetTopMangasQuery } = mangaApi;
