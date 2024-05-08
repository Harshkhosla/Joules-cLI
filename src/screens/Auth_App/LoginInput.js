import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput as Input,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TextInput from '../../components/Inputbox'
import InputBoxTwo from '../../components/InputBoxTwo'
import { Checkbox } from 'react-native-paper'
import { setAuthtoken, signItUp } from '../../Redux/Action'
import { useDispatch } from 'react-redux'
// import axios from 'axios';
import Toast, { BaseToast } from 'react-native-toast-message'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { color } from 'd3'

const LoginInput = ({ navigation }) => {
  const ApiURL = 'http://165.22.223.26:5000' // live url
  // const ApiURL = 'http://192.168.1.6:5200' // live url
  const [loading, setLoading] = useState(false)
  const [userData, setuserData] = useState({ email: '', password: '' })
  const [emailValuePresent, setEmailValuePresent] = useState({
    show: false,
    message: '',
  })
  const [passwordValuePresent, setPasswordValuePresent] = useState({
    show: false,
    message: '',
  })
  const [rememberMe, setRememberMe] = useState(true)
  const dispatch = useDispatch()

  const login = async () => {
    const allValuesPresent = Object.keys(userData).every(
      (key) => userData[key] !== ''
    )
    if (!userData.email) {
      setEmailValuePresent((prev) => ({
        ...prev,
        show: true,
        message: 'Please enter a valid email address',
      }))
      setPasswordValuePresent((prev) => ({
        ...prev,
        show: false,
        message: '',
      }))
      return
    }
    const generalEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid =
      generalEmailRegex.test(userData.email) &&
      userData.email.toLowerCase().includes('@gmail.com')
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

    if (!userData.password) {
      setEmailValuePresent((prev) => ({
        ...prev,
        show: false,
        message: '',
      }))
      setPasswordValuePresent((prev) => ({
        ...prev,
        show: true,
        message: 'Please enter a password',
      }))
      return
    }

    const isValidpassword = isPasswordValid(userData.password)
    console.log(isValid) // Output: true
    if (!isValidpassword) {
      setEmailValuePresent((prev) => ({
        ...prev,
        show: false,
        message: '',
      }))
      setPasswordValuePresent((prev) => ({
        ...prev,
        show: true,
        message: 'Password must be at least 4 characters long',
      }))
      return
    }

    if (allValuesPresent) {
      try {
        setLoading(true)
        const response = await dispatch(
          signItUp(userData, navigation, setLoading)
        )
        console.log('clickinoginbuttonresponse', response)
        if (response) {
          setuserData({ ...userData, email: '', password: '' })
        }
        setEmailValuePresent((prev) => ({
          ...prev,
          show: false,
          message: '',
        }))
        setPasswordValuePresent((prev) => ({
          ...prev,
          show: false,
          message: '',
        }))
        setTimeout(() => {
          setLoading(false)
        }, 5000)
      } catch (error) {
        console.error('error in login user', error)
      }
    }
  }

  const isPasswordValid = (password) => {
    // Password length should be at least 8 characters
    if (password.length < 4) {
      return false
    }

    // Password should contain at least one lowercase letter
    // if (!/[a-z]/.test(password)) {
    //   return false;
    // }

    // // Password should contain at least one uppercase letter
    // if (!/[A-Z]/.test(password)) {
    //   return false;
    // }

    // // Password should contain at least one digit
    // if (!/\d/.test(password)) {
    //   return false;
    // }

    // Password meets all criteria
    return true
  }

  GoogleSignin.configure({
    offlineAccess: true,
    webClientId:
      '156987578910-u2mg62hrg7dk6d2deunerts475sr59mb.apps.googleusercontent.com', // Replace with your web client ID from Google Cloud Console
    androidClientId:
      '156987578910-mh16soc5k45kvf0heu87uaqtmnhm1h2p.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  })

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      // Open Google sign-in prompt
      await GoogleSignin.signOut()
      await GoogleSignin.hasPlayServices()
      console.log(' get data')
      const userInfo = await GoogleSignin.signIn()

      console.log(' get data', userInfo.user)
      // Handle signed-in user data
      const response = await fetch(`${ApiURL}/admin/user/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenId: userInfo.idToken,
          email: userInfo.user.email,
          // Add any other required user data here
        }),
      })

      // Handle the response from your backend API
      const data = await response.json()
      console.log('Backend API response:', data)

      if (response.ok) {
        if (data?.mid) {
          const mid = data.mid
          await AsyncStorage.setItem('mid', mid)
        }
        if (data?.name) {
          const name = data.name
          await AsyncStorage.setItem('name', name)
        }
        if (data?.authToken) {
          const authtoken = JSON.stringify(data.authToken)
          console.log('authtoken', authtoken)
          await AsyncStorage.setItem('Authtoken', authtoken)
          dispatch(setAuthtoken(authtoken))
          Toast.show({
            type: 'success',
            text1: 'login Successfull',
            text2: data?.toast,
            text1Style: { color: 'green' },
            text2Style: { color: 'black' },
            position: 'top',
          })
          navigation.navigate('chargerSelection')
        }
      } else {
        // Handle non-200 responses here
        console.error('Non-200 response received:', response.status)
      }

      // console.log('Backend API response:', response.data);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the sign-in flow
        console.log('User cancelled the sign-in flow')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Sign-in is in progress already
        console.log('Sign-in is in progress already')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available or outdated
        console.log('Play services not available or outdated')
      } else {
        // Some other error occurred
        console.error('Error:', error.message)
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <View>
          <InputBoxTwo
            label="email"
            placeholder="Enter your mail id"
            value={userData.email}
            setValue={setuserData}
            objectData={userData}
            CheckValuePresent={emailValuePresent.show}
          />
        </View>
        {emailValuePresent.show && (
          <Text style={{ color: 'red', marginLeft: 10 }}>
            {emailValuePresent.message}
          </Text>
        )}
        <View>
          <InputBoxTwo
            label="password"
            placeholder="Enter your password"
            value={userData.password}
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
      </View>
      <View style={styles.forgotRememberContainer}>
        <TouchableOpacity
        //   onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
        {/* <View style={styles.checkboxContainer}>
          <Checkbox.Android
            status={rememberMe ? 'checked' : 'unchecked'}
            onPress={() => setRememberMe(!rememberMe)}
            // uncheckedColor={theme.colors.primary}
            // color={theme.colors.primary}
            style={styles.checkbox}
          />
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View> */}
      </View>
      <TouchableOpacity
        style={styles.SignupButton}
        onPress={login}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="green" />
        ) : (
          <Text style={styles.SignupButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* <Text style={styles.ortext}>or</Text> */}
      <View style={styles.socialButtonsContainer}>
        {/* <TouchableOpacity style={styles.socialButton}> */}
        {/* <View style={styles.socialIconWrapper}> */}
        {/* <Image
                source={require('../../assets/googlelogo.png')}
                // style={styles.socialIconText}
              /> */}
        {/* <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleLogin}
          disabled={false}
        /> */}
        {/* </View> */}
        {/* </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.socialButton}>
          <View>
            <Image source={require('../../assets/facebookvector.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <View>
            <Image source={require('../../assets/apple.png')} />
          </View>
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    // flex: 1,
    // Adjust container styles if needed
  },

  inputsContainer: {
    // marginVertical: 8,
  },
  input: {
    borderRadius: 8,
    height: 40,
    backgroundColor: '#fff',
  },
  forgotRememberContainer: {
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: 10,
  },
  forgot: {
    color: 'green',
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  SignupButton: {
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    borderWidth: 2,
    borderColor: 'green',
  },
  SignupButtonText: {
    fontSize: fp(2.6),
    color: 'green',
  },
  ortext: {
    padding: 15,
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

    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#fff',
  },
  rememberMeText: {
    color: 'black',
  },
})

export default LoginInput
