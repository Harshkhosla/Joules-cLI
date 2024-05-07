import React, { useState } from 'react'
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import TextInput from '../../components/Inputbox'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import InputBoxTwo from '../../components/InputBoxTwo'

import { Checkbox } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { loginuser } from '../../Redux/Action'
import Toast from 'react-native-toast-message'

const SignupInputs = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [userData, setuserData] = useState({
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
  })
  const dispatch = useDispatch()

  const [nameValuePresent, setNameValuePresent] = useState({
    show: false,
    message: '',
  })
  const [emailValuePresent, setEmailValuePresent] = useState({
    show: false,
    message: '',
  })
  const [passwordValuePresent, setPasswordValuePresent] = useState({
    show: false,
    message: '',
  })
  const [confirmPasswordValuePresent, setConfirmPasswordValuePresent] =
    useState({
      show: false,
      message: '',
    })

  const signup = async () => {
    const allValuesEmpty = Object.keys(userData).every(
      (key) => userData[key] !== ''
    )

    if (!userData.Name) {
      setNameValuePresent((prev) => ({
        ...prev,
        show: true,
        message: 'Please enter a valid Name',
      }))
      return
    } else {
      setNameValuePresent((prev) => ({
        ...prev,
        show: false,
        // message: 'Please enter a valid Name',
      }))
    }

    if (!userData.Email) {
      setEmailValuePresent((prev) => ({
        ...prev,
        show: true,
        message: 'Please enter a valid email address',
      }))
      return
    } else {
      setEmailValuePresent((prev) => ({
        ...prev,
        show: false,
        message: '',
      }))
    }

    if (!userData.Password) {
      setPasswordValuePresent((prev) => ({
        ...prev,
        show: true,
        message: 'Please enter a password',
      }))
      return
    } else {
      if (userData.Password.length < 4) {
        setPasswordValuePresent((prev) => ({
          ...prev,
          show: true,
          message: 'Password must be at least 4 characters long',
        }))
        return
      }
      setPasswordValuePresent((prev) => ({
        ...prev,
        show: false,
        message: '',
      }))
    }

    if (!userData.ConfirmPassword) {
      setConfirmPasswordValuePresent((prev) => ({
        ...prev,
        show: true,
        message: 'Please enter a Confirm password',
      }))
      return
    } else {
      setConfirmPasswordValuePresent((prev) => ({
        ...prev,
        show: false,
        message: '',
      }))
    }

    // setNameValuePresent(!userData.Name)
    // setEmailValuePresent(!userData.Email)
    // setPasswordValuePresent(!userData.Password)
    // setConfirmPasswordValuePresent(!userData.ConfirmPassword)

    // if (!allValuesEmpty) {
    //   return Toast.show({
    //     type: 'error',
    //     position: 'top',
    //     text1: 'Sign up Error',
    //     text2: 'please input all fields',
    //     visibilityTime: 4000,
    //     text1Style: { color: 'red', fontSize: 14 },
    //     autoHide: true,
    //     bottomOffset: 40,
    //     swipeable: true,
    //   })
    // }

    const generalEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid =
      generalEmailRegex.test(userData.Email) &&
      userData.Email.toLowerCase().includes('@gmail.com')
    if (!isValid) {
      setEmailValuePresent((prev) => ({
        ...prev,
        show: true,
        message: "Email must include characters '@' and '.'",
      }))
      setPasswordValuePresent((prev) => ({
        ...prev,
        show: false,
        message: '',
      }))
      return
    }
    // if (!isValid) {
    //   return Toast.show({
    //     type: 'error',
    //     position: 'top',
    //     text1: 'Login Error',
    //     text2: 'email is invalid',
    //     visibilityTime: 4000,
    //     text1Style: { color: 'red', fontSize: 14 },
    //     autoHide: true,
    //     bottomOffset: 40,
    //     swipeable: true,
    //   })
    // }

    if (isValid && allValuesEmpty) {
      if (userData.Password !== userData.ConfirmPassword) {
        return Toast.show({
          type: 'error',
          text2: 'password and confirm password are different',
          text1: 'validation error',
          text1Style: { color: 'red', fontSize: 14 },
          text2Style: { color: 'black' },
          swipeable: true,
        })
      }

      try {
        setLoading(true)
        const response = dispatch(loginuser(userData, navigation, setLoading))
        setuserData({ Name: '', Email: '', Password: '', ConfirmPassword: '' })
      } catch (error) {
        console.log('error in singup in signupinputs component', error)
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <View>
          <InputBoxTwo
            label="Name"
            placeholder="Enter your name"
            value={userData.Name}
            setValue={setuserData}
            objectData={userData}
            CheckValuePresent={nameValuePresent.show}
          />
          {nameValuePresent.show && (
            <Text style={styles.errorText}> {nameValuePresent.message}</Text>
          )}
        </View>
        <View>
          <InputBoxTwo
            label="Email"
            placeholder="Enter your mail id"
            value={userData.Email}
            setValue={setuserData}
            objectData={userData}
            CheckValuePresent={emailValuePresent.show}
          />

          {emailValuePresent.show && (
            <Text style={{ color: 'red', marginLeft: 10 }}>
              {emailValuePresent.message}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.passwordContainer}>
        <View style={{ width: '48%' }}>
          <InputBoxTwo
            label="Password"
            placeholder="Enter your password"
            value={userData.Password}
            setValue={setuserData}
            objectData={userData}
            CheckValuePresent={passwordValuePresent.show}
          />
          {passwordValuePresent.show && (
            <Text style={{ color: 'red', marginLeft: 10 }}>
              {passwordValuePresent.message}
            </Text>
          )}
        </View>

        <View style={{ width: '48%' }}>
          <InputBoxTwo
            label="ConfirmPassword"
            placeholder="Enter password"
            value={userData.ConfirmPassword}
            setValue={setuserData}
            objectData={userData}
            CheckValuePresent={confirmPasswordValuePresent.show}
          />
          {confirmPasswordValuePresent.show && (
            <Text style={styles.errorText}>
              {confirmPasswordValuePresent.message}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.SignupButton}
        onPress={signup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="green" />
        ) : (
          <Text style={styles.SignupButtonText}>Sign up</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.TermsAndConditions}>
        By Signing up you agree to
        <Text style={{ color: 'green', textDecorationLine: 'underline' }}>
          Terms & Conditions
        </Text>
      </Text>
      {/* <Text style={styles.ortext}>or</Text>
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <View style={styles.socialIconWrapper}>
            <Image source={require('../../assets/googlelogo.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <View style={styles.socialIconWrapper}>
            <Image source={require('../../assets/facebookvector.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <View style={styles.socialIconWrapper}>
            <Image source={require('../../assets/apple.png')} />
          </View>
        </TouchableOpacity>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 10,
    // backgroundColor: 'pink',
  },
  inputsContainer: {
    // marginVertical: 8,
    color: 'black',
  },
  input: {
    borderRadius: 8,
    height: 40,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // width: wp(37.5),
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
    color: 'black',
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
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
