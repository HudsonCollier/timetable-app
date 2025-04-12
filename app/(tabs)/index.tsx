import { Text, View, StyleSheet } from 'react-native';

import Button from '@/components/Button';
import ImageViewer from '@/components/imageViewer';
const placeholder = require('@/assets/images/background.png')

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Euro Timetables</Text>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource = {placeholder}/>
      </View>
      <View style={styles.footerContainer}>
        <Button label="Find your station" />
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
    color: '#fff',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
