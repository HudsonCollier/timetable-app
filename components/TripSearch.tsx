import React, { useState, useCallback } from "react";
import { searchStations } from "@/services/api";
import { ScrollView } from "react-native";
import useFetch from "@/services/useFetch";


import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function TrainLookup() {
  const [trainNumber, setTrainNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [stationSuggestions, setStationSuggestions] = useState<string[]>([]);
  const [focusedField, setFocusedField] = useState<"departure" | "arrival" | null>(null);

  const handleStationSearch = async (
    text: string,
    field: "departure" | "arrival"
  ) => {
    if (field === "departure") setDeparture(text);
    else setArrival(text);

    if (text.length >= 2) {
      const results = await searchStations(text);
      setStationSuggestions(results);
      setFocusedField(field);
    } else {
      setStationSuggestions([]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, styles.fullWidthInput]}
        placeholder="Departure station"
        value={departure}
        onChangeText={(text) => handleStationSearch(text, "departure")}
        onFocus={() => setFocusedField("departure")}
        onBlur={() => setTimeout(() => setFocusedField(null), 150)}
        placeholderTextColor="#888"
      />

      {focusedField === "departure" && stationSuggestions.length > 0 && (
        <View style={styles.suggestionBox}>
          <ScrollView>
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
          </ScrollView>
        </View>
      )}

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
        {focusedField === "arrival" && stationSuggestions.length > 0 && (
          <View style={styles.suggestionBox}>
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

        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Train number"
          value={trainNumber}
          onChangeText={setTrainNumber}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {/* {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
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
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    alignItems: "center",
    backgroundColor: "#25292e",
    height: "100%",
    width: "100%",
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#414952",
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
    backgroundColor: "#fff",
    zIndex: 10,
    top: 40,
    left: 0,
    right: 0,
    marginHorizontal: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    maxHeight: 200, // Cap visible suggestions, enable scroll for more
  },

  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
