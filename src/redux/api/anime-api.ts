import {
  AnimeQueryParams,
  AnimeSearchParams,
  AnimeDetail,
  AnimeRecommendationResponse,
  IGetAnimeByIdRequest,
  Anime,
  IAnimeCurrentSeasonResponse,
} from '../../contract/anime';
import Api from '../config/api';
import { ApiResponse } from '@/contract/general';
import { AnimeReviewsQueryParams, ReviewResponse } from '@/contract/review';

export const animeApi = Api.injectEndpoints({
  endpoints: builder => ({
    getCurrentSeasonAnime: builder.query<IAnimeCurrentSeasonResponse, AnimeQueryParams | void>({
      query: (params?: AnimeQueryParams) => {
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
        return `/seasons/now${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['anime'],
    }),

    searchAnime: builder.query<ApiResponse<Anime>, AnimeSearchParams>({
      query: params => {
        const queryParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]: [string, unknown]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });

        return `/anime?${queryParams.toString()}`;
      },
      providesTags: ['anime'],
    }),

    getAnimeById: builder.query<AnimeDetail, IGetAnimeByIdRequest>({
      query: ({ id }) => ({
        method: 'GET',
        url: `/anime/${id}/full`,
      }),
      providesTags: ['anime'],
      transformResponse: (response: { data: AnimeDetail }) => response.data,
    }),

    getAnimeRecommendations: builder.query<AnimeRecommendationResponse, void>({
      query: () => ({
        method: 'GET',
        url: '/recommendations/anime',
      }),
      providesTags: ['recommendations'],
    }),

    getRandomAnime: builder.query<AnimeDetail, void>({
      query: () => ({
        method: 'GET',
        url: '/random/anime',
      }),
      providesTags: ['anime'],
    }),

    getAnimeReviews: builder.query<ReviewResponse, AnimeReviewsQueryParams | void>({
      query: (params?: AnimeReviewsQueryParams) => {
        const queryParams = new URLSearchParams();

        if (params?.preliminary === true || params?.preliminary === false) {
          queryParams.append('preliminary', params.preliminary.toString());
        }
        if (params?.spoilers === true || params?.spoilers === false) {
          queryParams.append('spoilers', params.spoilers.toString());
        }

        const queryString = queryParams.toString();
        return `/reviews/anime${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['anime'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCurrentSeasonAnimeQuery,
  useSearchAnimeQuery,
  useGetAnimeByIdQuery,
  useGetAnimeRecommendationsQuery,
  useGetRandomAnimeQuery,
  useGetAnimeReviewsQuery,
} = animeApi;
