import { TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import { BaseMedia } from '@/contract/media';
import { MediaType } from '@/types/media-types';

interface MediaCardProps {
  item: BaseMedia;
  onPress: (item: BaseMedia) => void;
  type: MediaType;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, onPress }) => {
  const handlePress = () => onPress(item);
  const title = item.title_english || item.title;

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image source={{ uri: item.images.jpg.image_url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
        <View style={styles.metaContainer}>
          <Text style={styles.type}>{item.type}</Text>
          <View style={[styles.scoreContainer, styles.scoreContainerNA]}>
            <Text style={styles.score}>{item.score}</Text>
          </View>
        </View>
        <View style={styles.genreContainer}>
          {item.genres.length > 0 ? (
            item.genres.slice(0, 3).map(genre => (
              <View key={genre.mal_id} style={styles.genreTag}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))
          ) : (
            <View style={styles.genreTag}>
              <Text style={styles.genreText}>No genres</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  image: {
    width: 120,
    height: 160,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  type: {
    fontSize: 12,
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  scoreContainer: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  score: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 5,
  },
  genreTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  genreText: {
    fontSize: 10,
  },
  episodeInfo: {
    fontSize: 12,
    color: '#666',
  },
  scoreContainerNA: {
    backgroundColor: '#9e9e9e',
  },
});
