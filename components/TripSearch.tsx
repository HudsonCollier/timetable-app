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


type Props = {
  onAddTrip: (trip: TrainInfo) => void;
};

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

export default function TrainLookup({onAddTrip} : Props) {
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
        onAddTrip(trip as TrainInfo);
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
    </View>
  );
}








const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    padding: 10,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 0,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },  
  input: {
    height: 48,
    backgroundColor: "#1e1e1e", 
    color: "#f0f0f0",            
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",       
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#f1c40f",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 8, 
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
  }
});
