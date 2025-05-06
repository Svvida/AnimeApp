import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ErrorState } from '@/components/shared/error-state/error-state';
import { LoadingState } from '@/components/shared/loading-state/loading-state';
import { MediaList } from '@/components/shared/media-list/media-list';
import { AnimeType } from '@/constants/mediaFilters';
import { useAnime } from '@/hooks/useAnime';

const AnimePage = () => {
  const { anime, pagination, isLoading, isFetching, error, refetch, setFilter, nextPage, prevPage, goToPage, currentPage, queryParams } = useAnime();

  const currentFilter = queryParams.filter as AnimeType | undefined;

  const handleBack = () => {
    router.push('/home');
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message="Failed to load anime list" subtext="Please try again later" onBack={handleBack} />;
  if (anime.length === 0) return <ErrorState message="No anime found" onBack={handleBack} />;

  return (
    <View style={styles.container}>
      <MediaList<AnimeType>
        title="Current Season Anime"
        type="anime"
        data={anime}
        isFetching={isFetching}
        refetch={refetch}
        pagination={pagination}
        currentPage={currentPage}
        onFilterChange={setFilter}
        filterValue={currentFilter}
        onNextPage={nextPage}
        onPrevPage={prevPage}
        onPageChange={goToPage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});

export default AnimePage;
