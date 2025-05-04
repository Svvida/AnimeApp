import { View, Text, StyleSheet } from 'react-native';
import { MediaEntity } from '@/contract/general';

export const EntityList = ({ title, entities }: { title: string; entities?: MediaEntity[] }) => {
  if (!entities || entities.length === 0) return null;

  return (
    <View style={styles.entityContainer}>
      <Text style={styles.sectionTitle}>{title}:</Text>
      <View style={styles.tagContainer}>
        {entities.map(entity => (
          <View key={entity.mal_id} style={styles.tag}>
            <Text style={styles.tagText}>{entity.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  entityContainer: {
    marginBottom: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#333',
  },
});
