import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ErrorState } from '@/components/shared/error-state/error-state';
import { LoadingState } from '@/components/shared/loading-state/loading-state';
import { MediaList } from '@/components/shared/media-list/media-list';
import { MangaType } from '@/constants/mediaFilters';
import { useManga } from '@/hooks/useManga';

const MangaPage = () => {
  const { manga, pagination, isLoading, isFetching, error, refetch, setFilter, nextPage, prevPage, goToPage, currentPage, queryParams } = useManga();

  const currentFilter = queryParams.filter as MangaType | undefined;

  const handleBack = () => {
    router.push('/home');
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message="Failed to load manga list" subtext="Please try again later" onBack={handleBack} />;
  if (manga.length === 0) return <ErrorState message="No manga found" onBack={handleBack} />;

  return (
    <View style={styles.container}>
      <MediaList<MangaType>
        title="Top Manga"
        type="manga"
        data={manga}
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

export default MangaPage;
