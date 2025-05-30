import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReactionDisplayProps {
  label: string;
  count: number;
  iconName: keyof typeof Ionicons.glyphMap;
}

export const ReactionDisplay: React.FC<ReactionDisplayProps> = ({ label, count, iconName }) => {
  if (count === 0) {
    return null;
  }

  return (
    <View style={styles.reactionChip}>
      <Ionicons name={iconName} size={16} color="#555" style={styles.reactionIcon} />
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
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  reactionIcon: {
    marginRight: 5,
  },
  reactionText: {
    fontSize: 13,
    color: '#444',
  },
  reactionCount: {
    fontWeight: 'bold',
  },
});
