import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Button, View } from 'react-native';
import { Card } from './Card';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Post {
  id: string;
  header: string;
  text: string;
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
  const tabHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const paddingBottom = tabHeight + insets.bottom / 2;

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

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Card title={item.header} description={item.text} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.contentContainer]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
});
