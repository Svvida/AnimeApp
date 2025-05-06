import { View, Text, StyleSheet } from 'react-native';
import { InfoItem } from '@/components/shared/info-item/info-item';
import { AnimeDetail } from '@/contract/anime';

export const AnimeInformation = ({ animeDetail }: { animeDetail: AnimeDetail }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Information</Text>
      <View style={styles.infoGrid}>
        <InfoItem label="Status" value={animeDetail.status} />
        <InfoItem label="Episoded" value={animeDetail.episodes != null ? animeDetail.episodes : 'Unknown'} />
        <InfoItem label="Duration" value={animeDetail.duration != null ? animeDetail.duration : 'Unknown'} />
        <InfoItem label="Rating" value={animeDetail.rating} />
        <InfoItem label="Season" value={`${animeDetail.season.charAt(0).toUpperCase() + animeDetail.season.slice(1)} ${animeDetail.year}`} />
        <InfoItem label="Source" value={animeDetail.source} />
        <InfoItem label="Scored By" value={animeDetail.scored_by != null ? animeDetail.scored_by.toLocaleString() : 'Unknown'} />
        <InfoItem label="Rank" value={`#${animeDetail.rank}`} />
        <InfoItem label="Popularity" value={`#${animeDetail.popularity}`} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
