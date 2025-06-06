import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { fetchMe, fetchUsersStats } from "@/services/api"; // adjust if needed
import { passportInfo } from "@/types/types"; // your type


/**
 * Passport screen that displays the users lifetime train data by year.
 */
export default function PassportScreen() {
  const router = useRouter();
  const [userStats, setUserStats] = useState<passportInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchUsersStats();
        setUserStats(data);
      } catch (e) {
        console.error("Error fetching passport:", e);
        setError("Could not load passport.");
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  useEffect(() => {
    const loadName = async () => {
      try {
        const data = await fetchMe();
        setFirstName(`${data.firstName}`);
        setLastName(`${data.lastName}`);
      } catch (e) {
        console.error("Failed to load user name", e);
      }
    };

    loadName();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{firstName + " " + lastName}</Text>
          <Text style={styles.subtitle}>My Train Log</Text>
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {["ALL-TIME", "2025", "2024"].map((year, i) => (
          <TouchableOpacity key={i} style={styles.tab}>
            <Text style={styles.tabText}>{year}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <TouchableOpacity
          style={styles.cardBlue}
          onPress={() => router.push("/trips")}
        >
          <Text style={styles.cardTitle}>ALL-TIME TRAIN PASSPORT</Text>
          <View style={styles.statsRow}>
            <Text style={styles.stat}>Trains: {userStats?.numOfTrains}</Text>
            <Text style={styles.stat}>
              Distance: {userStats?.totalDistance}
            </Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.stat}>Time: {userStats?.totalDuration}</Text>
            <Text style={styles.stat}>
              Stations: {userStats?.numOfStations}
            </Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.stat}>
              Countries: {userStats?.numOfCountries}
            </Text>
          </View>
          <Text style={styles.detailLink}>All Train Stats →</Text>
        </TouchableOpacity>

        <View style={styles.cardRed}>
          <Text style={styles.cardTitle}>Delays Summary</Text>
          <Text style={styles.statLarge}>
            {userStats?.totalDelayInMinutes} min lost from delays
          </Text>
          <Text style={styles.subText}>
            Avg delay: {userStats?.avgDelayTimeInMinutes} min
          </Text>
        </View>
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
