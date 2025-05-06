import { View, Text, StyleSheet, Image } from 'react-native';
import { InfoItem } from '@/components/shared/info-item/info-item';
import { safeDateFormat } from '@/utils/utils';

interface UserInfoDisplayProps {
  username: string;
  imageUrl: string;
  date?: string;
  episodesWatched?: number | null;
}

export const UserInfoDisplay = ({ username, imageUrl, date, episodesWatched }: UserInfoDisplayProps) => {
  return (
    <View style={styles.userInfoContainer}>
      <Image source={{ uri: imageUrl }} style={styles.userAvatar} />
      <View style={styles.userInfoText}>
        <Text style={styles.username}>{username}</Text>
        <View style={styles.infoItemsRow}>
          {date && <InfoItem label="Reviewed on" value={safeDateFormat(date, 'MMM D, YYYY')!.toString()} />}
          {episodesWatched !== null && episodesWatched !== undefined && <InfoItem label="Episodes Watched" value={episodesWatched} />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfoText: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },
  infoItemsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
