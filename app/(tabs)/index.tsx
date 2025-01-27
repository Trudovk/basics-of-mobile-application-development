import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardList } from '@/components/ui/CardList';

export default function HomeScreen() {

  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={styles.text}>Home Screen</Text>
      <CardList /> 
    </SafeAreaView>
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
});
