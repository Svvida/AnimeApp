import React from 'react';
import { AnimeHeaderInfo } from './anime-header-info';
import { DetailButton } from '@/components/shared/detail-button/detail-button';

interface AnimeEntry {
  title: string;
  url: string;
  images: {
    webp: {
      large_image_url: string;
    };
    jpg: {
      large_image_url: string;
    };
  };
}

interface AnimeSectionProps {
  entry: AnimeEntry;
  score: number;
  tags: string[];
  isSpoiler: boolean;
  isPreliminary: boolean;
  onOpenLink: (url: string) => Promise<void>;
}

export const AnimeSection = ({ entry, score, tags, isSpoiler, isPreliminary, onOpenLink }: AnimeSectionProps) => {
  const imageUrl = entry.images.webp.large_image_url || entry.images.jpg.large_image_url;

  return (
    <>
      <DetailButton text={`View anime on MAL`} icon="open-outline" onPress={async () => await onOpenLink(entry.url)} />

      <AnimeHeaderInfo title={entry.title} imageUrl={imageUrl} score={score} tags={tags} isSpoiler={isSpoiler} isPreliminary={isPreliminary} />
    </>
  );
};
