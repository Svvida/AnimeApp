import { Images, MediaEntity, Title } from './general';
import { MediaType } from '@/types/media-types';

export interface MediaItem {
  mal_id: number;
  title: string;
  title_english?: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  type?: MediaType;
  score?: number;
  generes: { mal_id: number; name: string }[];
  episodes?: number;
  chapters?: number;
}

export interface BaseMedia {
  mal_id: number;
  url: string;
  images: Images;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  status: string;
  score?: number;
  scored_by?: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  genres: MediaEntity[];
  explicit_genres: MediaEntity[];
  themes: MediaEntity[];
  demographics: MediaEntity[];
}
