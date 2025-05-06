import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SectionContainer } from './section-container';

interface ReviewContentProps {
  content: string;
}

export const ReviewContent = ({ content }: ReviewContentProps) => {
  return (
    <SectionContainer title="Full Review">
      <Text style={styles.reviewText}>{content}</Text>
    </SectionContainer>
  );
};

const styles = StyleSheet.create({
  reviewText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    textAlign: 'justify',
  },
});
