import React from 'react'
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  Image,
  TextInput as Input,
  TouchableOpacity,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import TextInput from '../components/Inputbox'
import InputBoxTwo from '../components/InputBoxTwo'

import { Checkbox } from 'react-native-paper'

const LoginInput = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {/* <Input style={styles.inputone} />  */}
        <View style={styles.inputsContainer}>
          <View>
            <InputBoxTwo lable="Email" placeholder="Enter your mail id" />
          </View>
          <View>
            <InputBoxTwo lable="Password" placeholder="Enter your password" />
          </View>
        </View>
        <View style={styles.forgotRememberContainer}>
          <TouchableOpacity
          //   onPress={() => navigation.navigate('ResetPasswordScreen')}
          >
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>
          <View style={styles.checkboxContainer}>
            <Checkbox.Android
              status="checked"
              //   status={rememberMe ? 'checked' : 'unchecked'}
              // onPress={() => setRememberMe(!rememberMe)}
              // uncheckedColor={theme.colors.primary}
              // color={theme.colors.primary}
              style={styles.checkbox}
            />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.SignupButton}
          onPress={() => navigation.navigate('Welcomepage')}
        >
          <Text style={styles.SignupButtonText}>Login</Text>
        </TouchableOpacity>

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
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // Adjust container styles if needed
  },
  inputone: {
    borderWidth: 2,
    borderRadius: 8,
    height: 40,
    backgroundColor: '#fff',
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
  checkbox: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'green',
    padding: 2,
  },
  SignupButton: {
    // backgroundColor: 'red',
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
    // borderWidth: 1,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#fff',
  },
  socialIconWrapper: {
    // padding: 5,
  },
})

export default LoginInput
