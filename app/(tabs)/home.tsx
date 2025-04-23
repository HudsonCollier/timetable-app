import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
// import { getTripInfo } from '@/services/api';
// import { searchStations } from '@/services/api'; // or the correct path to your api file

export async function searchStations(query: string): Promise<string[]> {
  const allStations = [
    "Amsterdam Centraal",
    "Rotterdam",
    "Utrecht",
    "Eindhoven",
    "Den Haag",
    "Haarlem",
    "Leiden",
    "Groningen",
  ];

  return allStations.filter((station) =>
    station.toLowerCase().includes(query.toLowerCase())
  );
}

export default function TrainLookup() {
  const [trainNumber, setTrainNumber] = useState("");
  const [trainInfo, setTrainInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");

  const [stationSuggestions, setStationSuggestions] = useState<string[]>([]);
  const [focusedField, setFocusedField] = useState<
    "departure" | "arrival" | null
  >(null);

  const useMock = true;

  const handleStationSearch = async (
    text: string,
    field: "departure" | "arrival"
  ) => {
    field === "departure" ? setDeparture(text) : setArrival(text);

    if (text.length >= 2) {
      try {
        const results = await searchStations(text);
        setStationSuggestions(results);
        setFocusedField(field);
      } catch (err) {
        console.error("Station search failed", err);
        setStationSuggestions([]);
      }
    } else {
      setStationSuggestions([]);
    }
  };

  const handleLookup = async () => {
    setError("");
    setTrainInfo(null);

    if (!departure || !arrival || !trainNumber) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      if (useMock) {
        const mockData = {
          number: trainNumber,
          origin: departure,
          destination: arrival,
          departureTime: "14:20",
          arrivalTime: "15:00",
          status: "On time",
          platformNumber: "3",
          travelDate: "2023-10-01",
        };
        await new Promise((res) => setTimeout(res, 500)); // simulate delay
        setTrainInfo(mockData);
      } else {
        // const result = await getTripInfo(departure, arrival, trainNumber);
        // setTrainInfo(result);
      }
    } catch (e) {
      setError("Could not fetch train info.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}> {/* Use styles.container here */}
      <View style={{ width: "100%", position: "relative" }}>
        <TextInput
          style={[styles.input, styles.fullWidthInput]} // Ensure full width for departure input
          placeholder="Departure station"
          value={departure}
          onChangeText={(text) => handleStationSearch(text, "departure")}
          onFocus={() => setFocusedField("departure")}
          onBlur={() => setTimeout(() => setFocusedField(null), 150)}
          placeholderTextColor="#888"
        />
        {focusedField === "departure" && stationSuggestions.length > 0 && (
          <View style={[styles.suggestionBox, { top: 45 }]}>
            {stationSuggestions.map((station, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setDeparture(station);
                  setStationSuggestions([]);
                  setFocusedField(null);
                }}
              >
                <Text style={styles.suggestionItem}>{station}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View style={styles.row}>
        <View style={{ flex: 1, position: "relative", marginRight: 8 }}>
          <TextInput
            style={[styles.input]}
            placeholder="Arrival station"
            value={arrival}
            onChangeText={(text) => handleStationSearch(text, "arrival")}
            onFocus={() => setFocusedField("arrival")}
            onBlur={() => setTimeout(() => setFocusedField(null), 150)}
            placeholderTextColor="#888"
          />
          {focusedField === "arrival" && stationSuggestions.length > 0 && (
            <View style={[styles.suggestionBox, { top: 45 }]}>
              {stationSuggestions.map((station, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setArrival(station);
                    setStationSuggestions([]);
                    setFocusedField(null);
                  }}
                >
                  <Text style={styles.suggestionItem}>{station}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Train number"
          value={trainNumber}
          onChangeText={setTrainNumber}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLookup}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
      {error !== "" && <Text style={styles.error}>{error}</Text>}

      {trainInfo && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Train #{trainInfo.number}</Text>
          <Text style={styles.resultText}>From: {trainInfo.origin}</Text>
          <Text style={styles.resultText}>To: {trainInfo.destination}</Text>
          <Text style={styles.resultText}>
            Departs: {trainInfo.departureTime}
          </Text>
          <Text style={styles.resultText}>
            Arrives: {trainInfo.arrivalTime}
          </Text>
          <Text style={styles.resultText}>Status: {trainInfo.status}</Text>
          <Text style={styles.resultText}>
            Platform: {trainInfo.platformNumber}
          </Text>
          <Text style={styles.resultText}>Date: {trainInfo.travelDate}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    alignItems: "center",
    backgroundColor: "#25292e", // Ensure the background is dark
    height: "100%",
    width: "100%",
  },
  suggestionBox: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#414952", // Match the container background
    borderRadius: 6,
    paddingVertical: 5,
    maxHeight: 150,
    zIndex: 10,
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#414952", // Use a contrasting color
    borderRadius: 8,
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
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  suggestionItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
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
});
