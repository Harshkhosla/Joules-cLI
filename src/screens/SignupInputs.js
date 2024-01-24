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

import { Checkbox } from 'react-native-paper'

const SignupInputs = () => {
  return (
    <View style={styles.container}>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      > */}
      <View>
        <TextInput label="Name" name="name" style={styles.input} />
      </View>
      <View>
        <TextInput label="Email id" name="email" style={styles.input} />
      </View>

      <View style={styles.passwordContainer}>
        <TextInput label="Password" name="password" style={styles.input} />
        <TextInput
          label="Confirm assword"
          name="cpassword"
          style={styles.input}
        />
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
        <TouchableOpacity
          style={[
            styles.socialButton,
            {
              padding: 6,
            },
          ]}
        >
          <View
            style={[
              styles.socialIconWrapper,
              {
                backgroundColor: '#1977F3',
                width: wp(12),
                height: wp(12),
                borderRadius: wp(12) / 2,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
          >
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
  input: {
    borderRadius: 20,
    height: hp(6.8),
    backgroundColor: '#fff',
    // Add any additional styling as needed
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
    borderRadius: 15,
    marginTop: 10,
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
    padding: 10,
    fontSize: fp(3),
    textAlign: 'center',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'center',
  },
  socialButton: {
    padding: 12,
    marginHorizontal: 8,
    // borderWidth: 1,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#fff',
  },
  socialIconWrapper: {
    // padding: 5,
  },
})

export default SignupInputs
