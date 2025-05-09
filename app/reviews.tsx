import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { ErrorState } from '@/components/shared/error-state/error-state';
import { LoadingState } from '@/components/shared/loading-state/loading-state';
import { ReviewFilterControls } from '@/components/views/reviews/review-filter-controls';
import { ReviewListItem } from '@/components/views/reviews/review-item';
import { AnimeReviewsQueryParams, ReviewItem } from '@/contract/review';
import { useTypedDispatch } from '@/hooks/use-store-hooks';
import { SnackbarVariantEnum, useSnackbar } from '@/providers/snackbar/snackbar-context';
import { useGetAnimeReviewsQuery } from '@/redux/api/anime-api';
import { setSelectedReviewForDetail } from '@/redux/slices/review-slice';

export default function ReviewsListScreen() {
  const router = useRouter();
  const dispatch = useTypedDispatch();
  const { showSnackbar } = useSnackbar();

  const [spoilersFilter, setSpoilersFilter] = useState<boolean | undefined>(undefined);
  const [preliminaryFilter, setPreliminaryFilter] = useState<boolean | undefined>(undefined);

  const queryParams: AnimeReviewsQueryParams = {
    spoilers: spoilersFilter,
    preliminary: preliminaryFilter,
  };

  const { data, error, isLoading, isFetching, refetch } = useGetAnimeReviewsQuery(queryParams);

  const handleReviewPress = useCallback(
    (review: ReviewItem) => {
      dispatch(setSelectedReviewForDetail(review));
      router.push(`/review-detail/${review.mal_id}`);
    },
    [router, dispatch]
  );

  const handleRefetch = useCallback(async () => {
    try {
      await refetch().unwrap();
      showSnackbar({ text: 'Reviews refreshed!', variant: SnackbarVariantEnum.SUCCESS });
    } catch {
      showSnackbar({ text: 'Failed to refresh reviews.', variant: SnackbarVariantEnum.ERROR });
    }
  }, [refetch, showSnackbar]);

  const renderItem = ({ item }: { item: ReviewItem }) => <ReviewListItem review={item} onPress={handleReviewPress} />;

  const handleBack = () => {
    router.push('/home');
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message="Failed to load anime details" subtext="Please try again later" onBack={handleBack} />;
  if (!data) return <ErrorState message="Reviews not found" onBack={handleBack} />;

  return (
    <View style={styles.container}>
      <ReviewFilterControls
        spoilersFilter={spoilersFilter}
        preliminaryFilter={preliminaryFilter}
        onSpoilersChange={setSpoilersFilter}
        onPreliminaryChange={setPreliminaryFilter}
      />
      <FlatList
        data={data.data}
        renderItem={renderItem}
        keyExtractor={item => item.mal_id.toString()}
        onRefresh={handleRefetch}
        refreshing={isFetching && !isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});
