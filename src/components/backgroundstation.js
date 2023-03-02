import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView,  Dimensions  } from 'react-native'
import { theme } from '../core/theme'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../assets/station.jpg')}
      resizeMode="stretch"
      style={styles.background}
      blurRadius={6}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    // opacity: 0.5,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})