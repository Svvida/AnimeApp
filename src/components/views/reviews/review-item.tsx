import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { ReviewItem } from '@/contract/review';
import { safeDateFormat } from '@/utils/utils';

interface ReviewItemProps {
  review: ReviewItem;
  onPress: (review: ReviewItem) => void;
}

export const ReviewListItem: React.FC<ReviewItemProps> = ({ review, onPress }) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(review)} activeOpacity={0.7}>
      <View style={styles.header}>
        <Image source={{ uri: review.entry.images.jpg.image_url }} style={styles.animeImage} />
        <View style={styles.headerText}>
          <Text style={styles.animeTitle}>{review.entry.title}</Text>
          <Text style={styles.score}>Score: {review.score}/10</Text>
        </View>
      </View>

      <View style={styles.reviewInfo}>
        <View style={styles.userInfo}>
          <Image source={{ uri: review.user.images.jpg.image_url }} style={styles.userAvatar} />
          <Text style={styles.username}>{review.user.username}</Text>
          <Text style={styles.date}>{safeDateFormat(review.date, 'MMM D, YYYY')}</Text>
        </View>

        {review.is_spoiler && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>SPOILER</Text>
          </View>
        )}

        {review.is_preliminary && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>PRELIMINARY</Text>
          </View>
        )}
      </View>

      <Text style={styles.reviewText}>{truncateText(review.review, 150)}</Text>

      <View style={styles.reactions}>
        <View style={styles.reactionItem}>
          <Text style={styles.reactionCount}>{review.reactions.overall}</Text>
          <Text style={styles.reactionLabel}>Overall</Text>
        </View>
        <View style={styles.reactionItem}>
          <Text style={styles.reactionCount}>{review.reactions.nice}</Text>
          <Text style={styles.reactionLabel}>Nice</Text>
        </View>
        <View style={styles.reactionItem}>
          <Text style={styles.reactionCount}>{review.reactions.love_it}</Text>
          <Text style={styles.reactionLabel}>Love it</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  animeImage: {
    width: 60,
    height: 90,
    borderRadius: 6,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  animeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  score: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  username: {
    fontSize: 13,
    fontWeight: '500',
    color: '#555',
    marginRight: 8,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  reviewInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 12,
  },
  reactions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  reactionItem: {
    marginRight: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  reactionCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginRight: 4,
  },
  reactionLabel: {
    fontSize: 12,
    color: '#777',
  },
  tag: {
    backgroundColor: '#ffebee',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 6,
  },
  tagText: {
    fontSize: 10,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
});
