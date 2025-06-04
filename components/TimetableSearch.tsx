// components/TripSearch.tsx

import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import StationSearch from "./stationSearch";
import { Ionicons } from "@expo/vector-icons";

export default function TripSearch({ 
  onSubmit,
}: {
  onSubmit: (station: string, code: string) => void;
}) {
  const [station, setStation] = useState("");
  const [time, setTime] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!station || !code) {
      Alert.alert("Invalid Station", "Please select a valid station first.");
      return;
    }
    onSubmit(station, code);
  };

  return (
    <View style={styles.container}>
      <StationSearch
        onSelect={(selectedName, selectedCode) => {
          setStation(selectedName);
          setCode(selectedCode);
        }}
      />

      <View style={styles.inputWithIcon}>
        <Ionicons
          name="time-outline"
          size={20}
          color="#666"
          style={{ marginRight: 8 }}
        />
        <TextInput
          style={styles.inputNoBorder}
          placeholder="Departure time..."
          placeholderTextColor="#999"
          value={time}
          onChangeText={setTime}
          editable={false}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>View Departures</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 4,
    alignSelf: "center",
    gap: 16,
    marginTop: 15,
  },
  buttonContainer: {
    marginTop: 0,
  },
  button: {
    backgroundColor: "#ffd33d",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
    marginTop: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 10,
    width: "100%",
  },
  inputNoBorder: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});
