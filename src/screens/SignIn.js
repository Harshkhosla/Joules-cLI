import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import React, { useState } from 'react'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'

import LoginInput from './LoginInput'
import SignupInputs from './SignupInputs'
import Circle from './Circle'
import { ScrollView } from 'react-native-gesture-handler'

const SignIn = ({ navigation }) => {
  const [login, setLogin] = useState(true)
  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.Container}
      >
        <View style={styles.Container}>
          <View style={styles.LogoContainer}>
            <View style={styles.circles}>
              <Circle />
              <Circle />
            </View>

            <View style={styles.LogoWrapper}>
              <Image
                style={styles.Logo}
                source={require('../assets/jouls.png')}
              />
            </View>
          </View>
          <View style={styles.SignInBoxContainer}>
            <View style={styles.SignIn_UpBox}>
              <View style={styles.Toggle_Login_SignUp}>
                <Text style={styles.TogglerText} onPress={() => setLogin(true)}>
                  Login
                </Text>
                <Text style={[{ fontSize: fp(4) }]}>|</Text>
                <Text
                  style={styles.TogglerText}
                  onPress={() => setLogin(false)}
                >
                  Sign up
                </Text>
              </View>
              <View style={styles.Inputs}>
                {login ? (
                  <LoginInput navigation={navigation} />
                ) : (
                  <SignupInputs navigation={navigation} />
                )}
                <View style={styles.row}>
                  <Text>
                    {login
                      ? 'Don’t have an account?'
                      : 'Already have an account?'}{' '}
                  </Text>
                  <TouchableOpacity>
                    {login ? (
                      <Text onPress={() => setLogin(false)} style={styles.link}>
                        Sign up
                      </Text>
                    ) : (
                      <Text onPress={() => setLogin(true)} style={styles.link}>
                        Sign in
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  LogoContainer: {
    backgroundColor: '#fff',
    height: hp(30),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'absolute',
    // backgroundColor: 'red',
    gap: 10,
    bottom: hp(-25),
  },
  LogoWrapper: {
    // backgroundColor: 'pink',
    borderRadius: 20,
    elevation: 5,
  },
  Logo: {
    height: hp(11),
    width: wp(42),
    borderRadius: 20,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    elevation: 20,
  },
  SignInBoxContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
    backgroundColor: '#fff',
    marginTop: -18,
  },
  SignIn_UpBox: {
    minHeight: hp(60),
    marginHorizontal: 20,
    margin: 30,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'white',
  },
  Toggle_Login_SignUp: {
    flexDirection: 'row',
    margin: 15,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  TogglerText: {
    padding: 12,
    color: 'green',
    fontSize: fp(2.7),
  },
  Inputs: {
    marginHorizontal: 20,
    // alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    fontWeight: 600,
    color: 'green',
    textDecorationLine: 'underline',
  },
})
