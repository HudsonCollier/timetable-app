import { LinearGradient } from "expo-linear-gradient";
import TrainLookup from "@/components/TripSearch";
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
} from "react-native";
import { TrainInfo } from "@/types";
import { useState, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";

export default function MyTripsHomeScreen() {
  const [trips, setTrips] = useState<TrainInfo[]>([]);
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
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>My Trips</Text>
            <TouchableOpacity 
    onPress={() => router.push("/trips/passport")} 
    style={styles.profileButton}
    activeOpacity={0.8}
  >
    <Ionicons name="person-circle-outline" size={40} color="#000" />
  </TouchableOpacity>
          </View>

          
          <TrainLookup
            onAddTrip={(trip: TrainInfo) => setTrips((prev) => [...prev, trip])}
          />
        </View>
        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Trips</Text>
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
                    Departure: {dep.departureTime} (Pl.{" "}
                    {dep.departurePlatformNumber ?? "?"}){"   "}
                    Arrival: {dep.arrivalTime} (Pl.{" "}
                    {dep.arrivalPlatformNumber ?? "?"})
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
    backgroundColor: "#121212", 
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  searchSection: {
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 7,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    color: "#fff",           
    fontSize: 24,            
    fontWeight: "bold",
    marginBottom: 6,     
  },  
  resultsContainer: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    marginTop: 8,
  },
  resultCard: {
    backgroundColor: "#1e1e1e",    
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trainLookupContainer: {
    marginTop: 0,
    paddingVertical: 10,
    width: "100%",
    height: "25%",
  },
  detailText: {
    fontSize: 14,
    color: "#bbb",               
    marginTop: 2,
  },
  departureTime: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",               
  },
  destination: {
    fontSize: 15,
    fontWeight: "500",
    color: "#f1c40f",           
    marginTop: 2,
  },
  profileButton: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: "#2c3e50", 
    borderWidth: 2,
    borderColor: "#f1c40f",   
  },
  sectionTitle: {
    color: "#ffffff",      
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 2,
    marginBottom: 8,
    marginHorizontal: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#444444", 
    marginHorizontal: 0,
    marginBottom: 12,
    opacity: 0.6,
  },
});





