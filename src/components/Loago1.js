import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function Loago1() {
  return <Image source={require('../assets/jouls.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 70,
    marginBottom: 90,
    bottom: 90 + getStatusBarHeight(),
  },
  // container: {
  //   position: 'absolute',
  //   top: 10 + getStatusBarHeight(),
  //   left: 4,
  // },
})
