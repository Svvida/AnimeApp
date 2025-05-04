import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pagination } from '@/contract/general';

interface PaginatorProps {
  pagination?: Pagination;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const Paginator: React.FC<PaginatorProps> = ({ pagination, currentPage, onPageChange, onPrevPage, onNextPage }) => {
  if (!pagination) {
    return null;
  }

  const { last_visible_page, has_next_page } = pagination;

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages: number[] = [];

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(last_visible_page - 1, currentPage + 1);

    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Add pages in the range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < last_visible_page - 1) {
      pages.push(-2); // -2 represents ellipsis (using different value to have unique keys)
    }

    // Always show last page if it exists and is different from first page
    if (last_visible_page > 1) {
      pages.push(last_visible_page);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.pageButton, currentPage === 1 && styles.disabledButton]} onPress={onPrevPage} disabled={currentPage === 1}>
        <Text style={[styles.buttonText, currentPage === 1 && styles.disabledText]}>Previous</Text>
      </TouchableOpacity>

      <View style={styles.pageNumbersContainer}>
        {pageNumbers.map(page => {
          if (page < 0) {
            // Render ellipsis
            return (
              <Text key={`ellipsis-${page}`} style={styles.ellipsis}>
                ...
              </Text>
            );
          }

          return (
            <TouchableOpacity
              key={`page-${page}`}
              style={[styles.pageNumberButton, currentPage === page && styles.currentPageButton]}
              onPress={() => onPageChange(page)}
            >
              <Text style={[styles.pageNumberText, currentPage === page && styles.currentPageText]}>{page}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={[styles.pageButton, !has_next_page && styles.disabledButton]} onPress={onNextPage} disabled={!has_next_page}>
        <Text style={[styles.buttonText, !has_next_page && styles.disabledText]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#6200ee',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#9e9e9e',
  },
  pageNumbersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  pageNumberButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 3,
    backgroundColor: '#f0f0f0',
  },
  currentPageButton: {
    backgroundColor: '#6200ee',
  },
  pageNumberText: {
    color: '#333',
    fontWeight: '500',
  },
  currentPageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ellipsis: {
    marginHorizontal: 5,
    color: '#666',
  },
});
