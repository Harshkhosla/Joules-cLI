import React, { useState } from 'react'
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

import { Checkbox } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { signItUp } from '../Redux/Action'
import Toast from 'react-native-toast-message'

<<<<<<< Updated upstream
const LoginInput = ({ navigation }) => {
=======
const LoginInput = ({navigation}) => {
  const dispatch=useDispatch()
  const [data,setdata]=useState({email:"",password:""})
  console.log("data in login",data);

  async function userlogin(){
    if(data.email && data.password){
    try {
      const response=await dispatch(signItUp(data,navigation))
      console.log("response lgin ",response);
    } catch (error) {
      console.log("error in login page",error);
    }
  }
  else{
    Toast.show({
      type:"error",
      text1:"please input email & password"
    })
  }
  }
>>>>>>> Stashed changes
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {/* <Input style={styles.inputone} />  */}
        <View>
          <TextInput label="Email" name="email" style={styles.input} value={data.email} 
           onChangeText={(text)=>{setdata({...data,email:text})}}
          />
        </View>
        <View>
          <TextInput label="Password" name="password" style={styles.input} 
           onChangeText={(text)=>{setdata({...data,password:text})}}
          />
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
<<<<<<< Updated upstream
        <TouchableOpacity
          style={styles.SignupButton}
          onPress={() => navigation.navigate('Welcomepage')}
        >
=======
        <TouchableOpacity style={styles.SignupButton}  onPress={userlogin}>
>>>>>>> Stashed changes
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
  inputone: {
    borderWidth: 2,
    borderRadius: 8,
    height: 40,
    backgroundColor: '#fff',
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
