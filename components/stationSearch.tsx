import { StyleSheet, View, Pressable, Text, TextInput } from "react-native";
import { useState } from "react";
import { searchStations } from "../services/api";
import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';


export default function StationSearch({
  placeholder = "Search for station...",
  onSelect,
}: {
  placeholder?: string;
  onSelect: (station: string, stationCode: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [stations, setStations] = useState<string[]>([]);
  const[stationCode, setCode] = useState("");
  const [stationMap, setStationMap] = useState<Record<string, string>>({});

  const handleSearch = async (text: string) => {
    setQuery(text);

    if (text.length >= 1) {
      try {
        const results = await searchStations(text);   
        const stationNames = results.map(station => station.name);
        const map = Object.fromEntries(results.map((station) => [station.name, station.code]));
        setStations(stationNames);
        setStationMap(map); 
      } catch (error) {
        console.error("Search failed", error);
        setStations([]);
      } finally {
      }
    } else {
      setStations([]);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputWithIcon}>
        <Ionicons name="train-outline" size={20} color="#666" style={{ marginRight: 8 }} />
      <TextInput
        style={styles.inputNoBorder}
        value={query}
        onChangeText={handleSearch}
        placeholder={placeholder}
        placeholderTextColor = "#999"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      </View>
      {focused && Array.isArray(stations) && stations.length > 0 && (
        <View style={styles.resultsContainer}>
          {stations.map((station, index) => (
            <TouchableOpacity
              key={index}
              style={styles.resultItem}
              onPress={() => {
                setQuery(station);
                setStations([]);
                const code = stationMap[station] || "";
                setCode(code);
                onSelect(station, code);
              }}
            >
              <Text>{station}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: "white",
    borderRadius: 18,
    width: "100%",
    alignSelf: "center",
  },
  searchInput: {
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    width: "100%",
  },  
  resultsContainer: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    zIndex: 999, 
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
  },
  
  inputNoBorder: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },  
});
