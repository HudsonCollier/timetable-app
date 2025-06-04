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
  Alert
} from "react-native";

import { useState, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import { fetchUserTrips, deleteTrip } from "@/services/api";
import React from "react";
import { TripInfo } from "@/types";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default function MyTripsHomeScreen() {
  const [trips, setTrips] = useState<TripInfo[]>([]);
  const navigation = useNavigation();
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const loadTrips = async () => {
        try {
          const result = await fetchUserTrips();
          setTrips(result);
        } catch (e) {
          Alert.alert("Error", "Trip load error.");
        }
      };
      loadTrips();
    }, [])
  );

  const getCityName = (stationName: string): string => {
    const parts = stationName.split(" ");
    return parts[0];
  };

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
            onAddTrip={async () => {
              const updatedTrips = await fetchUserTrips();
              setTrips(updatedTrips);
            }}
          />
        </View>
        <View style={styles.divider} />

        <ScrollView
          style={styles.resultsContainer}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {trips.map((dep, index) => (
            <Swipeable
              key={index}
              renderRightActions={() => (
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      await deleteTrip(dep.id);
                      setTrips((prev) => prev.filter((t) => t.id !== dep.id));
                    } catch (e) {
                      Alert.alert("Error", "Failed to delete trip.");
                    }
                  }}
                  style={{
                    backgroundColor: "red",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 80,
                    marginVertical: 10,
                    borderRadius: 12,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              )}
            >
              <TouchableOpacity
                style={styles.resultCard}
                onPress={() =>
                  router.push({
                    pathname: "/trips/passport",
                    params: { tripId: dep.id },
                  })
                }
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.departureTime}>
                    {dep.departureTime} – #{dep.trainNumber}
                  </Text>
                  <Text style={styles.dateText}>{dep.date}</Text>
                </View>

                <Text style={styles.destination}>
                  {getCityName(dep.departureStationName)} →{" "}
                  {getCityName(dep.arrivalStationName)}
                </Text>

                <Text style={styles.detailText}>
                  Departs from Platform {dep.departurePlatformNumber ?? "?"}
                </Text>

                <Text style={styles.detailText}>
                  Status:{" "}
                  {dep.cancelled
                    ? "Cancelled"
                    : dep.delayed
                    ? `Delayed ${dep.delayDuration} min`
                    : "On Time"}
                </Text>
              </TouchableOpacity>
            </Swipeable>
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
    backgroundColor: "#1f2a44",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: "#bbb",
    fontWeight: "600",
  },
});
