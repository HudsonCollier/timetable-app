import { Platform, View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { searchDepartures } from '@/services/api';
import StationSearch from '@/components/stationSearch';

type timetableEntry = {
  departureTime: string,
  direction: string,
  trainNumber: string,
  departurePlatform: string,
  intermediateStations: string[]
}

export default function ResultsScreen() {
  const { station, code } = useLocalSearchParams();
  const[departures, setDepartures] = useState<timetableEntry[]>([]);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState("");
  const [selectedStation, setSelectedStation] = useState(station as string);

  useEffect(() => {
    if(station) {
      console.log("Station is not empty")
      fetchTimetable(code as string);
    }
  }, [station, code]);

  // const deps = [
  //   { time: "07:15", destination: "Amsterdam Centraal", platform: "5", trainNumber: "IC 142" },
  //   { time: "07:22", destination: "Rotterdam Blaak", platform: "3", trainNumber: "Sprinter 2103" },
  //   { time: "07:30", destination: "The Hague HS", platform: "8", trainNumber: "IC 154" },
  //   { time: "07:35", destination: "Utrecht Centraal", platform: "1", trainNumber: "Sprinter 2125" },
  //   { time: "07:41", destination: "Eindhoven", platform: "7", trainNumber: "IC 170" },
  //   { time: "07:50", destination: "Leiden Centraal", platform: "2", trainNumber: "Sprinter 2309" },
  // ];

  const fetchTimetable = async (station: string) => {
    try {
      setLoading(true);
      setError("");

      const results = await searchDepartures(station);
      setDepartures(Array.isArray(results) ? results  : [results]);
    } catch (err) {
      setError("Could not retrieve timetable");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.screen}>
      <View style={styles.statusBarBackground} />
      <StatusBar barStyle="light-content" backgroundColor="#120b39" />

      <SafeAreaView style={styles.container}>
        <View style={styles.searchSection}>
          <Text style={styles.title}>Station boards</Text>

          <TextInput
            style={styles.input}
            placeholder="Search for station..."
            placeholderTextColor="#999"
            value={station as string}
          />
          <TextInput
            style={styles.input}
            placeholder="Departure time..."
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={18} color="#000" />
            <Text style={styles.filterText}>Filters</Text>
          </TouchableOpacity>
        </View>





        <ScrollView
          style={styles.resultsContainer}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {departures.map((dep, index) => (
            <TouchableOpacity
              key={index}
              style={styles.resultCard}
              onPress={() => {
                console.log("Selected", dep.trainNumber);
              }}
            >
              <View style={styles.resultRow}>
                <Text style={styles.departureTime}>{dep.departureTime}</Text>
                <View style={styles.destinationBlock}>
                  <Text style={styles.destination}>{dep.direction}</Text>
                  <Text style={styles.platform}>Pl. {dep.departurePlatform}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
  
}


const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: '#fff',
    },
    statusBarBackground: {
      height: Platform.OS === 'android' ? StatusBar.currentHeight : 70,
      backgroundColor: '#120b39',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    searchSection: {
      backgroundColor: '#120b39',
      paddingTop: 12,
      paddingBottom: 16,
      paddingHorizontal: 16,
    },
    title: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 14,
      textAlign: 'center',
    },
    input: {
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 10,
      fontSize: 16,
      marginBottom: 10,
      color: '#000',
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ffd33d',
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 10,
      alignSelf: 'flex-start',
      marginTop: 6,
    },
    filterText: {
      marginLeft: 8,
      color: '#000',
      fontWeight: 'bold',
      fontSize: 16,
    },
    resultsContainer: {
      flex: 1,
      backgroundColor: '#f9f9f9',
    },
    resultCard: {
      backgroundColor: '#fff',
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e5e5',
    },
    resultRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    departureTime: {
      fontSize: 16,
      fontWeight: '600',
      color: '#222',
    },
    destinationBlock: {
      flex: 1,
      marginLeft: 14,
    },
    destination: {
      fontSize: 16,
      fontWeight: '600',
      color: '#0a0a23',
    },
    platform: {
      fontSize: 14,
      color: '#666',
      marginTop: 2,
    },
  });
  
  
