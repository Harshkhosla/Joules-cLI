import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function LoginLogo() {
  return <Image source={require('../assets/image1.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 310,
    height: 160,
    marginBottom: 8,
  },
})
