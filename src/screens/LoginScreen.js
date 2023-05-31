import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Sideline from '../components/Sideline'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from '../components/Header'
// import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import LogoLogin from '../components/LoginLogo'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { signItUp } from '../Redux/Action';
import { authtoken } from '../Redux/Reducers'
import Google from '../components/Green'
// import { useDispatch, useSelector } from "react-redux";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch()
  // const navigation = useNavigation();
  const [data, setData] = useState({
    email: "",
    password: ''
  });
  const [sample, setSample] = useState("")
  console.log(sample, "   ,,,helllo i an in loginScreen");


  const imagesAllData = useSelector(state => state?.userReducers)


  // ---------------------------------------this is the code for dectructuring the data in mqtt-------------------------------------------//
  const [loading, setLoading] = useState(false); 
  console.log(imagesAllData, "goodharsh");
  useEffect(() => {
    const mEmail = AsyncStorage.getItem('Authtoken');
    // console.warn(mEmail);
    // const jsonString = imagesAllData?.authtoken;
    // const data = JSON.parse(jsonString);
    // const { value, unit, sensor } = data;
    // console.log(value, "heheheheh");
    setSample(imagesAllData?.authtoken)
  }, [imagesAllData])





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
    else {
      setBadEmail(false)
      if (data.password == "") {
        setModalVisible(false);
        setBadPassword(true)
      }
      else {
        setTimeout(() => {
          setBadPassword(false);
          getData();
        }, 2000);
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      const mEmail = await AsyncStorage.getItem('Authtoken');
      //   console.log(mEmail,"googmorning");
      if (!mEmail == "") {
        navigation.navigate('Home');
      }
    };
    fetchData();
  }, [])

  const getData = async () => {
    setLoading(true); // Start loading
    try {
      await dispatch(signItUp(data, navigation));
      setLoading(false); // Stop loading when the API call is complete
    } catch (error) {
      setLoading(false); // Stop loading if there's an error
      console.error(error);
    }
  };
  


  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      {/* <Sideline/> */}
      <Logo />
      {/* <Google /> */}
      <LogoLogin />
      <Header>Welcome back</Header>
      {/* <View style={styles.email}>
        <Text>Email </Text>
      </View> */}
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
      <Button
        mode="contained"
        onPress={getData}
        disabled={loading} // Disable the button when loading is true
      >
        {loading ? 'Loading...' : 'Login'} {/* Display 'Loading...' when loading is true */}
      </Button>
      <View style={styles.row}>
        <Text>Or Log in With </Text>
      </View>
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
    // fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  email: {
    fontWeight: 'bold',
    width: '100%',
    alignItems: 'flex-start',
  }
})
