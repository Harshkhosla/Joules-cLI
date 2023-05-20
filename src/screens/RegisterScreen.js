import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import LogoLogin from '../components/LoginLogo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { useDispatch, useSelector } from 'react-redux';
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { loginuser } from '../Redux/Action';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
 

  const dispatch = useDispatch()
  // const navigation = useNavigation();
  const [data, setData] = useState({
    name:"",
    email:"",
    password:''
  });
  console.log(data);
  const [name, setName] = useState("");
  const [badName, setBadName] = useState(false);
  const [email, setEmail] = useState("");
  const [badEmail, setBadEmail] = useState(false);
  const [mobile, setMobile] = useState("");
  const [badMobile, setBadMobile] = useState(false);
  const [password, setPassword] = useState("");
  const [badPassword, setBadPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [badConfirmPassword, setBadConfirmPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // const signupp = () => {
  //   console.log(name);
  //   setButtonDisabled(true);
  //   if (name == "") {
  //     setBadName(true);
  //     setButtonDisabled(false);
  //   } else {
  //     setBadName(false);
  //     if (email == "") {
  //       setBadEmail(true);
  //       setButtonDisabled(false);
  //     } else {
  //       setBadEmail(false);
  //       if (mobile == "") {
  //         setBadMobile(true);
  //         setButtonDisabled(false);
  //       } else {
  //         setBadMobile(false);
  //         if (password == "") {
  //           setBadPassword(true);
  //           setButtonDisabled(false);
  //         } else {
  //           setBadPassword(false);
  //           if (confirmPassword == "") {
  //             setBadConfirmPassword(true);
  //             setButtonDisabled(false);
  //           } else {
  //             saveData();
  //             setBadConfirmPassword(false);
              
  //           }
  //         }
  //       }
  //     }
  //   }
  // };

  const saveData = async () => {
    dispatch(loginuser(data))
    // await AsyncStorage.setItem("NAME", "sample");
    // await AsyncStorage.setItem("EMAIL", data.email);
    // // await AsyncStorage.setItem("MOBILE", mobile);
    // await AsyncStorage.setItem("PASSWORD", data.password);
    // console.log(":yes");
    // navigation.goBack();
  };
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <LogoLogin/>
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        // name="password"
        value={data.name}
          onChangeText={(txt) => {
            setData((prevData) => ({ ...prevData, name: txt }));
          }}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        name="email"
        value={data.email}
          onChangeText={(txt) => {
            setData((prevData) => ({ ...prevData, email: txt }));
          }}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        name="password"
        value={data.password}
          onChangeText={(txt) => {
            setData((prevData) => ({ ...prevData, password: txt }));
          }}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={saveData}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
