import { ViewStyle, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DetailButtonProps {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  style?: ViewStyle;
}

export const DetailButton = ({ onPress, icon, text, style }: DetailButtonProps) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Ionicons name={icon} size={18} color="#fff" style={styles.icon} />
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
});
