import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Post } from '@/components/ui/CardList';

export default function PostScreen() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://pocketbase-front-323.fjx.su/api/collections/posts/records/${id}`,
        );
        const result = await response.json();
        setPost(result);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: 'Loading...' }} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={Colors[colorScheme ?? 'light'].tint}
          />
        </View>
      </>
    );
  }

  if (!post || !post.id) {
    return <Redirect href="/+not-found" />;
  }

  return (
    <>
      <Stack.Screen options={{ title: post.header }} />
      <ThemedView style={styles.container}>
        {post.image && (
          <Image
            source={{
              uri: `https://pocketbase-front-323.fjx.su/api/files/${post.collectionId}/${post.id}/${post.image}`,
            }}
            style={styles.image}
          />
        )}
        <ThemedText style={styles.text}>{post.text}</ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
