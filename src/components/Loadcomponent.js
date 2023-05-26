import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function LoginLogo() {
  return <Image source={require('../assets/electricload.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 310,
    height: 280,
    // marginTop: 8,
    // marginBottom: 8,
    // bottom:64
    bottom: 160 + getStatusBarHeight(),
  },
})
