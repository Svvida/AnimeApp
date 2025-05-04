import { View, StyleSheet } from 'react-native';
import { MediaList } from '@/components/shared/media-list/media-list';
import { AnimeType } from '@/constants/mediaFilters';
import { useAnime } from '@/hooks/useAnime';

export default function AnimePage() {
  const { anime, pagination, isLoading, isFetching, error, refetch, setFilter, nextPage, prevPage, goToPage, currentPage, queryParams } = useAnime();

  const currentFilter = queryParams.filter as AnimeType | undefined;

  return (
    <View style={styles.container}>
      <MediaList<AnimeType>
        title="Current Season Anime"
        type="anime"
        data={anime}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        retryCount={0}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});
