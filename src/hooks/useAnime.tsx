import { useState, useEffect } from 'react';
import { AnimeQueryParams } from '../contract/anime';
import { AnimeType } from '@/constants/mediaFilters';
import { useGetCurrentSeasonAnimeQuery } from '@/redux/api/anime-api';

export const useAnime = (
  initialParams: AnimeQueryParams = {
    sfw: true,
    unapproved: false,
    continuing: true,
  }
) => {
  const [queryParams, setQueryParams] = useState<AnimeQueryParams>(initialParams);
  const [currentPage, setCurrentPage] = useState(initialParams.page || 1);
  const [pageSize, setPageSize] = useState(initialParams.limit || 20);

  const { data, error, isLoading, isFetching, refetch } = useGetCurrentSeasonAnimeQuery(queryParams);

  // Update query params when page or page size changes
  useEffect(() => {
    setQueryParams(prev => ({
      ...prev,
      page: currentPage,
      limit: pageSize,
    }));
  }, [currentPage, pageSize]);

  const setFilter = (filter?: AnimeType) => {
    setQueryParams(prev => ({
      ...prev,
      filter,
      page: 1, // Reset to first page when changing filter
    }));
    setCurrentPage(1);
  };

  const nextPage = () => {
    if (data?.pagination.has_next_page) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && (!data?.pagination.last_visible_page || page <= data.pagination.last_visible_page)) {
      setCurrentPage(page);
    }
  };

  const changePageSize = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return {
    anime: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    isFetching,
    error,
    refetch,
    queryParams,
    setFilter,
    nextPage,
    prevPage,
    goToPage,
    currentPage,
    pageSize,
    changePageSize,
  };
};
