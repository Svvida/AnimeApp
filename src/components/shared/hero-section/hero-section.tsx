import { View, Image, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BaseMedia } from '@/contract/media';

export const HeroSection = ({ media }: { media: BaseMedia }) => {
  const imageUrl = media.images.jpg.large_image_url || media.images.jpg.image_url;

  return (
    <View style={styles.heroSection}>
      <Image source={{ uri: imageUrl }} style={styles.heroImage} resizeMode="cover" />
      <View style={styles.overlay} />
      <View style={styles.heroContent}>
        <Image source={{ uri: imageUrl }} style={styles.posterImage} resizeMode="cover" />
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {media.title_english || media.title}
          </Text>
          {media.title_japanese && (
            <Text style={styles.japaneseTitle} numberOfLines={2} ellipsizeMode="tail">
              {media.title_japanese}
            </Text>
          )}
          <View style={styles.infoRow}>
            <Text style={styles.type}>{media.type}</Text>
            <View style={styles.scoreContainer}>
              <Ionicons name="star" size={16} color="#FFC107" />
              <Text style={styles.score}>{media.score?.toFixed(1)}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    position: 'relative',
    height: 250,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  heroContent: {
    position: 'absolute',
    bottom: -60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  posterImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginRight: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  japaneseTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  type: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  score: {
    color: '#fff',
    marginLeft: 4,
    fontWeight: '500',
    fontSize: 12,
  },
});
