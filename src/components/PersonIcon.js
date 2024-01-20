import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Avatar } from 'react-native-paper';

export default function PersonIcon({ clickheehpd }) {
  return (
    <TouchableOpacity style={styles.container} onPress={clickheehpd}>
    <Avatar.Image size={45} source={require('../assets/download.png')} />
  </TouchableOpacity>
  
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left:140,
    top:-59,
  },
  image: {
    width: 24,
    height: 24,
  },
})
