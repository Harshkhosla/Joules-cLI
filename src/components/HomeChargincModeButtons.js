import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'

const HomeChargincModeButtons = ({ img, ModeName, action }) => {
  return (
    <TouchableOpacity style={styles.ModeBoxesStyle} onPress={action}>
      <Image style={styles.imgicon} source={img} />
      <Text style={[styles.text, { color: '#797979', marginBottom: 4 }]}>
        {ModeName}
      </Text>
    </TouchableOpacity>
  )
}

export default HomeChargincModeButtons

const styles = StyleSheet.create({
  ModeBoxesStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    width: wp(20),
    // height: hp(10),
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  imgicon: {
    height: 30,
    resizeMode: 'contain',
  },
  text: {
    color: '#118615',
    fontSize: fp(2),
  },
})
