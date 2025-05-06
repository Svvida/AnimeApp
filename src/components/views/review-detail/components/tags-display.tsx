import { StyleSheet, Text, View } from 'react-native';
interface TagsDisplayProps {
  tags: string[];
  isSpoiler: boolean;
  isPreliminary: boolean;
}

export const TagsDisplay = ({ tags, isSpoiler, isPreliminary }: TagsDisplayProps) => {
  return (
    <View style={styles.tagsContainer}>
      {tags.map(tag => (
        <View key={tag} style={[styles.tag, styles.generalTag]}>
          <Text style={[styles.tagText, styles.generalTagText]}>{tag}</Text>
        </View>
      ))}

      {isSpoiler && (
        <View style={[styles.tag, styles.spoilerTag]}>
          <Text style={[styles.tagText, styles.spoilerTagText]}>SPOILER</Text>
        </View>
      )}

      {isPreliminary && (
        <View style={[styles.tag, styles.preliminaryTag]}>
          <Text style={[styles.tagText, styles.preliminaryTagText]}>PRELIMINARY</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 6,
    alignSelf: 'flex-start',
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
});
