export const animeFilters: FilterOption<AnimeType>[] = [
  { value: undefined, label: 'All' },
  { value: 'tv', label: 'TV' },
  { value: 'movie', label: 'Movies' },
  { value: 'ova', label: 'OVA' },
  { value: 'special', label: 'Specials' },
  { value: 'ona', label: 'ONA' },
  { value: 'music', label: 'Music' },
];

export const mangaFilters: FilterOption<MangaType>[] = [
  { value: undefined, label: 'All' },
  { value: 'manga', label: 'Manga' },
  { value: 'novel', label: 'Light Novel' },
  { value: 'oneshot', label: 'One Shot' },
  { value: 'doujin', label: 'Doujinshi' },
  { value: 'manhwa', label: 'Manhwa' },
  { value: 'manhua', label: 'Manhua' },
];

export interface FilterOption<T> {
  value: T | undefined;
  label: string;
}

export type AnimeType = 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music';
export type MangaType = 'manga' | 'novel' | 'oneshot' | 'doujin' | 'manhwa' | 'manhua';
