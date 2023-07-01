import React from 'react'
import { Image, StyleSheet ,Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default function Elegiblity() {
  return <Image source={require('../assets/icon89.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    // width: 290,
    // height: 190,
    // marginBottom: 90,
    // marginTop: 1,
    width: screenWidth * 0.79,
    height: screenHeight * 0.22,
    alignSelf: 'center',
    // marginTop: -screenHeight * 0.14,
    // marginBottom:-screenHeight * 0.07,
  },
})
