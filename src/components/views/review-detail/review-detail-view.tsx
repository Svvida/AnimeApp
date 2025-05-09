import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { AnimeSection } from './components/anime-section';
import { ReactionsSection } from './components/reactions-section';
import { ReviewContent } from './components/review-content';
import { ReviewerSection } from './components/reviewer-section';
import { Header } from '@/components/shared/detail-header/detail-header';
import { ErrorState } from '@/components/shared/error-state/error-state';
import { LoadingState } from '@/components/shared/loading-state/loading-state';
import { useTypedDispatch, useTypedSelector } from '@/hooks/use-store-hooks';
import { useSnackbar } from '@/providers/snackbar/snackbar-context';
import { selectReviewForDetail, clearSelectedReviewForDetail } from '@/redux/slices/review-slice';
import { openExternalLink } from '@/utils/linking';

const ReviewDetailView = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useTypedDispatch();
  const { showSnackbar } = useSnackbar();

  const reviewFromStore = useTypedSelector(selectReviewForDetail);
  const reviewId = id ? parseInt(id, 10) : undefined;
  const [isReady, setIsReady] = useState(false);

  const review = reviewFromStore && reviewFromStore.mal_id === reviewId ? reviewFromStore : null;

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    dispatch(clearSelectedReviewForDetail()); // Clear state BEFORE navigating
    router.push('/reviews');
  };

  const handleOpenLink = async (url: string) => {
    await openExternalLink(url, showSnackbar);
  };

  if (!reviewId) {
    return <ErrorState message="Review ID missing." onBack={() => router.push('/reviews')} />;
  }

  if (!isReady && !review) {
    return <LoadingState />;
  }

  if (isReady && !review) {
    return <ErrorState message="Review data not found." subtext="Please navigate back to the list and select a review." onBack={handleBack} />;
  }

  const currentReview = review!;

  return (
    <>
      <Header onBack={handleBack} title={'Review of: ' + currentReview.entry.title} />
      <Stack.Screen options={{ title: `Review by ${currentReview.user.username}` }} />

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <AnimeSection
          entry={currentReview.entry}
          score={currentReview.score}
          tags={currentReview.tags}
          isSpoiler={currentReview.is_spoiler}
          isPreliminary={currentReview.is_preliminary}
          onOpenLink={handleOpenLink}
        />

        <ReviewerSection
          user={currentReview.user}
          date={currentReview.date}
          episodesWatched={currentReview.episodes_watched}
          reviewUrl={currentReview.url}
          onOpenLink={handleOpenLink}
        />

        <ReviewContent content={currentReview.review} />

        <ReactionsSection reactions={currentReview.reactions} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
});

export default ReviewDetailView;
