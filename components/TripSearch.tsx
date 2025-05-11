import React, { useState } from "react";
import { searchStations, addTrip } from "@/services/api";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

type TrainInfo = {
    trainNumber: number;
    departureStation: string;
    arrivalStation: string;
    direction: string;
    departureTime: string;
    arrivalTime: string;
    onTime: boolean;
    delayed: boolean;
    cancelled: boolean;
    delayDuration: number;
    departurePlatformNumber?: string;
    arrivalPlatformNumber?: string;
    timeUntilDeparture: string;
};

export default function TrainLookup() {
  const [trainNumber, setTrainNumber] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [focusedField, setFocusedField] = useState<"departure" | "arrival" | null>(null);
  const [departureCode, setDepartureCode] = useState("");
  const [arrivalCode, setArrivalCode] = useState("");
  const [stationMap, setStationMap] = useState<Record<string, string>>({});

  const [stationNames, setStationNames] = useState<string[]>([]);
  const [tripData, setTripData] = useState<TrainInfo | null>(null);

  const handleStationSearch = async (
    text: string,
    field: "departure" | "arrival"
  ) => {
    if (field === "departure") setDeparture(text);
    else setArrival(text);

    if (text.length >= 2) {
      try {
        const results = await searchStations(text);
        const names = results.map((station) => station.name);
        const map = Object.fromEntries(results.map((station) => [station.name, station.code]));
        setStationNames(names);
        setStationMap(map); 
        setFocusedField(field);
      } catch (error) {
        console.error("Failed to fetch stations:", error);
        setStationNames([]);
      }
    } else {
      setStationNames([]);
    }

  };

  const handleAddTrip = async () => {
    if (trainNumber.trim() !== "" && departure && arrival) {
      try {
        const trainNumAsNumber = Number(trainNumber);
        const trip = await addTrip(departureCode, arrivalCode, trainNumAsNumber);
        setTripData(trip as TrainInfo);
        } catch (error) {
        console.error("ERROR", error);
      }
    } else {
      console.warn("Missing some fields");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", position: "relative" }}>
        <TextInput
          style={[styles.input, styles.fullWidthInput]}
          placeholder="Departure station"
          value={departure}
          onChangeText={(text) => handleStationSearch(text, "departure")}
          onFocus={() => setFocusedField("departure")}
          onBlur={() => setTimeout(() => setFocusedField(null), 150)}
          placeholderTextColor="#888"
        />
        {focusedField === "departure" && stationNames.length > 0 && (
          <View style={styles.suggestionBox}>
            <ScrollView keyboardShouldPersistTaps="handled">
              {stationNames.map((name, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setDeparture(name);
                    setDepartureCode(stationMap[name] || "");
                    setFocusedField(null);
                  }}
                  activeOpacity={0.6}
                >
                  <Text style={styles.suggestionItem}>{name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput, { marginRight: 8 }]}
          placeholder="Arrival station"
          value={arrival}
          onChangeText={(text) => handleStationSearch(text, "arrival")}
          onFocus={() => setFocusedField("arrival")}
          onBlur={() => setTimeout(() => setFocusedField(null), 150)}
          placeholderTextColor="#888"
        />
        {focusedField === "arrival" && stationNames.length > 0 && (
          <View style={styles.suggestionBox}>
            <ScrollView>
              {stationNames.map((name, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setArrival(name);
                    setArrivalCode(stationMap[name] || "");
                    setFocusedField(null);
                  }}
                >
                  <Text style={styles.suggestionItem}>{name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Train number"
          value={trainNumber}
          onChangeText={setTrainNumber}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddTrip}>
        <Text style={styles.buttonText}>Add Trip</Text>
      </TouchableOpacity>

      {tripData && (
  <View style={styles.tripCard}>
    <Text style={styles.trainHeader}>
      🚆 Train <Text style={styles.trainNumber}>{tripData.trainNumber}</Text>
    </Text>
    <Text style={styles.routeText}>
      {tripData.departureStation} → {tripData.arrivalStation}
    </Text>
    <Text style={styles.departureCountdown}>
      Departs in {tripData.timeUntilDeparture}
    </Text>
    <View style={styles.timeRow}>
      <Text style={styles.timeText}>
        🏁 {tripData.departureTime} ({tripData.departureStation}) on platform {tripData.departurePlatformNumber ?? "N/A"}
      </Text>
      <Text style={styles.timeText}>
        🏁 {tripData.arrivalTime} ({tripData.arrivalStation}) on platform {tripData.arrivalPlatformNumber ?? "N/A"}
      </Text>
    </View>
    <Text style={styles.timeText}>Direction: {tripData.direction}</Text>
    <Text style={styles.timeText}>Delay: {tripData.delayDuration} seconds</Text>
    <Text style={styles.timeText}>Status:</Text>
    <Text style={styles.timeText}>🟢 On Time: {tripData.onTime ? "Yes" : "No"}</Text>
    <Text style={styles.timeText}>🟡 Delayed: {tripData.delayed ? "Yes" : "No"}</Text>
    <Text style={styles.timeText}>🔴 Cancelled: {tripData.cancelled ? "Yes" : "No"}</Text>
  </View>
)}
    </View>
  );
}








const styles = StyleSheet.create({
  container: {
    padding: 40,
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "white",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  halfInput: {
    flex: 1,
  },
  fullWidthInput: {
    width: "100%",
  },
  suggestionBox: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    zIndex: 1000,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    fontSize: 16,
    color: "#333",
  },
  tripCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    width: "100%",
  },
  trainHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  trainNumber: {
    color: "#87CEEB",
  },
  routeText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 5,
  },
  departureCountdown: {
    fontSize: 16,
    color: "#87CEEB",
    marginBottom: 10,
  },
  timeRow: {
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 4,
  },
});
