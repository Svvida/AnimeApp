import { useMemo } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MediaCard } from '../media-card/media-card';
import { FilterOption, MediaFilter } from '../media-filter/media-filter';
import { Paginator } from '../media-paginator/media-paginator';
import { animeFilters, mangaFilters } from '@/constants/mediaFilters';
import { Pagination } from '@/contract/general';
import { BaseMedia } from '@/contract/media';
import { MediaType } from '@/types/media-types';

interface MediaListProps<F extends string | undefined> {
  title: string;
  type: MediaType;
  data: BaseMedia[];
  isFetching: boolean;
  refetch: () => void;
  pagination?: Pagination;
  currentPage: number;
  onFilterChange: (filter?: F) => void;
  filterValue?: F;
  onNextPage: () => void;
  onPrevPage: () => void;
  onPageChange: (page: number) => void;
}

export const MediaList = <F extends string | undefined>({
  title,
  type,
  data,
  isFetching,
  refetch,
  pagination,
  currentPage,
  onFilterChange,
  filterValue,
  onNextPage,
  onPrevPage,
  onPageChange,
}: MediaListProps<F>) => {
  const router = useRouter();

  function navigateToDetail(router: ReturnType<typeof useRouter>, type: MediaType, id: number) {
    if (type === 'anime') {
      router.push(`/anime-detail/${id}`);
    } else {
      router.push(`/manga-detail/${id}`);
    }
  }

  // Then use it in your component
  const handleItemPress = (item: BaseMedia) => {
    navigateToDetail(router, type, item.mal_id);
  };

  const uniqueItems = useMemo(() => {
    const seen = new Set();
    return data.filter(item => {
      if (seen.has(item.mal_id)) return false;
      seen.add(item.mal_id);
      return true;
    });
  }, [data]);

  const getFilters = () => {
    if (type === 'anime') {
      return animeFilters as unknown as FilterOption<F>[];
    } else {
      return mangaFilters as unknown as FilterOption<F>[];
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {isFetching && <ActivityIndicator size="small" color="#0066cc" />}
      </View>

      <MediaFilter<F> currentFilter={filterValue} onFilterChange={onFilterChange} filters={getFilters()} />

      <FlatList
        data={uniqueItems}
        renderItem={({ item }) => <MediaCard item={item} onPress={() => handleItemPress(item)} type={type} />}
        keyExtractor={item => item.mal_id.toString()}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
      />

      <Paginator pagination={pagination} currentPage={currentPage} onPageChange={onPageChange} onNextPage={onNextPage} onPrevPage={onPrevPage} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});
