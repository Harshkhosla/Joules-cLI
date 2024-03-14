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
import TextInput from '../../components/Inputbox'
import InputBoxTwo from '../../components/InputBoxTwo'
import { Checkbox } from 'react-native-paper'
import { signItUp } from '../../Redux/Action'
import { useDispatch } from 'react-redux'
import Toast, { BaseToast } from 'react-native-toast-message'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'

const LoginInput = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setuserData] = useState({ Email: '', Password: '' })
  const [rememberMe, setRememberMe] = useState(true)
  const dispatch = useDispatch()

  const login = () => {
    const allValuesPresent = Object.keys(userData).every(
      (key) => userData[key] !== ''
    )
    if (!allValuesPresent) {
      return Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Login Error',
        text2: 'please input all field',
        visibilityTime: 4000,
        text1Style: { color: 'red', fontSize: 14 },
        autoHide: true,
        bottomOffset: 40,
        swipeable: true,
      })
    }
    const generalEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // const hasNumber = /\d/.test(userData.Email);
    // const isValid = generalEmailRegex.test(userData.Email) && userData.Email.toLowerCase().includes('@gmail.com') && hasNumber;
    const isValid =
      generalEmailRegex.test(userData.Email) &&
      userData.Email.toLowerCase().includes('@gmail.com')
    if (!isValid) {
      return Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Login Error',
        text2: 'email is invalid',
        visibilityTime: 4000,
        text1Style: { color: 'red', fontSize: 14 },
        autoHide: true,
        bottomOffset: 40,
        swipeable: true,
      })
    }
    if (isValid && allValuesPresent) {
      try {
        setLoading(true);
        const response = dispatch(signItUp(userData, navigation,setLoading))
        setuserData({...userData,Email:"",Password:""})
        console.log("click in login button");
        setTimeout(() => {
          setLoading(false)
        }, 10000);
      } catch (error) {
        console.error('error in login user', error)
      }
    } 
    else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Login Error',
        text2: 'Please input all field',
        visibilityTime: 4000,
        text1Style: { color: 'red', fontSize: 14 },
        autoHide: true,
        bottomOffset: 40,
        swipeable: true,
      })
    }
  }

  GoogleSignin.configure({
    offlineAccess: true,
    webClientId:
      '683362406803-fo4tm1la7a8kh2qilell97vf8ae71d7b.apps.googleusercontent.com', // Replace with your web client ID from Google Cloud Console
    androidClientId:
      '683362406803-tgq3a58u23346etf2pgrrabh23o5hf11.apps.googleusercontent.com',
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
            label="Email"
            placeholder="Enter your mail id"
            value={userData.Email}
            setValue={setuserData}
            objectData={userData}
          />
        </View>
        <View>
          <InputBoxTwo
            label="Password"
            placeholder="Enter your password"
            value={userData.Password}
            setValue={setuserData}
            objectData={userData}
          />
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
      <TouchableOpacity style={styles.SignupButton} onPress={login} disabled={loading}>
      {loading ? (
          <ActivityIndicator size="small" color="green"/>
        ) :  
        (<Text style={styles.SignupButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.ortext}>or</Text>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <View style={styles.socialIconWrapper}>
            {/* <Image
                source={require('../../assets/googlelogo.png')}
                // style={styles.socialIconText}
              /> */}
            <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={handleGoogleLogin}
              disabled={false}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <View>
            <Image source={require('../../assets/facebookvector.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <View>
            <Image source={require('../../assets/apple.png')} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flex: 1,
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
