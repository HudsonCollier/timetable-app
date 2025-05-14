// components/TripSearch.tsx

import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import StationSearch from "./stationSearch";

export default function TripSearch({ onSubmit }: { onSubmit: (station: string, time: string) => void }) {
  const [station, setStation] = useState("");
  const [time, setTime] = useState("");

  return (
    <View style={styles.container}>
      <StationSearch placeholder="Search for station..." onSelect={setStation} />

      <TextInput
        style={styles.timeInput}
        placeholder="Departure time..."
        placeholderTextColor="#999"
        value={time}
        onChangeText={setTime}
      />

<TouchableOpacity style={styles.button} onPress={() => onSubmit(station, time)}>
  <Text style={styles.buttonText}>View Departures</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
   container: {
    width: '100%',
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#fafafa',
    gap: 12,
    alignSelf: "center",
  },
  timeInput: {
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: '#ccc',
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    width: "80%",
    alignSelf: "center",
  },
  buttonContainer: {
    marginTop: 0,
  },
  button: {
    backgroundColor: '#ffd33d',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    alignSelf: 'center',
    marginTop: 12,
  },
  
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
