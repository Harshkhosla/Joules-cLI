import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'

const ChargingAnimation = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.AnimatedBox]}>
        <View style={styles.AnimatedContainer}>
          <View style={styles.AnimatedShapeFirst}></View>
          <View style={styles.AnimatedShapeFirst}></View>
          <View style={styles.AnimatedShapeFirst}></View>
          <View style={styles.AnimatedShapeFirst}></View>
        </View>
        <View style={styles.AnimatedContainer}>
          <View style={styles.AnimatedShape}></View>
          <View style={styles.AnimatedShape}></View>
          <View style={styles.AnimatedShape}></View>
          <View style={styles.AnimatedShape}></View>
        </View>
      </View>

      <Text>ChargingAnimation</Text>
    </View>
  )
}

export default ChargingAnimation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AnimatedBox: {
    height: 200,
    width: 200,
    borderRadius: 200 / 2,
    borderWidth: 4,
    borderColor: 'green',
    // overflow: 'hidden',
  },
  AnimatedContainer: {
    flexDirection: 'row',
    gap: -50,
    position: 'absolute',
    top: 100,
  },
  AnimatedShapeFirst: {
    top: 10,
    right: 85,
    height: 200,
    width: 200,
    backgroundColor: '#118615',
    opacity: 0.5,
    borderRadius: 60,
    transform: [{ rotate: '45deg' }],
  },
  AnimatedShape: {
    height: 200,
    width: 200,
    backgroundColor: '#118615',
    borderRadius: 50,
    opacity: 0.9,
    transform: [{ rotate: '45deg' }],
  },
})
