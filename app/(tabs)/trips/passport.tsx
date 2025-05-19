import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function TrainPassportScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚆 Your Train Passport</Text>
      <Text style={styles.stat}>Total Trips: 12</Text>
      <Text style={styles.stat}>Time on Trains: 18h 45m</Text>
      <Text style={styles.stat}>Stations Visited: 25</Text>
      <Text style={styles.stat}>Countries Traveled: 4</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 100,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#0f2027',
  },
  stat: {
    fontSize: 18,
    marginBottom: 12,
    color: '#333',
  },
});
