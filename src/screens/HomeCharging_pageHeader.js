import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'

const HomeCharging_pageHeader = ({ navigation, title, color }) => {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.Icon}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            style={{ width: 35, resizeMode: 'contain' }}
            source={require('../assets/menuicon.png')}
          />
        </TouchableOpacity>
        <Text style={styles.Text}>{title}</Text>
      </View>
    </View>
  )
}

export default HomeCharging_pageHeader

const styles = StyleSheet.create({
  container: {
    height: hp(15),
    backgroundColor: '#C1E0C2',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'flex-end',
  },
  Icon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginBottom: 8,
  },
  Text: {
    fontSize: fp(3),
    color: '#5A5A5A',
    marginLeft: 8,
  },
})
