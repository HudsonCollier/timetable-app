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
  Alert,
} from "react-native";

import { useState, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import { fetchUserTrips, deleteTrip } from "@/services/api";
import React from "react";
import { TripInfo } from "@/types/types";
import Swipeable from "react-native-gesture-handler/Swipeable";


/**
 * Trips home screen that allows users to search for and add a trip, navigate to their
 * lifetime train data screen, as well as view their current live trip and past trips.
 */
export default function MyTripsHomeScreen() {
  const [trips, setTrips] = useState<TripInfo[]>([]);
  const navigation = useNavigation();
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const loadTrips = async () => {
        try {
          const result = await fetchUserTrips();

          const sortedTrips = result.sort((a, b) => {
            if (a.live && !b.live) return -1;
            if (!a.live && b.live) return 1;
            const dateA = new Date(a.date + " " + a.departureTime);
            const dateB = new Date(b.date + " " + b.departureTime);
            return dateB.getTime() - dateA.getTime();
          });

          setTrips(sortedTrips);
        } catch (e) {
          Alert.alert("Error", "Trip load error.");
        }
      };
      loadTrips();
    }, [])
  );

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

              const sorted = updatedTrips.sort((a, b) => {
                if (a.live && !b.live) return -1;
                if (!a.live && b.live) return 1;
                return (
                  new Date(`${b.date}T${b.departureTime}`).getTime() -
                  new Date(`${a.date}T${a.departureTime}`).getTime()
                );
              });

              setTrips(sorted);
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
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Text style={styles.departureTime}>
                      {dep.departureTime} – #{dep.trainNumber}
                    </Text>
                    {dep.live && <Text style={styles.liveTag}>LIVE</Text>}
                  </View>
                  <Text style={styles.dateText}>{dep.date}</Text>
                </View>

                <Text style={styles.destination}>
                  {dep.departureCity} → {dep.arrivalCity}
                </Text>

                {dep.live && dep.timeUntilDeparture && (
                  <Text style={styles.detailText}>
                    Platform {dep.departurePlatformNumber ?? "?"} —{" "}
                    {dep.timeUntilDeparture}
                  </Text>
                )}

                {dep.live && dep.timeUntilDeparture === "Departed" && (
                  <Text style={styles.detailText}>
                    Arriving in {dep.timeUntilArrival ?? "?"}
                  </Text>
                )}

                {!dep.live && (
                  <Text style={styles.detailText}>
                    Platform {dep.departurePlatformNumber ?? "?"}
                  </Text>
                )}

                <Text style={styles.detailText}>
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
    borderTopWidth: 3,
    borderTopColor: "#f1c40f",
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

  departureTime: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
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
    marginBottom: 6,
  },
  dateText: {
    fontSize: 14,
    color: "#bbb",
    fontWeight: "600",
  },

  statusMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  liveTag: {
    backgroundColor: "#00e676",
    color: "#121212",
    fontWeight: "bold",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 6,
    textTransform: "uppercase",
  },

  destination: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f1c40f",
    marginBottom: 4,
  },

  detailText: {
    fontSize: 14,
    color: "#bbb",
    marginTop: 2,
    lineHeight: 20,
  },
});
