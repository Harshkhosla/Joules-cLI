import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import NewAllButton from '../components/NewAllButton'
import EvCharging from '../components/EvCharging'
import VerifiedSuccess from './VerifiedSuccess'

const MobileVerifyOtp = () => {
  const [IsVerify, setIsVerify] = useState(false)

  return (
    <View style={styles.cotainer}>
      <View style={styles.LogoContainer}>
        <View style={styles.LogoWrapper}>
          <Image style={styles.Logo} source={require('../assets/jouls.png')} />
        </View>
      </View>
      <View style={styles.containerContent}>
        <View>
          <Text style={[styles.text, { color: 'green' }]}>Hey Aman,</Text>
          <Text style={styles.text}>We have sent an OTP on</Text>
          <Text style={[styles.text, { color: 'green' }]}>8118817882</Text>
          <TextInput placeholder="Enter Phone" style={styles.inputBox} />
          <Text style={{ fontSize: 15 }}>
            Didn’t get one? We can
            <Text style={{ color: 'green' }}>resend it in 10 secs</Text>
          </Text>
        </View>

        <NewAllButton
          title={'Verify OTP'}
          action={() => {
            setIsVerify(true)
          }}
        />

        <View style={styles.evCharging}>
          <EvCharging />
        </View>
      </View>
      <VerifiedSuccess verifyStatus={IsVerify} setIsVerify={setIsVerify} />
    </View>
  )
}

export default MobileVerifyOtp

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
  containerContent: { flex: 1, padding: 20, justifyContent: 'space-between' },
  text: {
    fontSize: 18,
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
  evCharging: {
    position: 'absolute',
    bottom: 120,
    right: 0,
    opacity: 0.4,
  },
})
