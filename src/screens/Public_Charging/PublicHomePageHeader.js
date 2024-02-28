import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'

const PublicHomePageHeader = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.Icon}>
        {/* <Icon name="arrowleft" size={25} color="#118615" /> */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            style={{ width: 40, resizeMode: 'contain' }}
            source={require('../../assets/menuicon.png')}
          />
        </TouchableOpacity>
        <Text style={styles.Text}>Hello Aman!</Text>
      </View>
    </View>
  )
}

export default PublicHomePageHeader

const styles = StyleSheet.create({
  container: {
    height: hp(16),
    // height: 90,
    backgroundColor: '#C1E0C2',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'flex-end',
  },
  Icon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 10,
  },
  Text: {
    fontSize: fp(3),
    color: '#5A5A5A',
    marginLeft: 8,
  },
})
