import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RecommendationCard } from './recommendation-card';
import { RecommendationEntry, RecommendationItem } from '@/contract/general';

interface RecommendationListProps {
  title: string;
  data?: RecommendationItem[];
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
  type: 'anime' | 'manga';
  onViewAllPress?: () => void;
}

export const RecommendationList: React.FC<RecommendationListProps> = ({ title, data, isLoading, error, type, onViewAllPress }) => {
  // Extract unique entries from recommendations and flatten them
  const entries = useMemo(() => {
    if (!data) return [];

    // First, collect all entries from all recommendation items
    const allEntries: RecommendationEntry[] = [];
    data.forEach(item => {
      item.entry.forEach(entry => {
        allEntries.push(entry);
      });
    });

    // Then filter out duplicates by mal_id
    const uniqueEntries: RecommendationEntry[] = [];
    const seenIds = new Set();

    allEntries.forEach(entry => {
      if (!seenIds.has(entry.mal_id)) {
        seenIds.add(entry.mal_id);
        uniqueEntries.push(entry);
      }
    });

    // Return limited number of entries
    return uniqueEntries.slice(0, 20);
  }, [data]);

  if (isLoading) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200ee" />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load recommendations</Text>
        </View>
      </View>
    );
  }

  if (!data || entries.length === 0) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No recommendations available</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={onViewAllPress} style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
          <Ionicons name="chevron-forward" size={16} color="#6200ee" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={entries}
        renderItem={({ item }) => <RecommendationCard item={item} type={type} />}
        keyExtractor={item => `${type}-${item.mal_id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#6200ee',
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#d32f2f',
    fontWeight: '500',
  },
  emptyContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontWeight: '500',
  },
});
