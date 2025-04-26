import { LinearGradient } from 'expo-linear-gradient';
import TrainLookup from '@/components/TripSearch';
import { View, StyleSheet} from 'react-native';

export default function Home() {
  return (
    <LinearGradient
      colors={['#0f2027', '#203a43', '#2c5364']}
      style={styles.container}
    >
      <TrainLookup />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
