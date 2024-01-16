import React, { useState, useEffect } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Sideline from '../components/Sideline'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../components/Header'
import Loginbutton from '../components/Loginbutton'
import TextInput from '../components/Inputbox'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import LoginLogo from '../components/LoginLogo'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { loginuser, signItUp } from '../Redux/Action'
import Google from '../components/Green'
import { Checkbox } from 'react-native-paper'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch()
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const [sample, setSample] = useState('')
  console.log(sample, '   ,,,hello i am in loginScreen')

  const imagesAllData = useSelector((state) => state?.userReducers)

  const [loading, setLoading] = useState(false)
  console.log(imagesAllData, 'goodharsh')
  useEffect(() => {
    const mEmail = AsyncStorage.getItem('Authtoken')
    setSample(imagesAllData?.authtoken)
  }, [imagesAllData])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [badEmail, setBadEmail] = useState(false)
  const [badPassword, setBadPassword] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const handleFocus = () => {
    setIsFocused(true)
  }

  const [rememberMe, setRememberMe] = useState(false)

  const login = () => {
    setModalVisible(true)
    if (data.email === '') {
      setModalVisible(false)
      setBadEmail(true)
    } else {
      setBadEmail(false)
      if (data.password === '') {
        setModalVisible(false)
        setBadPassword(true)
      } else {
        setTimeout(() => {
          setBadPassword(false)
          getData()
        }, 2000)
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      const mEmail = await AsyncStorage.getItem('Authtoken')
      if (!mEmail === '') {
        navigation.navigate('Home')
      }
    }
    fetchData()
  }, [])

  const getData = async () => {
    setLoading(true)
    try {
      await dispatch(loginuser(data, navigation))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  return (
    <Background>
      <Image source={require('../assets/image1.png')} style={styles.logo} />
      <Header style={styles.header}>Create Account</Header>
      <Logo />

      <TextInput
        label="Name"
        returnKeyType="next"
        // name="password"
        style={styles.password}
        value={data.name}
        onChangeText={(txt) => {
          setData((prevData) => ({ ...prevData, name: txt }))
        }}
        // error={!!name.error}
        // errorText={name.error}
      />
      <TextInput
        label="Enter your Email"
        returnKeyType="next"
        style={styles.password}
        // name="password"
        value={data.email}
        onChangeText={(txt) => {
          setData((prevData) => ({ ...prevData, email: txt }))
        }}
        // error={!!name.error}
        // errorText={name.error}
      />
      <TextInput
        label="Password"
        returnKeyType="next"
        style={styles.password}
        // name="password"
        value={data.second}
        onChangeText={(txt) => {
          setData((prevData) => ({ ...prevData, second: txt }))
        }}
        // error={!!name.error}
        // errorText={name.error}
      />
      <TextInput
        label="Confirm Password"
        returnKeyType="next"
        style={styles.password}
        // name="password"
        value={data.password}
        onChangeText={(txt) => {
          setData((prevData) => ({ ...prevData, password: txt }))
        }}
        // error={!!name.error}
        // errorText={name.error}
      />

      <View style={styles.forgotRememberContainer}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity> */}
        <View style={styles.checkboxContainer}>
          <Checkbox.Android
            status={rememberMe ? 'checked' : 'unchecked'}
            onPress={() => setRememberMe(!rememberMe)}
            uncheckedColor={theme.colors.primary}
            color={theme.colors.primary}
            style={styles.checkbox}
          />
          <Text style={styles.rememberMeText}>
            I agree with Terms & Privacy
          </Text>
        </View>
      </View>

      <Loginbutton mode="contained" onPress={getData} disabled={loading}>
        {' '}
        {loading ? 'Loading...' : 'Sign Up'}
      </Loginbutton>

      <View style={styles.row}>
        <Text>Or Sign up With </Text>
      </View>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <View style={styles.socialIconWrapper}>
            {/* Insert your custom icon or logo component */}
            {/* <Text style={styles.socialIconText}>G</Text> */}
            <Image
              source={require('../assets/googlelogo.png')}
              style={styles.socialIconText}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <View style={styles.socialIconWrapper}>
            {/* Insert your custom icon or logo component */}
            {/* <Text style={styles.socialIconText}>A</Text> */}
            <Image
              source={require('../assets/apple.png')}
              style={styles.socialIconText}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.link}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Log In</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    minHeight: screenHeight,
    paddingBottom: 16,
  },
  header: {
    fontSize: 21,
    color: 'black',
    fontWeight: 'bold',
    top: 30,
  },
  logo: {
    width: screenWidth * 1,
    height: screenHeight * 0.18,
    marginTop: screenHeight * -0.02,
    top: screenHeight * 0.01,
  },
  checkbox: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'green',
    padding: 2,
  },
  emailContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: -5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  password: {
    marginTop: -20,
    height: 47,
  },
  forgotRememberContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: -8,
    marginTop: -8,
  },
  forgot: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 3,
    // fontWeight: 'bold',
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 200,
    textDecorationLine: 'underline',
    color: theme.colors.primary,
    bottom: -40,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: -15,
    bottom: -15,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
    backgroundColor: '#ECE9EC', // Replace with your desired gray color
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
})
