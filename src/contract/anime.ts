import { MediaEntity, Pagination, QueryParams, RecommendationResponse } from './general';
import { BaseMedia } from './media';

export interface AnimeAired {
  from: string;
  to: string;
  prop: {
    from: {
      day: number;
      month: number;
      year: number;
    };
    to: {
      day: number;
      month: number;
      year: number;
    };
    string: string;
  };
}

export interface Anime extends BaseMedia {
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
  };
  title_synonyms: string[];
  source: string;
  episodes?: number;
  airing: boolean;
  aired: AnimeAired;
  duration: string;
  rating: string;
  season: string;
  year: number;
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
  producers: MediaEntity[];
  licensors: MediaEntity[];
  studios: MediaEntity[];
}

// Add AnimeDetail interface for detailed anime information
export interface AnimeDetail extends Anime {
  background?: string;
  relations: [relation: string, entry: MediaEntity[]];
  theme: {
    openings: string[];
    endings: string[];
  };
  external: {
    name: string;
    url: string;
  }[];
  streaming: {
    name: string;
    url: string;
  }[];
}

export interface AnimeResponse {
  data: Anime[];
  pagination: Pagination;
}

export interface AnimeQueryParams extends QueryParams {
  filter?: 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music';
}
export interface AnimeRecommendationResponse extends RecommendationResponse {}

export interface AnimeSearchParams {
  q?: string;
  page?: number;
  limit?: number;
  type?: string;
  score?: number;
  min_score?: number;
  max_score?: number;
  status?: string;
  rating?: string;
  genres?: string;
  order_by?: string;
  sort?: 'desc' | 'asc';
}

export interface IGetAnimeByIdRequest {
  id: number;
}

export interface IAnimeCurrentSeasonResponse {
  data: AnimeDetail[];
  pagination: Pagination;
}
