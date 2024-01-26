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
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'
import TextInput from '../components/Inputbox'

import { Checkbox } from 'react-native-paper'

const LoginInput = () => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View>
          <TextInput label="Email" name="email" style={styles.input} />
        </View>
        <View>
          <TextInput label="Password" name="password" style={styles.input} />
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
        <TouchableOpacity style={styles.SignupButton}>
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
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // Adjust container styles if needed
  },
  input: {
    borderRadius: 20,
    height: hp(6.8),
    backgroundColor: '#fff',
    // Add any additional styling as needed
  },
  forgotRememberContainer: {
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
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
    borderRadius: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: 'green',
  },
  SignupButtonText: {
    fontSize: fp(2.6),
    color: 'green',
  },
  ortext: {
    padding: 10,
    fontSize: fp(3),
    textAlign: 'center',
    color: '#BFBFBF',
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

export default LoginInput
