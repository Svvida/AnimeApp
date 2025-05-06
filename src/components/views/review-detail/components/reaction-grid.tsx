import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ReactionDisplay } from '@/components/views/reviews/reaction-display';

interface ReviewReactions {
  overall: number;
  nice: number;
  love_it: number;
  funny: number;
  confusing: number;
  informative: number;
  well_written: number;
  creative: number;
}

interface ReactionGridProps {
  reactions: ReviewReactions;
}

export const ReactionGrid = ({ reactions }: ReactionGridProps) => {
  const hasAnyReaction = Object.values(reactions).some(count => count > 0);

  if (!hasAnyReaction) {
    return (
      <View style={styles.noReactionsContainer}>
        <Text style={styles.noReactionsText}>No reactions yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.reactionsGrid}>
      <ReactionDisplay label="Overall" count={reactions.overall} iconName="star-outline" />
      <ReactionDisplay label="Nice" count={reactions.nice} iconName="thumbs-up-outline" />
      <ReactionDisplay label="Love it" count={reactions.love_it} iconName="heart-outline" />
      <ReactionDisplay label="Funny" count={reactions.funny} iconName="happy-outline" />
      <ReactionDisplay label="Confusing" count={reactions.confusing} iconName="help-circle-outline" />
      <ReactionDisplay label="Informative" count={reactions.informative} iconName="information-circle-outline" />
      <ReactionDisplay label="Well Written" count={reactions.well_written} iconName="create-outline" />
      <ReactionDisplay label="Creative" count={reactions.creative} iconName="bulb-outline" />
    </View>
  );
};

const styles = StyleSheet.create({
  reactionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  noReactionsContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  noReactionsText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
});
