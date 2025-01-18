import React, { useState, useEffect } from 'react';
import { StyleSheet, Switch, Appearance, View, Platform } from 'react-native';
import {
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import * as Haptics from 'expo-haptics';

export default function Settings() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const [isTheme, setTheme] = useState(colorScheme === 'dark');

  useEffect(() => {
    const currentScheme = Appearance.getColorScheme();
    setTheme(currentScheme === 'dark');
  }, []);

  const toggleSwitch = () => {
    const newScheme = isTheme ? 'light' : 'dark';
    setTheme(!isTheme);
    Appearance.setColorScheme(newScheme);

    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else if (Platform.OS === 'android') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.switchContainer}>
        <ThemedText style={styles.switchLabel}>Dark Mode</ThemedText>
        <Switch onValueChange={toggleSwitch} value={isTheme} />
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  switchLabel: {
    fontSize: 18,
  },
});
