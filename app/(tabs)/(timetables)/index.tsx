import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import TimetableSearch from "@/components/TimetableSearch";
import { useRouter } from "expo-router";


/**
 * Screen that allows users to search for all the departures from a train station.
 * Renders the TimetableSearch component and navigates to the Results screen on submission.
 */

export default function TimetablesSearchScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/newBackground.jpg")}
        style={styles.headerImage}
        resizeMode="cover"
      >
        <Text style={styles.headerText}>Search Timetables</Text>
      </ImageBackground>

      <View style={styles.content}>
        <TimetableSearch
          onSubmit={(station, code) => {
            router.push({
              pathname: "/results",
              params: { station: station.toString(), code: code.toString() },
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  headerImage: {
    width: "110%",
    height: 295,
    justifyContent: "flex-end",
    padding: 20,
  },
  headerText: {
    fontSize: 27.5,
    fontWeight: "700",
    color: "white",
    marginLeft: -8,
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  content: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginLeft: 5,
    marginRight: 5,
  },
});
