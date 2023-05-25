import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Elegiblity() {
  return <Image source={require('../assets/icon89.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 290,
    height: 190,
    marginBottom: 90,
    marginTop: 1,
  },
})
