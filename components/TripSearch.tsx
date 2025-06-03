// import React, { useState } from "react";
// import { searchStations, AddTrip, fetchUserTrips } from "@/services/api";
// import {
//   ScrollView,
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";

// type Props = {
//   onAddTrip: () => Promise<void>;
// };

// type TripInfo = {
//   id: number;
//   trainNumber: number;
//   departureStation: string;
//   arrivalStation: string;
//   direction: string;
//   departureTime: string;
//   arrivalTime: string;
//   onTime: boolean;
//   cancelled: boolean;
//   delayed: boolean;
//   delayDuration: number;
//   departurePlatformNumber: string | null;
//   arrivalPlatformNumber: string | null;
//   timeUntilDeparture: string;
//   date: string;
//   tripDistance: number;
//   tripDuration: number;
//   intermediateStops: StopInfo[];
// };

// type StopInfo = {
//   id: number;
//   stationName: string;
//   stationCode: string;
//   arrivalTime: string | null;
//   departureTime: string | null;
//   cancelled: boolean;
//   arrivalPlatform: string | null;
//   departurePlatform: string | null;
//   delayInSeconds: number;
//   status: string | null;
// };

// export default function TrainLookup({ onAddTrip }: Props) {
//   const [trainNumber, setTrainNumber] = useState("");
//   const [departure, setDeparture] = useState("");
//   const [arrival, setArrival] = useState("");
//   const [focusedField, setFocusedField] = useState<
//     "departure" | "arrival" | null
//   >(null);
//   const [departureCode, setDepartureCode] = useState("");
//   const [arrivalCode, setArrivalCode] = useState("");
//   const [stationMap, setStationMap] = useState<Record<string, string>>({});
//   const [stationNames, setStationNames] = useState<string[]>([]);

//   const handleStationSearch = async (
//     text: string,
//     field: "departure" | "arrival"
//   ) => {
//     if (field === "departure") setDeparture(text);
//     else setArrival(text);

//     if (text.length >= 2) {
//       try {
//         const results = await searchStations(text);
//         const names = results.map((station) => station.name);
//         const map = Object.fromEntries(
//           results.map((station) => [station.name, station.code])
//         );
//         setStationNames(names);
//         setStationMap(map);
//         setFocusedField(field);
//       } catch (error) {
//         console.error("Failed to fetch stations:", error);
//         setStationNames([]);
//       }
//     } else {
//       setStationNames([]);
//     }
//   };

//   const handleAddTrip = async () => {
//     if (trainNumber.trim() !== "" && departure && arrival) {
//       try {
//         const trainNumAsNumber = Number(trainNumber);
//         await AddTrip(departureCode, arrivalCode, trainNumAsNumber);
//         await onAddTrip();
//       } catch (error: any) {
//         console.error("AddTrip error:", error.message ?? error);
//       }
//     } else {
//       console.warn("Missing some fields");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{ width: "100%", position: "relative" }}>
//         <TextInput
//           style={[styles.input, styles.fullWidthInput]}
//           placeholder="Departure station"
//           value={departure}
//           onChangeText={(text) => handleStationSearch(text, "departure")}
//           onFocus={() => setFocusedField("departure")}
//           onBlur={() => setTimeout(() => setFocusedField(null), 150)}
//           placeholderTextColor="#888"
//         />
//         {focusedField === "departure" && stationNames.length > 0 && (
//           <View style={styles.suggestionBox}>
//             <ScrollView keyboardShouldPersistTaps="handled">
//               {stationNames.map((name, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => {
//                     setDeparture(name);
//                     setDepartureCode(stationMap[name] || "");
//                     setFocusedField(null);
//                   }}
//                   activeOpacity={0.6}
//                 >
//                   <Text style={styles.suggestionItem}>{name}</Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>
//         )}
//       </View>

//       <View style={styles.row}>
//         <TextInput
//           style={[styles.input, styles.halfInput, { marginRight: 8 }]}
//           placeholder="Arrival station"
//           value={arrival}
//           onChangeText={(text) => handleStationSearch(text, "arrival")}
//           onFocus={() => setFocusedField("arrival")}
//           onBlur={() => setTimeout(() => setFocusedField(null), 150)}
//           placeholderTextColor="#888"
//         />
//         {focusedField === "arrival" && stationNames.length > 0 && (
//           <View style={styles.suggestionBox}>
//             <ScrollView>
//               {stationNames.map((name, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => {
//                     setArrival(name);
//                     setArrivalCode(stationMap[name] || "");
//                     setFocusedField(null);
//                   }}
//                 >
//                   <Text style={styles.suggestionItem}>{name}</Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>
//         )}

//         <TextInput
//           style={[styles.input, styles.halfInput]}
//           placeholder="Train number"
//           value={trainNumber}
//           onChangeText={setTrainNumber}
//           keyboardType="numeric"
//           placeholderTextColor="#888"
//         />
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleAddTrip}>
//         <Text style={styles.buttonText}>Add Trip</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#121212",
//     padding: 10,
//     borderRadius: 16,
//     marginHorizontal: 16,
//     marginTop: 0,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   input: {
//     height: 48,
//     backgroundColor: "#1e1e1e",
//     color: "#f0f0f0",
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#333",
//     marginBottom: 12,
//   },
//   button: {
//     backgroundColor: "#f1c40f",
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//     marginTop: 10,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "100%",
//     gap: 8,
//   },
//   halfInput: {
//     flex: 1,
//   },
//   fullWidthInput: {
//     width: "100%",
//   },
//   suggestionBox: {
//     position: "absolute",
//     top: 45,
//     left: 0,
//     right: 0,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 6,
//     zIndex: 1000,
//     maxHeight: 200,
//   },
//   suggestionItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//     fontSize: 16,
//     color: "#333",
//   },
// });

import React, { useState } from "react";
import { searchStations, AddTrip } from "@/services/api";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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
        console.error("Search error", err);
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
      console.error("AddTrip error:", err.message ?? err);
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
