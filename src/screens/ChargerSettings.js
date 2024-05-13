import React, { useState } from 'react'
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native'
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import close1 from '../assets/f11.png'
import close from '../assets/close.png'
// import { Avatar, Card, IconButton, Text } from 'react-native-paper';
import Button from '../components/Button'
import notifications from '../assets/bell.png'
import settings from '../assets/settings.png'
import photo from '../assets/photo.jpg'
import Header from '../components/Header'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const ChargerSettings = ({ navigation }) => {
  const [data, setData] = useState(false)

  const [charger, setCharger] = useState('')
  const press = () => {
    setData(false)
    setCharger('')
  }

  const sample = () => {
    setData(true)
    setCharger('HDHDD')
  }

  return (
    <>
      <Header style={styles.header}>Charging Status</Header>
      <SafeAreaView style={styles.container}>
        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Image
                source={settings}
                style={{ tintColor: '#FF6347', width: 25, height: 25 }}
                size={25}
              />
              <Text style={styles.menuItemText}>Payment</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Image
                source={settings}
                style={{ tintColor: '#FF6347', width: 25, height: 25 }}
                size={25}
              />
              <Text style={styles.menuItemText}>Tell Your Friends</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Image
                source={settings}
                style={{ tintColor: '#FF6347', width: 25, height: 25 }}
                size={25}
              />
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Image
                source={settings}
                style={{ tintColor: '#FF6347', width: 25, height: 25 }}
                size={25}
              />

              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableRipple>
        </View>
      </SafeAreaView>
    </>
  )
}

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: deviceHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: screenHeight * 0.192,
    // width: deviceWidth * 0.38,  THIS IS FOR ADD button
  },
  iconContainer: {
    width: deviceWidth * 0.18,
    height: deviceWidth * 0.18,
    borderRadius: deviceWidth * 0.15,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '30%',
    height: '30%',
    resizeMode: 'contain',
  },
  backgroundImage: {
    width: screenWidth * 0.91,
    height: screenHeight * 0.56,
    marginTop: screenHeight * -0.302,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -30,
    textAlign: 'center',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  // },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: -550,
    marginLeft: -200,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 3,
    paddingHorizontal: 100,
    top: -70 + getStatusBarHeight(),
  },
})

export default ChargerSettings
