import React, { useState } from "react";
import { searchStations } from "@/services/api";
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import useFetch from "@/services/useFetch";

export default function TrainLookup() {
  const [trainNumber, setTrainNumber] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [focusedField, setFocusedField] = useState<"departure" | "arrival" | null>(null);

  const { data: stationSuggestions = [], loading, error, refetch } = useFetch<string[]>(async () => [], false);

  const handleStationSearch = async (text: string, field: "departure" | "arrival") => {
    if (field === "departure") setDeparture(text);
    else setArrival(text);

    if (text.length >= 2) {
      await refetch(() => searchStations(text));
      setFocusedField(field);
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

  {focusedField === "departure" && stationSuggestions != null && stationSuggestions.length > 0 && (
    <View style={styles.suggestionBox}>
      <ScrollView keyboardShouldPersistTaps="handled">
        {stationSuggestions.map((station, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setDeparture(station);
              setFocusedField(null);
            }}
            activeOpacity={0.6}
          >
            <Text style={styles.suggestionItem}>{station}</Text>
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
        {focusedField === "arrival" && stationSuggestions != null && stationSuggestions.length > 0 && (
          <View style={styles.suggestionBox}>
            <ScrollView>
              {stationSuggestions.map((station, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setArrival(station);
                    setFocusedField(null);
                  }}
                >
                  <Text style={styles.suggestionItem}>{station}</Text>
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

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
      {error && <Text style={styles.error}>Error fetching stations</Text>}
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
});
