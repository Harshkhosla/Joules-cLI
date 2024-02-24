import React, { useState } from 'react'
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
import { useDispatch } from 'react-redux'
import { loginuser } from '../Redux/Action'
import Toast from 'react-native-toast-message'

const SignupInputs = ({navigation}) => {
  const [userData,setuserData]=useState({Name:"",Email:"",Password:"",ConfirmPassword:""})
  const dispatch=useDispatch()
    console.log("userData",userData);
  const signup=()=>{
    const allValuesEmpty = Object.keys(userData).every(key => userData[key] !== "");
    if(!allValuesEmpty){
      return Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Sign up Error',
        text2: 'please input all field',
        visibilityTime: 4000,
        text1Style:{color:"red",fontSize:14},
        autoHide: true,
        bottomOffset: 40,
        swipeable:true
      }); 
    }
    const generalEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const hasNumber = /\d/.test(userData.Email);
    const isValid = generalEmailRegex.test(userData.Email) && userData.Email.toLowerCase().includes('@gmail.com');
    if(!isValid){
      return Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Login Error',
        text2: 'email is invalid',
        visibilityTime: 4000,
        text1Style:{color:"red",fontSize:14},
        autoHide: true,
        bottomOffset: 40,
        swipeable:true
      });
    }
   if(isValid && allValuesEmpty){
    if(userData.Password!=userData.ConfirmPassword){
      return Toast.show({
        type:"error",
        text2:"password and confirm password are same",
        text1:"validation error",
        text1Style:{color:"red",fontSize:14},
        text2Style:{color:"black"},
        swipeable:true
      })
    }
    try {
      const response=dispatch(loginuser(userData,navigation))
    } catch (error) {
      console.log("error in singup",error)
    }
  }
  }
  return (
    <View style={styles.container}>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      > */}
      <View style={styles.inputsContainer}>
        <View>
          <InputBoxTwo label="Name" placeholder="Enter your name" value={userData.Name} setValue={setuserData} objectData={userData}/>
        </View>
        <View>
          <InputBoxTwo label="Email" placeholder="Enter your mail id" value={userData.Email} setValue={setuserData}  objectData={userData}/>
        </View>
      </View>
      <View style={styles.passwordContainer}>
        <InputBoxTwo label="Password" placeholder="Enter password" value={userData.Password} setValue={setuserData}  objectData={userData} />
        <InputBoxTwo label="ConfirmPassword" placeholder="Enter password"  value={userData.ConfirmPassword} setValue={setuserData}  objectData={userData}/>
      </View>
      <TouchableOpacity style={styles.SignupButton} onPress={signup}>
        <Text style={styles.SignupButtonText}>Sign up</Text>
      </TouchableOpacity>
      <Text style={styles.TermsAndConditions}>
        By Signing up you agree to
        <Text style={{ color: 'green',textDecorationLine:"underline"}}> Terms & Conditions</Text>
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
    color:"black"
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
    color:"black"
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
