import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Card } from './Card';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Link } from 'expo-router';

export interface Post {
  id: string;
  header: string;
  text: string;
  image?: string;
  collectionId: string;
}

interface ApiResponse {
  items: Post[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export const CardList = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://pocketbase-front-323.fjx.su/api/collections/posts/records',
      );
      const result: ApiResponse = await response.json();
      setData(result.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={Colors[colorScheme ?? 'light'].tint}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Card
            id={item.id}
            title={item.header}
            description={item.text}
            img={
              item.image
                ? `https://pocketbase-front-323.fjx.su/api/files/${item.collectionId}/${item.id}/${item.image}`
                : undefined
            }
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
