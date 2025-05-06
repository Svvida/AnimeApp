import React, { useEffect, useState } from 'react'; // Import useRef, useState
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { DetailButton } from '@/components/shared/detail-button/detail-button';
import { Header } from '@/components/shared/detail-header/detail-header';
import { ErrorState } from '@/components/shared/error-state/error-state';
import { InfoItem } from '@/components/shared/info-item/info-item';
import { LoadingState } from '@/components/shared/loading-state/loading-state';
import { ReactionDisplay } from '@/components/views/reviews/reaction-display';
import { useTypedDispatch, useTypedSelector } from '@/hooks/use-store-hooks';
import { useSnackbar } from '@/providers/snackbar/snackbar-context';
import { selectReviewForDetail, clearSelectedReviewForDetail } from '@/redux/slices/review-slice';
import { openExternalLink } from '@/utils/linking';
import { safeDateFormat } from '@/utils/utils'; // Adjust path

const ReviewDetailView = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useTypedDispatch();
  const { showSnackbar } = useSnackbar();

  const reviewFromStore = useTypedSelector(selectReviewForDetail);

  const reviewId = id ? parseInt(id, 10) : undefined;

  const [isReady, setIsReady] = useState(false);

  // Check if the currently stored review matches the ID from the URL
  const review = reviewFromStore && reviewFromStore.mal_id === reviewId ? reviewFromStore : null;

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    dispatch(clearSelectedReviewForDetail()); // Clear state BEFORE navigating
    router.push('/reviews');
  };

  if (!reviewId) {
    return <ErrorState message="Review ID missing." onBack={() => router.push('/reviews')} />;
  }

  if (!isReady && !review) {
    return <LoadingState />;
  }

  if (isReady && !review) {
    return (
      <ErrorState message="Review data not found." subtext="Please navigate back to the list and select a review." onBack={handleBack} /> // Use handleBack here too
    );
  }

  const currentReview = review!;

  return (
    <>
      <Header onBack={handleBack} title={'Review of: ' + currentReview.entry.title} />
      <Stack.Screen options={{ title: `Review by ${currentReview.user.username}` }} />

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <DetailButton
          text={`View anime on MAL`}
          icon="open-outline"
          onPress={async () => await openExternalLink(currentReview.entry.url, showSnackbar)}
        />
        <View style={styles.animeHeader}>
          <Image
            source={{ uri: currentReview.entry.images.webp.large_image_url || currentReview.entry.images.jpg.large_image_url }}
            style={styles.animeImage}
          />
          <View style={styles.animeHeaderText}>
            <Text style={styles.animeTitle}>{currentReview.entry.title}</Text>
            <InfoItem label="Score" value={`${currentReview.score}/10`} />
            <View style={styles.tagsContainer}>
              {currentReview.tags.map(tag => (
                <View key={tag} style={[styles.tag, styles.generalTag]}>
                  <Text style={[styles.tagText, styles.generalTagText]}>{tag}</Text>
                </View>
              ))}
              {currentReview.is_spoiler && (
                <View style={[styles.tag, styles.spoilerTag]}>
                  <Text style={[styles.tagText, styles.spoilerTagText]}>SPOILER</Text>
                </View>
              )}
              {currentReview.is_preliminary && (
                <View style={[styles.tag, styles.preliminaryTag]}>
                  <Text style={[styles.tagText, styles.preliminaryTagText]}>PRELIMINARY</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviewer Details</Text>
          <DetailButton
            text={`View ${currentReview.user.username}'s Profile`}
            icon="person-circle-outline"
            onPress={async () => await openExternalLink(currentReview.user.url, showSnackbar)}
          />
          <View style={styles.userInfoContainer}>
            <Image source={{ uri: currentReview.user.images.webp.image_url || currentReview.user.images.jpg.image_url }} style={styles.userAvatar} />
            <View style={styles.userInfoText}>
              <Text style={styles.username}>{currentReview.user.username}</Text>
              <View style={styles.infoItemsRow}>
                {currentReview.date && <InfoItem label="Reviewed on" value={safeDateFormat(currentReview.date, 'MMM D, YYYY')!.toString()} />}
                {currentReview.episodes_watched !== null && <InfoItem label="Episodes Watched" value={currentReview.episodes_watched} />}
              </View>
            </View>
          </View>
          <DetailButton
            text="View Original Review on MAL"
            icon="open-outline"
            onPress={async () => await openExternalLink(currentReview.url, showSnackbar)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Full Review</Text>
          <Text style={styles.reviewText}>{currentReview.review}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reactions</Text>
          <View style={styles.reactionsGrid}>
            <ReactionDisplay label="Overall" count={currentReview.reactions.overall} iconName="star-outline" />
            <ReactionDisplay label="Nice" count={currentReview.reactions.nice} iconName="thumbs-up-outline" />
            <ReactionDisplay label="Love it" count={currentReview.reactions.love_it} iconName="heart-outline" />
            <ReactionDisplay label="Funny" count={currentReview.reactions.funny} iconName="happy-outline" />
            <ReactionDisplay label="Confusing" count={currentReview.reactions.confusing} iconName="help-circle-outline" />
            <ReactionDisplay label="Informative" count={currentReview.reactions.informative} iconName="information-circle-outline" />
            <ReactionDisplay label="Well Written" count={currentReview.reactions.well_written} iconName="create-outline" />
            <ReactionDisplay label="Creative" count={currentReview.reactions.creative} iconName="bulb-outline" />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 6,
  },
  animeHeader: {
    flexDirection: 'row',
    // marginBottom: 20, // Button provides margin now
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
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10, // Button provides margin now
  },
  userAvatar: {
    width: 50, // Slightly larger avatar
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfoText: {
    flex: 1, // Allow text section to take available space
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6, // Space below username
  },
  infoItemsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow info items to wrap if needed
  },
  // Removed date/episodes watched styles, using InfoItem now
  reviewText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    textAlign: 'justify', // Justify text for better reading
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 6, // Add margin bottom for wrapping
    alignSelf: 'flex-start', // Prevent tags from stretching full width
  },
  generalTag: {
    backgroundColor: '#e7f3ff',
    borderColor: '#cfe2ff',
    borderWidth: 1,
  },
  spoilerTag: {
    backgroundColor: '#ffebee',
    borderColor: '#ffcdd2',
    borderWidth: 1,
  },
  preliminaryTag: {
    backgroundColor: '#fff3e0',
    borderColor: '#ffe0b2',
    borderWidth: 1,
  },
  tagText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  generalTagText: {
    color: '#0d6efd',
  },
  spoilerTagText: {
    color: '#d32f2f',
  },
  preliminaryTagText: {
    color: '#ff8f00',
  },
  reactionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow reactions to wrap
    marginTop: 10,
  },
});

export default ReviewDetailView;
