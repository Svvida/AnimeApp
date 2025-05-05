// src/components/reviews/_components/ReactionDisplay.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReactionDisplayProps {
  label: string;
  count: number;
  iconName: keyof typeof Ionicons.glyphMap; // Ensures a valid icon name is passed
}

export const ReactionDisplay: React.FC<ReactionDisplayProps> = ({ label, count, iconName }) => {
  // Don't render anything if the count is zero
  if (count === 0) {
    return null;
  }

  return (
    <View style={styles.reactionChip}>
      <Ionicons name={iconName} size={16} color="#555" style={styles.reactionIcon} />
      {/* Display the count first, then the label for clarity */}
      <Text style={styles.reactionText}>
        <Text style={styles.reactionCount}>{count}</Text> {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reactionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light grey background
    borderRadius: 16, // Pill shape
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8, // Spacing between chips
    marginBottom: 8, // Spacing for wrapping
  },
  reactionIcon: {
    marginRight: 5, // Space between icon and text
  },
  reactionText: {
    fontSize: 13,
    color: '#444', // Darker grey text
  },
  reactionCount: {
    fontWeight: 'bold', // Make the number stand out
  },
});

// No default export needed if you import it directly as { ReactionDisplay }
// export default ReactionDisplay;
