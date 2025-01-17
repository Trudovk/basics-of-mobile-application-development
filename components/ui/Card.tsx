import { View, Text, StyleSheet, Image } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

export const Card = ({
  title,
  description,
  img,
}: {
  title: string;
  description: string;
  img?: string;
}) => {
  return (
    <ThemedView style={styles.card}>
      {img && <Image source={{ uri: img }} style={styles.image} />}
      <View style={styles.textconteiner}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        <ThemedText style={styles.description}>{description}</ThemedText>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    marginTop: 8,
  },
  textconteiner: {
    padding: 16,
  },
});
