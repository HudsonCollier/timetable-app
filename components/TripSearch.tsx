import React, { useState } from "react";
import { searchStations, AddTrip } from "@/services/api";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";

interface Props {
  onAddTrip: () => Promise<void>;
}

export default function TrainLookup({ onAddTrip }: Props) {
  const [input, setInput] = useState("");
  const [step, setStep] = useState<"departure" | "arrival" | "train">(
    "departure"
  );
  const [departureName, setDepartureName] = useState("");
  const [departureCode, setDepartureCode] = useState("");
  const [arrivalName, setArrivalName] = useState("");
  const [arrivalCode, setArrivalCode] = useState("");
  const [stationSuggestions, setStationSuggestions] = useState<string[]>([]);
  const [stationMap, setStationMap] = useState<Record<string, string>>({});
  const [placeholder, setPlaceholder] = useState("Search to add trips");

  const handleSearch = async (text: string) => {
    setInput(text);
    if (step !== "train" && text.length >= 2) {
      try {
        const results = await searchStations(text);
        const names = results.map((s) => s.name);
        const map = Object.fromEntries(results.map((s) => [s.name, s.code]));
        setStationSuggestions(names);
        setStationMap(map);
      } catch (err) {
        Alert.alert("Error", "Search Error.");
        setStationSuggestions([]);
      }
    } else {
      setStationSuggestions([]);
    }
  };

  const handleSelect = async (value: string) => {
  if (step === "departure") {
    setDepartureName(value);
    setDepartureCode(stationMap[value]);
    setStep("arrival");
    setInput("");
    setStationSuggestions([]); 
  } else if (step === "arrival") {
    setArrivalName(value);
    setArrivalCode(stationMap[value]);
    setStep("train");
    setInput("");
    setStationSuggestions([]); 
  }
};

const resetForm = () => {
  setStep("departure");
  setInput("");
  setDepartureName("");
  setDepartureCode("");
  setArrivalName("");
  setArrivalCode("");
  setStationSuggestions([]);
};


  const handleSubmit = async () => {
    try {
      const trainNum = parseInt(input);
      if (isNaN(trainNum)) throw new Error("Invalid train number");
      await AddTrip(departureCode, arrivalCode, trainNum);
      await onAddTrip();
      setStep("departure");
      setInput("");
      setDepartureName("");
      setArrivalName("");
      setStationSuggestions([]);
    } catch (err: any) {
        Alert.alert("Error", "Failed to add trip.");
        resetForm();
    }
  };

  return (
    <View style={styles.container}>
      {step === "departure" && input.length === 0 && (
        <Text style={styles.helperText}>Search to add your next trip</Text>
      )}
      <View style={{ position: "relative", width: "100%" }}>



      <TextInput
        style={styles.input}
        placeholder={
          step === "departure"
            ? "Enter departure station"
            : step === "arrival"
            ? "Enter arrival station"
            : "Enter train number"
        }
        value={input}
        onChangeText={(text) =>
          step === "train" ? setInput(text) : handleSearch(text)
        }
        keyboardType={step === "train" ? "numeric" : "default"}
        placeholderTextColor="#aaa"
      />

      {stationSuggestions.length > 0 && (
        <View style={styles.suggestionBox}>
          <ScrollView>
            {stationSuggestions.map((s, i) => (
              <TouchableOpacity key={i} onPress={() => handleSelect(s)}>
                <Text style={styles.suggestionItem}>{s}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
            </View>


      {step === "train" && (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Trip</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    padding: 12,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 0,
  },
  input: {
    height: 50,
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 10,
  },
  label: {
    color: "#f1c40f",
    fontSize: 14,
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#f1c40f",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#000",
  },
  suggestionBox: {
  position: "absolute",
  top: 50, // slightly below input
  left: 0,
  right: 0,
  backgroundColor: "#fff",
  borderRadius: 8,
  zIndex: 1000,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 6,
  maxHeight: 150,
},

  suggestionItem: {
    padding: 12,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    color: "#333",
  },
  helperText: {
    fontSize: 13,
    color: "#aaa",
    marginBottom: 6,
    marginLeft: 4,
  },
});
