import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Sideline() {
  return <Image source={require('../assets/rec.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 90,
    height: 60,
    marginBottom: 8,
  },
})
