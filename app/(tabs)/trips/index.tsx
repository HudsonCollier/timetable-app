import { LinearGradient } from 'expo-linear-gradient';
import TrainLookup from '@/components/TripSearch';
import { View, StyleSheet, StatusBar, SafeAreaView, TextInput, TouchableOpacity, Text, ScrollView, Platform} from 'react-native';
import { TrainInfo } from '@/types';
import { useState, useLayoutEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

export default function MyTripsHomeScreen() {
  const[trips, setTrips] = useState<TrainInfo[]>([]);
  const navigation = useNavigation();
  const router = useRouter();

// const fetchTrips() = async (user)

// const exampleTrips = [
//     { time: "07:15", destination: "Amsterdam Centraal", platform: "5", trainNumber: "IC 142" },
//     { time: "07:22", destination: "Rotterdam Blaak", platform: "3", trainNumber: "Sprinter 2103" },
//     { time: "07:30", destination: "The Hague HS", platform: "8", trainNumber: "IC 154" },
//     { time: "07:35", destination: "Utrecht Centraal", platform: "1", trainNumber: "Sprinter 2125" },
//     { time: "07:41", destination: "Eindhoven", platform: "7", trainNumber: "IC 170" },
//     { time: "07:50", destination: "Leiden Centraal", platform: "2", trainNumber: "Sprinter 2309" },
//   ];

  return (
    <View style={styles.screen}>
      <View style={styles.statusBarBackground} />
      <StatusBar barStyle="light-content" backgroundColor="#120b39" />

      <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
  <View style={styles.headerRow}>
    <Text style={styles.title}>My Trips</Text>
    <TouchableOpacity onPress={() => router.push('/trips/passport')}>
      <Ionicons name="person-circle-outline" size={30} color="white" />
    </TouchableOpacity>
  </View>

  <View style={styles.trainLookupContainer}>
    <TrainLookup onAddTrip={(trip: TrainInfo) => setTrips(prev => [...prev, trip])} />
  </View>
</View>


        <ScrollView
          style={styles.resultsContainer}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {trips.map((dep, index) => (
            <TouchableOpacity
            key={index}
            style={styles.resultCard}
            onPress={() => console.log("Selected", dep.trainNumber)}
          >
            <View style={styles.resultRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.departureTime}>
                  {dep.departureTime} - Train #{dep.trainNumber}
                </Text>
          
                <Text style={styles.destination}>
                  {dep.departureStation} → {dep.arrivalStation}
                </Text>
          
                <Text style={styles.detailText}>
                  Direction: {dep.direction}
                </Text>
          
                <Text style={styles.detailText}>
                  Departure: {dep.departureTime} (Pl. {dep.departurePlatformNumber ?? "?"}){"   "}
                  Arrival: {dep.arrivalTime} (Pl. {dep.arrivalPlatformNumber ?? "?"})
                </Text>
          
                <Text style={styles.detailText}>
                  Status:{" "}
                  {dep.cancelled
                    ? "Cancelled"
                    : dep.delayed
                    ? `Delayed ${dep.delayDuration} min`
                    : "On Time"}
                </Text>
          
                <Text style={styles.detailText}>
                  Leaves in: {dep.timeUntilDeparture}
                </Text>
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
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 14,
      textAlign: 'left',
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
    trainLookupContainer: {
      marginTop: 0,
      paddingVertical: 10,
      width: '100%',
      height: "25%"
    },
    detailText: {
      fontSize: 14,
      color: '#444',
      marginTop: 2,
    },
    
    departureTime: {
      fontSize: 16,
      fontWeight: '600',
      color: '#222',
    },
    
    destination: {
      fontSize: 15,
      fontWeight: '500',
      color: '#0a0a23',
      marginTop: 2,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
    },
    
  });
  
  

