import React from 'react';
import { SectionContainer } from './section-container';
import { UserInfoDisplay } from './user-info-display';
import { DetailButton } from '@/components/shared/detail-button/detail-button';

interface User {
  username: string;
  url: string;
  images: {
    webp: {
      image_url: string;
    };
    jpg: {
      image_url: string;
    };
  };
}

interface ReviewerSectionProps {
  user: User;
  date?: string;
  episodesWatched: number | null;
  reviewUrl: string;
  onOpenLink: (url: string) => Promise<void>;
}

export const ReviewerSection = ({ user, date, episodesWatched, reviewUrl, onOpenLink }: ReviewerSectionProps) => {
  const imageUrl = user.images.webp.image_url || user.images.jpg.image_url;

  return (
    <SectionContainer title="Reviewer Details">
      <DetailButton text={`View ${user.username}'s Profile`} icon="person-circle-outline" onPress={async () => await onOpenLink(user.url)} />

      <UserInfoDisplay username={user.username} imageUrl={imageUrl} date={date} episodesWatched={episodesWatched} />

      <DetailButton text="View Original Review on MAL" icon="open-outline" onPress={async () => await onOpenLink(reviewUrl)} />
    </SectionContainer>
  );
};
