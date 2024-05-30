import { Modal, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'

const VerifiedSuccess = ({ verifyStatus, setIsVerify }) => {
  // const {  } = props
  console.log(verifyStatus)
  const navigation = useNavigation()

  return (
    <Modal
      visible={verifyStatus}
      animationType="slide"
      onRequestClose={() => {
        setIsVerify(false)
      }}
      onShow={() => {
        setTimeout(() => {
          // navigation.navigate('HomechargingHomepage')
        }, 2000)
      }}
    >
      <View style={styles.cotainer}>
        <View style={styles.LogoContainer}>
          <View style={styles.LogoWrapper}>
            <Image
              style={styles.Logo}
              source={require('../assets/jouls.png')}
            />
          </View>
        </View>
        <View style={styles.containerContent}>
          <View style={styles.verifyStatusBox}>
            <Image
              style={styles.Check}
              source={require('../assets/check_circle.png')}
            />
            <Text style={styles.text}>Verified Successfully</Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default VerifiedSuccess

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  LogoContainer: {
    backgroundColor: '#fff',
    height: hp(24),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LogoWrapper: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#118615',
    borderRadius: 14,
  },
  Logo: {
    height: hp(9),
    width: wp(40),
    borderRadius: 14,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  containerContent: {
    padding: 20,
  },
  verifyStatusBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(5),
    height: hp(40),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CDCDCD',
    gap: 20,
  },
  Check: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: '400',
    color: '#666666',
  },
  inputBox: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    height: 50,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#B0B0B0',
  },
})
