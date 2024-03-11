import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import {
  responsiveHeight as hp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import Navmodal from './Navmodal'

const App_top_Header = ({ navigation, title, color, isHome }) => {
  const [isNavOpen, setNavOpen] = useState(false)

  const naveClose = () => {
    setNavOpen(false)
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.Icon}>
        {isHome ? (
          // <TouchableOpacity onPress={() => setNavOpen(true)}>
          <TouchableOpacity>
            <Image
              style={{ width: 35, resizeMode: 'contain' }}
              source={require('../assets/menuicon.png')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" size={25} color="#118615" />
          </TouchableOpacity>
        )}
        <Text style={styles.Text}>{title}</Text>
      </View>
      <Navmodal naveopen={isNavOpen} closeNave={naveClose} />
    </View>
  )
}

export default App_top_Header

const styles = StyleSheet.create({
  container: {
    height: hp(11),
    backgroundColor: '#C1E0C2',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'flex-end',
  },
  Icon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    gap: 5,
    marginBottom: 10,
  },
  Text: {
    fontSize: fp(3),
    color: '#5A5A5A',
    marginLeft: 8,
  },
})
