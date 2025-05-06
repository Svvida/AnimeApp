import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SectionContainerProps {
  title: string;
  children: React.ReactNode;
}

export const SectionContainer = ({ title, children }: SectionContainerProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
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
    color: '#333',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 6,
  },
});
