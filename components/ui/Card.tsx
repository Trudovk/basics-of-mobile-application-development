import { View, Text, StyleSheet, Image } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { Link } from 'expo-router';

export const Card = ({
  id,
  title,
  description,
  img,
}: {
  id: string;
  title: string;
  description: string;
  img?: string;
}) => {
  return (
    <Link href={`/posts/${id}`} style={styles.link}>
      <ThemedView style={styles.card}>
        {img && <Image source={{ uri: img }} style={styles.image} />}
        <View style={styles.textconteiner}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.description}>{description}</ThemedText>
        </View>
      </ThemedView>
    </Link>
  );
};

const styles = StyleSheet.create({
  link: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
  card: {
    width: '100%',
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
