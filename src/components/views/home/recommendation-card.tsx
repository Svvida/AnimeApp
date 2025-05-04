import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { RecommendationEntry } from '@/contract/general';

interface RecommendationCardProps {
  item: RecommendationEntry;
  type: 'anime' | 'manga';
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ item, type }) => {
  const router = useRouter();

  const handlePress = () => {
    if (type === 'anime') {
      router.push({
        pathname: '/anime-detail',
        params: { id: item.mal_id },
      });
    } else {
      router.push({
        pathname: '/manga-detail',
        params: { id: item.mal_id },
      });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.images.jpg.image_url }} style={styles.image} resizeMode="cover" />
      </View>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    marginRight: 12,
  },
  imageContainer: {
    width: 120,
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
  },
});
