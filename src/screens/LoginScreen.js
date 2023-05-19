import React, { useState ,  useEffect} from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from '../components/Header'
// import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { signItUp } from '../Redux/Action';
import {authtoken} from '../Redux/Reducers'
// import { useDispatch, useSelector } from "react-redux";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch()
  // const navigation = useNavigation();
  const [data, setData] = useState({
    email:"",
    password:''
  });
  const[sample,setSample]=useState("")
  console.log(sample,"   ,,,helllo i an in loginScreen");
  
  
  const imagesAllData=useSelector(state=>state?.userReducers)   
  
  console.log(imagesAllData,"goodharsh");
  useEffect(()=>{
    const mEmail =  AsyncStorage.getItem('Authtoken');
    console.warn(mEmail);
    setSample(imagesAllData?.authtoken)
  },[imagesAllData])
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  const login = () => {
    setModalVisible(true);
    if (data.email == "") {
      setModalVisible(false);
      setBadEmail(true)
    }
    else{
      setBadEmail(false)
      if (data.password == "") {
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
    // if(data="sample"){

    // }else{

    // }
    dispatch(signItUp(data, navigation))
    const mEmail = await AsyncStorage.getItem('Authtoken');
    console.log(mEmail ,"herahe");
    const mPass = await AsyncStorage.getItem('PASSWORD');
    if(mEmail===data.email && mPass===data.password){
      setModalVisible(false);
      navigation.navigate('Load');
    }
    else{
      setModalVisible(false);
      console.log('HARSH');
    }
  };
  


  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={data.email}
        name="email"
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
        value={data.password}
        name="password"
        onChangeText={(txt) => {
          setData((prevData) => ({ ...prevData, password: txt }));
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
      <Button mode="contained" onPress={getData}>
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
