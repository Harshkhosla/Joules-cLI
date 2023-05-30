import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Avatar } from 'react-native-paper';

export default function Hamburger({ goBack }) {
  return (
    <TouchableOpacity  style={styles.container}>
      <Avatar.Image size={50} source={require('../assets/hehe.png')} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left:-10,
    top:1,
  },
  image: {
    width: 24,
    height: 24,
  },
})
