import { StyleSheet, View, Pressable, Text, TextInput } from "react-native";
import { useState } from 'react';
import { searchStations } from '@/services/api';
import { TouchableOpacity } from 'react-native';


export default function StationSearch() {
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(false) ;
    const [query, setQuery] = useState('');
    const [stations, setStations] = useState<string[]>([]);
    

    const handleSearch = async (text: string) => {
                setQuery(text);

    if (text.length >= 1) {
         const mockResults = [
             "Amsterdam Centraal",
             "Amsterdam Zuid",
             "Amsterdam Sloterdijk",
             "Amsterdam RAI"
         ].filter(station => 
             station.toLowerCase().includes(text.toLowerCase())
         );
         setStations(mockResults);
     } else {
         setStations([]);
     }

        // if (text.length >= 1) {
        //   setLoading(true);
        //   try {
        //     const results: string[] = await searchStations(text); // results is a list of station names
        //     setStations(results);
        //   } catch (error) {
        //     console.error('Search failed', error);
        //     setStations([]);
        //   } finally {
        //     setLoading(false);
        //   }
        // } else {
        //   setStations([]);
        // }
      };
      




        return (
            <View style={styles.container}>
              <TextInput
                style={styles.searchInput}
                value={query}
                onChangeText={handleSearch}
                placeholder="Search for station..."
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
                            // setFocused(false);
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
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 18,
        marginTop: -100,
        width: 250,
        alignSelf: 'center',
    },
    searchInput: {
        height: 40,
        width: '100%', 
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        textAlignVertical: "center",
        fontSize: 16,
    },
    resultsContainer: {
        marginTop: 10,
    },
    resultItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    }

    

});


