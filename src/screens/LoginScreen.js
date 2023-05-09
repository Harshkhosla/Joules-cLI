import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'

export default function LoginScreen({ navigation }) {

  // const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  const login = () => {
    setModalVisible(true);
    if (email == "") {
      setModalVisible(false);
      setBadEmail(true)
    }
    else{
      setBadEmail(false)
      if (password == "") {
        setModalVisible(false);
        setBadPassword(true)
      }
      else{
        setTimeout(() => {
          setBadPassword(false);
          getData();
        }, 2000);
      }
    }
  }

  const getData = async () => {
    const mEmail = await AsyncStorage.getItem('EMAIL');
    console.log(mEmail);
    const mPass = await AsyncStorage.getItem('PASSWORD');
    if(mEmail===email && mPass===password){
      setModalVisible(false);
      navigation.navigate('Load');
    }
    else{
      setModalVisible(false);
      // Toast.show('Email or Password is wrong !', Toast.LONG);
      console.log('HARSH');
    }
  };
  

  // const onLoginPressed = () => {
  //   const emailError = emailValidator(email.value)
  //   const passwordError = passwordValidator(password.value)
  //   if (emailError || passwordError) {
  //     setEmail({ ...email, error: emailError })
  //     setPassword({ ...password, error: passwordError })
  //     return
  //   }else {
  //     setTimeout(() => {
  //       // setBadPassword(false);
  //       getData();
  //     }, 2000);
  //   }
  
  // }

  // const getData = async () => {
  //   const mEmail = await AsyncStorage.getItem('EMAIL');
  //   const mPass = await AsyncStorage.getItem('PASSWORD');
  //   if(mEmail===email && mPass===password){
  //     // setModalVisible(false);
  //     navigation.navigate('HomePage');
  //   }
  //   else{
  //     // setModalVisible(false);
  //     // Toast.show('Email or Password is wrong !', Toast.LONG);
  //     navigation.navigate('Home');
  //   }
  // };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={(txt) => {
          setEmail(txt);
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
        value={password}
        onChangeText={(txt) => {
          setPassword(txt);
        }}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={login}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
