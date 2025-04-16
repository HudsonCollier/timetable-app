import { StyleSheet, View, Pressable, Text, TextInput } from "react-native";
import { useState } from 'react';
import { searchStations } from '@/services/api';



export default function StationSearch() {
    const [query, setQuery] = useState('');
    const [stations, setStations] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = (text: string) => {
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
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                value={query}
                onChangeText={handleSearch}
                placeholder="Search for station..."
            />
            <View style={styles.resultsContainer}>
                {stations.map((station, index) => (
                    <Text key={index} style={styles.resultItem}>
                        {station}
                    </Text>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 18,
        marginTop: -100,
        width: '90%',
        alignSelf: 'center',
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
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