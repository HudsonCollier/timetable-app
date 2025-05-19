import { Text, View, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StationSearch from '@/components/stationSearch';
import TimetableSearch from '@/components/TimetableSearch';


import { useRouter } from 'expo-router';

export default function TimetablesSearchScreen() {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/dutchPic.jpg')}
        style={styles.headerImage}
        resizeMode="cover"
      >
        <Text style={styles.headerText}>Find a Timetable</Text>
      </ImageBackground>

      <View style={styles.content}>
        <TimetableSearch onSubmit={(station, code) => {
          router.push({ pathname: "/results", params: { station: station.toString(), code: code.toString() } });
        }} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerImage: {
    width: '110%',
    height: 250,
    justifyContent: 'flex-end',
    padding: 20,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});



