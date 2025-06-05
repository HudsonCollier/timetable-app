import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PassportScreen() {
  const router = useRouter();

  const userStats = {
    trains: 42,
    distance: "3,200 km",
    time: "1d 12h",
    stations: 18,
    companies: 4,
    countries: 5,
    delayMinutes: 25,
    avgDelay: 4,
    trips: [
      { from: "Utrecht Centraal", to: "Amsterdam", train: "IC 142", time: "07:15" },
      { from: "Rotterdam", to: "The Hague", train: "Sprinter 2103", time: "08:00" },
    ]
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>Hudson Collier</Text>
          <Text style={styles.subtitle}>My Train Log</Text>
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Static Tabs */}
      <View style={styles.tabs}>
        {["ALL-TIME", "2025", "2024"].map((year, i) => (
          <TouchableOpacity key={i} style={styles.tab}>
            <Text style={styles.tabText}>{year}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* All-Time Stats Card */}
        <TouchableOpacity style={styles.cardBlue} onPress={() => router.push("/trips")}>
          <Text style={styles.cardTitle}>ALL-TIME TRAIN PASSPORT</Text>
          <View style={styles.statsRow}>
            <Text style={styles.stat}>Trains: {userStats.trains}</Text>
            <Text style={styles.stat}>Distance: {userStats.distance}</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.stat}>Time: {userStats.time}</Text>
            <Text style={styles.stat}>Stations: {userStats.stations}</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.stat}>Companies: {userStats.companies}</Text>
            <Text style={styles.stat}>Countries: {userStats.countries}</Text>
          </View>
          <Text style={styles.detailLink}>All Train Stats →</Text>
        </TouchableOpacity>

        {/* Delay Card */}
        <View style={styles.cardRed}>
          <Text style={styles.cardTitle}>Delays Summary</Text>
          <Text style={styles.statLarge}>{userStats.delayMinutes} min lost from delays</Text>
          <Text style={styles.subText}>Avg delay: {userStats.avgDelay} min</Text>
        </View>

        {/* Trip History */}
        <Text style={styles.sectionTitle}>Past Trips</Text>
        {userStats.trips.map((trip, index) => (
          <View key={index} style={styles.tripCard}>
            <Text style={styles.tripTitle}>{trip.from} → {trip.to}</Text>
            <Text style={styles.tripSub}>Train {trip.train} at {trip.time}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  tab: {
    backgroundColor: "#1e1e1e",
    padding: 8,
    borderRadius: 20,
  },
  tabText: {
    color: "white",
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
  },
  cardBlue: {
    backgroundColor: "#2c3e50",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardRed: {
    backgroundColor: "#c0392b",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  stat: {
    color: "white",
    fontSize: 14,
  },
  statLarge: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  detailLink: {
    color: "#f1c40f",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "right",
  },
  subText: {
    color: "#f0f0f0",
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  tripCard: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  tripTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  tripSub: {
    color: "#bbb",
    fontSize: 13,
    marginTop: 4,
  },
});
