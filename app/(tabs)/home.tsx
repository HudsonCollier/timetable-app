import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from 'react';



export default function TrainLookup() {
    const [trainNumber, setTrainNumber] = useState('');
    const [trainInfo, setTrainInfo] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    const useMock = true;
  
    const handleLookup = async () => {
      setError('');
      setTrainInfo(null);
  
      if (!trainNumber.trim()) {
        setError('Please enter a train number.');
        return;
      }
  
      setLoading(true);
  
      try {
        if (useMock) {
          // mock result for demonstration
          const mockData = {
            number: trainNumber,
            origin: 'Amsterdam Centraal',
            destination: 'Rotterdam',
            departureTime: '14:20',
            status: 'On time',
            arrivalTime: '15:00',
            platformNumber: '3',
            travelDate: '2023-10-01',
          };
          await new Promise(res => setTimeout(res, 500)); // simulate delay
          setTrainInfo(mockData);
        } else {
          // const result = await getTrainInfo(trainNumber);
          // setTrainInfo(result);
        }
      } catch (e) {
        setError('Could not fetch train info.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter train number"
          value={trainNumber}
          onChangeText={setTrainNumber}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleLookup}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
  
        {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
        {error !== '' && <Text style={styles.error}>{error}</Text>}
  
        {trainInfo && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Train #{trainInfo.number}</Text>
            <Text style={styles.resultText}>From: {trainInfo.origin}</Text>
            <Text style={styles.resultText}>To: {trainInfo.destination}</Text>
            <Text style={styles.resultText}>Departs: {trainInfo.departureTime}</Text>
            <Text style={styles.resultText}>Arrives: {trainInfo.arrivalTime}</Text>
            <Text style={styles.resultText}>Status: {trainInfo.status}</Text>
            <Text style={styles.resultText}>Platform: {trainInfo.platformNumber}</Text>
            <Text style={styles.resultText}>Date: {trainInfo.travelDate}</Text>
            
          </View>
        )}
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      padding: 40,
      // marginTop: 40,
      alignItems: 'center',
      backgroundColor: '#25292e',
      height: '100%',
      width: '100%',
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      width: '100%',
      paddingHorizontal: 10,
      marginBottom: 10,
      color: 'white',
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    error: {
      color: 'red',
      marginTop: 10,
    },
    resultBox: {
      marginTop: 20,
      padding: 15,
      backgroundColor: '#f3f3f3',
      borderRadius: 8,
      width: '100%',
    },
    resultText: {
      fontSize: 16,
      marginBottom: 5,
    },
  });
