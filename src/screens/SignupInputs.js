import React from 'react'
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import TextInput from '../components/Inputbox'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import InputBoxTwo from '../components/InputBoxTwo'

import { Checkbox } from 'react-native-paper'

const SignupInputs = () => {
  return (
    <View style={styles.container}>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      > */}
      <View style={styles.inputsContainer}>
        <View>
          <InputBoxTwo lable="Name" placeholder="Enter your name" />
        </View>
        <View>
          <InputBoxTwo lable="Email" placeholder="Enter your mail id" />
        </View>
      </View>

      <View style={styles.passwordContainer}>
        <InputBoxTwo lable="Password" placeholder="Enter password" />
        <InputBoxTwo lable="Confirm Password" placeholder="Enter password" />
      </View>
      <TouchableOpacity style={styles.SignupButton}>
        <Text style={styles.SignupButtonText}>Sign up</Text>
      </TouchableOpacity>
      <Text style={styles.TermsAndConditions}>
        By Signing up you agree to
        <Text style={{ color: 'green' }}> Terms & Conditions</Text>
      </Text>

      <Text style={styles.ortext}>or</Text>
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <View style={styles.socialIconWrapper}>
            <Image
              source={require('../assets/googlelogo.png')}
              // style={styles.socialIconText}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <View style={styles.socialIconWrapper}>
            <Image
              source={require('../assets/facebookvector.png')}
              // style={styles.socialIconText}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <View style={styles.socialIconWrapper}>
            <Image
              source={require('../assets/apple.png')}
              // style={styles.socialIconText}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* </KeyboardAvoidingView> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 20,
    // backgroundColor: 'pink',
  },
  inputsContainer: {
    // marginVertical: 8,
  },
  input: {
    borderRadius: 8,
    height: 40,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    width: wp(37.5),
    // flexWrap: 'wrap',
    gap: 10,
  },
  SignupButton: {
    // backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 30,
    padding: 10,
    borderWidth: 2,
    borderColor: 'green',
  },
  SignupButtonText: {
    fontSize: fp(2.6),
    color: 'green',
  },
  TermsAndConditions: {
    fontSize: fp(1.5),
    paddingTop: 10,
    textAlign: 'center',
  },
  ortext: {
    padding: 12,
    fontSize: fp(3),
    textAlign: 'center',
    color: '#8B8B8B',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'center',
  },
  socialButton: {
    padding: 8,
    marginHorizontal: 8,
    // borderWidth: 1,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#fff',
  },
  socialIconWrapper: {
    // padding: 5,
  },
})

export default SignupInputs
