import React, { useEffect, useState } from 'react'; // Import useRef, useState
import { StyleSheet, View, Text, Image, ScrollView, Linking } from 'react-native';
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
import { safeDateFormat } from '@/utils/utils'; // Adjust path

// Helper to open URLs safely (same as before)
const openUrl = async (url: string, showSnackbar: (opts: any) => void) => {
  // ... (implementation remains the same)
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      showSnackbar({ text: `Cannot open URL: ${url}`, variant: 'error' });
    }
  } catch (error) {
    console.error('Failed to open URL:', error);
    showSnackbar({ text: 'Failed to open link.', variant: 'error' });
  }
};
export default function ReviewDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useTypedDispatch();
  const { showSnackbar } = useSnackbar();

  // Select review from Redux store
  const reviewFromStore = useTypedSelector(selectReviewForDetail);

  const reviewId = id ? parseInt(id, 10) : undefined;

  // State to track if the component has finished its initial mount and effect cycle
  const [isReady, setIsReady] = useState(false);

  // Check if the currently stored review matches the ID from the URL
  const review = reviewFromStore && reviewFromStore.mal_id === reviewId ? reviewFromStore : null;

  useEffect(() => {
    // Mark as ready after the first render.
    // This helps prevent showing the "not found" error prematurely
    // if Redux state updates slightly after the initial mount.
    const timer = setTimeout(() => setIsReady(true), 0); // Set ready on next tick

    // IMPORTANT: Remove the cleanup dispatch from here
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []); // Run only once on mount

  // --- Handlers ---
  const handleBack = () => {
    dispatch(clearSelectedReviewForDetail()); // <-- Clear state BEFORE navigating
    // router.back(); // <-- Replace this
    router.push('/reviews'); // <-- Explicitly navigate to the list route
  };

  // --- Render Logic ---
  if (!reviewId) {
    // Use explicit navigation for the error button too
    return <ErrorState message="Review ID missing." onBack={() => router.push('/reviews')} />;
  }

  // Show Loading state initially until isReady is true OR review is found
  if (!isReady && !review) {
    return <LoadingState />;
  }

  // If ready and still no matching review, show error
  if (isReady && !review) {
    return (
      <ErrorState message="Review data not found." subtext="Please navigate back to the list and select a review." onBack={handleBack} /> // Use handleBack here too
    );
  }

  // --- If we reach here, 'review' is valid and matches 'reviewId' ---
  // Since the above checks passed, we can safely assert review is not null
  const currentReview = review!;

  // --- If we reach here, 'review' is valid and matches 'reviewId' ---

  return (
    <>
      <Header onBack={handleBack} title={currentReview.entry.title} />
      <Stack.Screen options={{ title: `Review by ${currentReview.user.username}` }} />

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* --- Anime Header --- */}
        <DetailButton
          text={`View ${currentReview.entry.title} on MAL`}
          icon="open-outline"
          onPress={async () => openUrl(currentReview.entry.url, showSnackbar)}
          style={styles.animeLinkButton}
        />
        <View style={styles.animeHeader}>
          {/* ... rest of anime header JSX ... */}
          <Image
            source={{ uri: currentReview.entry.images.webp.large_image_url || currentReview.entry.images.jpg.large_image_url }}
            style={styles.animeImage}
          />
          <View style={styles.animeHeaderText}>
            <Text style={styles.animeTitle}>{currentReview.entry.title}</Text>
            <InfoItem label="Score" value={`${currentReview.score}/10`} />
            {/* Tags */}
            <View style={styles.tagsContainer}>
              {/* ... tag mapping ... */}
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

        {/* --- User & Review Info --- */}
        <View style={styles.section}>
          {/* ... rest of user/review info JSX ... */}
          <Text style={styles.sectionTitle}>Reviewer Details</Text>
          <DetailButton
            text={`View ${currentReview.user.username}'s Profile`}
            icon="person-circle-outline"
            onPress={async () => openUrl(currentReview.user.url, showSnackbar)}
            style={styles.userLinkButton}
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
            onPress={async () => openUrl(currentReview.url, showSnackbar)}
            style={styles.reviewLinkButton}
          />
        </View>

        {/* --- Review Text --- */}
        <View style={styles.section}>
          {/* ... rest of review text JSX ... */}
          <Text style={styles.sectionTitle}>Full Review</Text>
          <Text style={styles.reviewText}>{currentReview.review}</Text>
        </View>

        {/* --- Reactions --- */}
        <View style={styles.section}>
          {/* ... rest of reactions JSX ... */}
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
}

// Styles (keep the styles defined previously)
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
  animeLinkButton: {
    // Example style for button placement
    marginBottom: 10,
    alignSelf: 'flex-start',
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
  userLinkButton: {
    // Example style for button placement
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  reviewLinkButton: {
    // Example style for button placement
    marginTop: 10,
    alignSelf: 'flex-start',
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
  // ... other styles like reactionChip etc ...
  reactionChip: {
    // Assuming ReactionDisplay uses this style
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  reactionIcon: {
    // Assuming ReactionDisplay uses this style
    marginRight: 5,
  },
  reactionText: {
    // Assuming ReactionDisplay uses this style
    fontSize: 13,
    color: '#444',
  },
});
