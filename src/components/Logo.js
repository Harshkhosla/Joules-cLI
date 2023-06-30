import React from 'react'
import { Image, StyleSheet, Dimensions} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function Logo() {
  return <Image source={require('../assets/jouls.png')} style={styles.image} />
}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  image: {
    width: screenWidth * 0.3,
    height: screenHeight * 0.07,
    top: screenHeight * -0.32,
    // marginBottom: screenHeight * 0.1,
    alignSelf: 'center',
  },
  
})