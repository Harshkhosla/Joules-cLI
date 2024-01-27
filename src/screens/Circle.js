import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'

const Circle = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle1}>
        <View style={styles.circle2}>
          <View style={styles.circle3}>
            <View style={styles.circle4}></View>
          </View>
        </View>
      </View>
      {/* <Text>Circle Circle Circle Circle Circle Circle </Text> */}
    </View>
  )
}

export default Circle

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  circle1: {
    // position: 'absolute',
    backgroundColor: '#019031',
    height: wp(90),
    width: wp(90),
    borderRadius: wp(90) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.1,
  },
  circle2: {
    // position: 'absolute',
    backgroundColor: '#019031',
    height: wp(75),
    width: wp(75),
    borderRadius: wp(75) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    // opacity: 0.9,
  },
  circle3: {
    // position: 'absolute',
    backgroundColor: '#019031',
    height: wp(60),
    width: wp(60),
    borderRadius: wp(60) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    // opacity: 0.8,
  },
  circle4: {
    // position: 'absolute',
    backgroundColor: '#019031',
    height: wp(45),
    width: wp(45),
    borderRadius: wp(45) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    // opacity: 0.6,
  },
})
