import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReviewFilterControlsProps {
  spoilersFilter: boolean | undefined;
  preliminaryFilter: boolean | undefined;
  onSpoilersChange: (value: boolean | undefined) => void;
  onPreliminaryChange: (value: boolean | undefined) => void;
}

const getNextFilterState = (currentState: boolean | undefined): boolean | undefined => {
  if (currentState === undefined) return true;
  if (currentState) return false;
  return undefined;
};

const getFilterButtonState = (filterValue: boolean | undefined): { text: string; icon: keyof typeof Ionicons.glyphMap; color: string } => {
  if (filterValue === true) return { text: 'Yes', icon: 'checkmark-circle', color: '#4CAF50' };
  if (filterValue === false) return { text: 'No', icon: 'close-circle', color: '#F44336' };
  return { text: 'Any', icon: 'help-circle-outline', color: '#9E9E9E' };
};
export const ReviewFilterControls: React.FC<ReviewFilterControlsProps> = ({
  spoilersFilter,
  preliminaryFilter,
  onSpoilersChange,
  onPreliminaryChange,
}) => {
  const nextSpoilersState = getNextFilterState(spoilersFilter);
  const nextPreliminaryState = getNextFilterState(preliminaryFilter);

  const spoilersButtonState = getFilterButtonState(spoilersFilter);
  const preliminaryButtonState = getFilterButtonState(preliminaryFilter);
  return (
    <View style={styles.container}>
      <View style={styles.filterGroup}>
        <Text style={styles.label}>Spoilers:</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: spoilersButtonState.color }]} onPress={() => onSpoilersChange(nextSpoilersState)}>
          <Ionicons name={spoilersButtonState.icon} size={16} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>{spoilersButtonState.text}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.label}>Preliminary:</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: preliminaryButtonState.color }]}
          onPress={() => onPreliminaryChange(nextPreliminaryState)}
        >
          <Ionicons name={preliminaryButtonState.icon} size={16} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>{preliminaryButtonState.text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    minWidth: 70,
    justifyContent: 'center',
  },
  icon: {
    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
