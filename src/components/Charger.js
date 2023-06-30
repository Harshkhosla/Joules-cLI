import React from 'react'
import { Image, StyleSheet, Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Logo() {
  return <Image source={require('../assets/charger1.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: screenWidth * 0.57,
    height: screenWidth * 0.57,
    top: screenHeight * 0.34,
    right: screenWidth * -0.3,
    alignSelf: 'center',
  },
})