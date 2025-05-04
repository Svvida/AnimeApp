import { useState, useEffect } from 'react';
import { MangaType } from '@/constants/mediaFilters';
import { MangaQueryParams } from '@/contract/manga';
import { useGetTopMangasQuery } from '@/redux/api/manga-api';

export const useManga = (
  initialParams: MangaQueryParams = {
    sfw: true,
    unapproved: false,
  }
) => {
  const [queryParams, setQueryParams] = useState<MangaQueryParams>(initialParams);
  const [currentPage, setCurrentPage] = useState(initialParams.page || 1);
  const [pageSize, setPageSize] = useState(initialParams.limit || 20);

  const { data, error, isLoading, isFetching, refetch } = useGetTopMangasQuery(queryParams);

  // Update query params when page or page size changes
  useEffect(() => {
    setQueryParams(prev => ({
      ...prev,
      page: currentPage,
      limit: pageSize,
    }));
  }, [currentPage, pageSize]);

  const setFilter = (filter?: MangaType) => {
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
    manga: data?.data || [],
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
