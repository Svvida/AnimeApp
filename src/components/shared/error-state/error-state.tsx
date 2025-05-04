import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ErrorState = ({ message, subtext, onBack }: { message: string; subtext?: string; onBack: () => void }) => (
  <View style={styles.errorContainer}>
    <Ionicons name="alert-circle" size={50} color="#d32f2f" />
    <Text style={styles.errorText}>{message}</Text>
    {subtext && <Text style={styles.errorSubtext}>{subtext}</Text>}
    <TouchableOpacity style={styles.backButtonError} onPress={onBack}>
      <Text style={styles.backButtonText}>Go Back</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 12,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButtonError: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});
