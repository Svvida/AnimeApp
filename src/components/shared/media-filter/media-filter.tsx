import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export interface FilterOption<T> {
  value: T | undefined;
  label: string;
}

interface MediaFilterProps<T extends string | undefined> {
  currentFilter?: T;
  onFilterChange: (filter?: T) => void;
  filters: FilterOption<T>[];
}

export function MediaFilter<T extends string | undefined>({ currentFilter, onFilterChange, filters }: MediaFilterProps<T>) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {filters.map(filter => (
        <TouchableOpacity
          key={filter.label}
          onPress={() => onFilterChange(filter.value)}
          style={[styles.filterButton, currentFilter === filter.value && styles.activeFilter]}
        >
          <Text style={[styles.filterText, currentFilter === filter.value && styles.activeFilterText]}>{filter.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    height: 50,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
