import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Avatar } from 'react-native-paper';

export default function EvCharging({ goBack }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image size={13} source={require('../assets/charger1.png')} style={styles.image} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -10,
    right: -76,
    // left:6,
    alignSelf: 'flex-end', // Align the container to the right
  },
  image: {
    zIndex:-1,
    width: '100%', // Adjust the width to fill the container
    height: 190, // Allow the height to adjust automatically
    aspectRatio: 1, // Maintain the original aspect ratio of the image
  },
});
