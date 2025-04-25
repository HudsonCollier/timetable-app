import { View, StyleSheet } from 'react-native';
import TrainLookup from '@/components/TripSearch'; 

export default function Home() {
  return (
    <View style={styles.container}>
      <TrainLookup />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center', 
  },
});
