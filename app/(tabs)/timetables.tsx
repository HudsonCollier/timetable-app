import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StationSearch from '@/components/stationSearch';

export default function Timetables() {
  return (
    <LinearGradient
      colors={['#0f2027', '#203a43', '#2c5364']}
      style={styles.container}
    >
      <View style={styles.footerContainer} />
      <View style={{ flex: 1 }}>
        <StationSearch />
      </View>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: "600",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});


