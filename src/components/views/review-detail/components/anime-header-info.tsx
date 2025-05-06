import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TagsDisplay } from './tags-display';
import { InfoItem } from '@/components/shared/info-item/info-item';

interface AnimeHeaderInfoProps {
  title: string;
  imageUrl: string;
  score: number;
  tags: string[];
  isSpoiler: boolean;
  isPreliminary: boolean;
}

export const AnimeHeaderInfo = ({ title, imageUrl, score, tags, isSpoiler, isPreliminary }: AnimeHeaderInfoProps) => {
  return (
    <View style={styles.animeHeader}>
      <Image source={{ uri: imageUrl }} style={styles.animeImage} />
      <View style={styles.animeHeaderText}>
        <Text style={styles.animeTitle}>{title}</Text>
        <InfoItem label="Score" value={`${score}/10`} />
        <TagsDisplay tags={tags} isSpoiler={isSpoiler} isPreliminary={isPreliminary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  animeHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  animeImage: {
    width: 80,
    height: 120,
    borderRadius: 6,
    marginRight: 12,
  },
  animeHeaderText: {
    flex: 1,
    justifyContent: 'space-between',
  },
  animeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
});
