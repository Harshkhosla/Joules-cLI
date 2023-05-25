import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Green() {
  return <Image source={require('../assets/Green.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 380,
    height: 180,
    marginBottom: 8,
    marginTop: 180
  },
})
