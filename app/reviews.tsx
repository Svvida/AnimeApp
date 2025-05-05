import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ErrorState } from '@/components/shared/error-state/error-state';
import { LoadingState } from '@/components/shared/loading-state/loading-state';
import { ReviewFilterControls } from '@/components/views/reviews/review-filter-controls';
import { ReviewListItem } from '@/components/views/reviews/review-item';
import { AnimeReviewsQueryParams, ReviewItem } from '@/contract/review';
import { useTypedDispatch } from '@/hooks/use-store-hooks';
import { useSnackbar } from '@/providers/snackbar/snackbar-context';
import { useGetAnimeReviewsQuery } from '@/redux/api/anime-api';
import { setSelectedReviewForDetail } from '@/redux/slices/review-slice';

export default function ReviewsListScreen() {
  const router = useRouter();
  const dispatch = useTypedDispatch();
  const { showSnackbar } = useSnackbar(); // Use the snackbar

  // State for independent filters (undefined means 'any')
  const [spoilersFilter, setSpoilersFilter] = useState<boolean | undefined>(undefined);
  const [preliminaryFilter, setPreliminaryFilter] = useState<boolean | undefined>(undefined);

  // Construct query params based on filter state
  const queryParams: AnimeReviewsQueryParams = {
    spoilers: spoilersFilter,
    preliminary: preliminaryFilter,
  };

  // --- RTK Query Hook ---
  const { data, error, isLoading, isFetching, refetch } = useGetAnimeReviewsQuery(queryParams);

  // --- Handlers ---
  const handleReviewPress = useCallback(
    (review: ReviewItem) => {
      dispatch(setSelectedReviewForDetail(review)); // Dispatch action to set review in Redux
      router.push(`/review-detail/${review.mal_id}`);
    },
    [router, dispatch]
  );

  const handleRefetch = useCallback(async () => {
    try {
      await refetch().unwrap(); // unwrap to handle promise outcome
      showSnackbar({ text: 'Reviews refreshed!', variant: 'success' });
    } catch (err) {
      showSnackbar({ text: 'Failed to refresh reviews.', variant: 'error' });
      console.error('Refetch failed:', err);
    }
  }, [refetch, showSnackbar]);

  const renderItem = ({ item }: { item: ReviewItem }) => <ReviewListItem review={item} onPress={handleReviewPress} />;

  // --- Render Logic ---
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    const errorMessage =
      'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data
        ? (error.data as any).message
        : 'status' in error
          ? `Error ${error.status}`
          : 'An unknown error occurred';
    return <ErrorState message="Failed to load reviews" subtext={errorMessage} onBack={handleRefetch} />;
  }

  // Handle empty data case
  const renderEmptyList = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateText}>No reviews found for the selected filters.</Text>
      <TouchableOpacity style={styles.retryButton} onPress={handleRefetch}>
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Use the new filter controls */}
      <ReviewFilterControls
        spoilersFilter={spoilersFilter}
        preliminaryFilter={preliminaryFilter}
        onSpoilersChange={setSpoilersFilter}
        onPreliminaryChange={setPreliminaryFilter}
      />
      <FlatList
        data={data?.data ?? []}
        renderItem={renderItem}
        keyExtractor={item => item.mal_id.toString()}
        onRefresh={handleRefetch} // Use wrapped refetch for snackbar feedback
        refreshing={isFetching && !isLoading}
        ListEmptyComponent={!isLoading ? renderEmptyList : null} // Show empty state only when not loading
        ListFooterComponent={
          isFetching && !isLoading && (data.data.length ?? 0) > 0 ? ( // Show footer loading only if refreshing non-empty list
            <ActivityIndicator size="small" color="#6200ee" style={styles.footerLoading} />
          ) : null
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// Styles (similar to previous, adjust empty state positioning if needed)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContent: {
    flexGrow: 1, // Ensure content container grows to allow centering empty state
    paddingBottom: 20,
  },
  footerLoading: {
    marginVertical: 15,
  },
  emptyStateContainer: {
    flex: 1, // Take remaining space
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // Removed marginTop, flex: 1 and justify/align center should handle it
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});
