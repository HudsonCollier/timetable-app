import { Text, View, StyleSheet } from 'react-native';

import Button from '@/components/Button';
import ImageViewer from '@/components/imageViewer';
import StationSearch from '@/components/stationSearch';

const placeholder = require('@/assets/images/background.png')

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.footerContainer}>
      </View>
      <View style={{ flex: 1 }}>
        <StationSearch />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: "600",
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
