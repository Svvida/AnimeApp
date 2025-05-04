import { View, Text, StyleSheet } from 'react-native';
import { InfoItem } from '@/components/shared/info-item/info-item';
import { MangaDetail } from '@/contract/manga';

export const MangaInformation = ({ mangaDetail }: { mangaDetail: MangaDetail }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Information</Text>
      <View style={styles.infoGrid}>
        <InfoItem label="Status" value={mangaDetail.status} />
        <InfoItem label="Chapters" value={mangaDetail.chapters != null ? mangaDetail.chapters : 'Unknown'} />
        <InfoItem label="Volumes" value={mangaDetail.volumes != null ? mangaDetail.volumes : 'Unknown'} />
        <InfoItem label="Scored By" value={mangaDetail.scored_by.toLocaleString()} />
        <InfoItem label="Rank" value={`#${mangaDetail.rank}`} />
        <InfoItem label="Popularity" value={`#${mangaDetail.popularity}`} />
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
