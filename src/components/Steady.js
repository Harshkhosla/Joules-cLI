import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/4.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 70,
    marginBottom: 8,
  },
})