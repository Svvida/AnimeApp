import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MediaList } from '@/components/shared/media-list/media-list';
import { MangaType } from '@/constants/mediaFilters';
import { useManga } from '@/hooks/useManga';

export default function MangaPage() {
  const { manga, pagination, isLoading, isFetching, error, refetch, setFilter, nextPage, prevPage, goToPage, currentPage, queryParams } = useManga();

  const currentFilter = queryParams.filter as MangaType | undefined;

  return (
    <View style={styles.container}>
      <MediaList<MangaType>
        title="Top Manga"
        type="manga"
        data={manga}
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
