import { MediaEntity, Pagination, QueryParams, RecommendationResponse } from './general';
import { BaseMedia } from './media';

export interface MangaRecommendationResponse extends RecommendationResponse {}

// Manga types
export interface MangaPublishedDate {
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

export interface Manga extends BaseMedia {
  chapters?: number;
  volumes?: number;
  publishing: boolean;
  published: MangaPublishedDate;
  background: string;
  authors: MediaEntity[];
  serializations: MediaEntity[];
}

export interface MangaDetail extends Manga {
  title_synonyms: string[];
  relations: [relation: string, entry: MediaEntity[]];
  external: {
    name: string;
    url: string;
  }[];
}

export interface IGetMangaByIdRequest {
  id: number;
}

export interface IGetTopMangasResponse {
  data: Manga[];
  pagination: Pagination;
}

export interface MangaQueryParams extends QueryParams {
  filter?: 'manga' | 'novel' | 'lightnovel' | 'oneshot' | 'doujin' | 'manhwa' | 'manhua';
}
