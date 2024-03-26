import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SupportAndRfidHeader = ({ navigation, title }) => {
  console.log(title)
  return (
    <View style={styles.container}>
      <View style={styles.Icon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={25} color="#118615" />
        </TouchableOpacity>
        <Text style={styles.Text}>{title}</Text>
      </View>
    </View>
  )
}

export default SupportAndRfidHeader

const styles = StyleSheet.create({
  container: {
    height: hp(12),
    backgroundColor: '#C1E0C2',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'flex-end',
    // marginLeft: -10,
    // width: hp(48),
    // marginTop: -10,
  },
  Icon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
  },
  Text: {
    fontSize: fp(3),
    color: '#5A5A5A',
    marginLeft: 8,
  },
})
