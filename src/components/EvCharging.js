import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Avatar } from 'react-native-paper';

export default function EvCharging({ goBack }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image size={12} source={require('../assets/charger1.png')} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 1,
    right: -35,
  },
  image: {
    width: 124,
    height: 124,
  },
});

