import { StyleSheet, View, Pressable, Text, TextInput } from "react-native";
import { useState } from "react";
import { searchStations } from "@/services/api";
import { TouchableOpacity } from "react-native";

export default function StationSearch({
  placeholder = "Search for station...",
  onSelect,
}: {
  placeholder?: string;
  onSelect: (station: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [stations, setStations] = useState<string[]>([]);

  const handleSearch = async (text: string) => {
    setQuery(text);

    if (text.length >= 1) {
      try {
        const results = await searchStations(text);   
        const stationNames = results.map(station => station.name);
        setStations(stationNames);

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
      <TextInput
        style={styles.searchInput}
        value={query}
        onChangeText={handleSearch}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {focused && Array.isArray(stations) && stations.length > 0 && (
        <View style={styles.resultsContainer}>
          {stations.map((station, index) => (
            <TouchableOpacity
              key={index}
              style={styles.resultItem}
              onPress={() => {
                setQuery(station);
                setStations([]);
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
    width: "80%",
    alignSelf: "center",
  },
  searchInput: {
    height: 40,
    width: "100%",
    borderWidth: 3,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlignVertical: "center",
    fontSize: 16,
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
});
