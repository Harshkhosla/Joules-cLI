import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function LoginLogo() {
  return <Image source={require('../assets/electricload.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 310,
    height: 280,
    marginTop: 8,
    // marginBottom: 8,
  },
})
