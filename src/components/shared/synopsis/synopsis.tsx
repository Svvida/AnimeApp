import { View, StyleSheet, Text } from 'react-native';

export const Synopsis = ({ synopsis }: { synopsis: string }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Synopsis</Text>
      <Text style={styles.synopsis}>{synopsis}</Text>
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
    marginBottom: 8,
    color: '#333',
  },
  synopsis: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
});
