import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions'
import { updateUser } from '../../Redux/Action'
import { getUserData } from '../../Redux/Action'
import { useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'

const Profile_Edit_Form = () => {
  const navigation = useNavigation()
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mid, setMid] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedMid = await AsyncStorage.getItem('mid')
        const data = await dispatch(getUserData(storedMid))
        setMid(storedMid)
        const userdata = await data
        await setName(userdata.name)
        await setEmail(userdata.email)
        console.log('from front', userdata.name)
      } catch (error) {
        console.error('Error retrieving data:', error)
      }
    }

    fetchData()
  }, [])

  const update = async () => {
    const updatedData = {
      email: email,
      password: password,
      name: name,
      mid: mid,
    }
    console.log('from front', updatedData)
    dispatch(updateUser(updatedData, navigation))
  }

  return (
    <View style={styles.container}>
      <TextInput
       style={[styles.input, { color: 'gray' }]}
        placeholder="Full Name"
        value={name}
        onChangeText={(text) => setName(text)}
        placeholderTextColor="gray"
        returnKeyType="next"
      />
      <TextInput
    style={[styles.input, { color: 'gray' }]}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="gray"
        keyboardType="email-address"
        returnKeyType="next"
      />
     <View style={{ position: 'relative' }}>
          <TextInput
            style={[styles.input, { color: 'gray' }]}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="gray"
            secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
            returnKeyType="done"
          />
          {/* Eye button to toggle password visibility */}
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'visibility-off' : 'visibility'} // Show different icon based on showPassword state
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={update}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile_Edit_Form

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'pink',
  },
  input: {
    height: 45,
    width: wp(80),
    borderColor: '#838284',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: hp(6),
    paddingHorizontal: 20,
    // color: 'red',
  },  eyeButton: {
    position: 'absolute',
    top: 12,
    right: 10,
    zIndex: 1,
  },
  buttonContainer: {
    width: wp(50),
    height: 49,
    alignSelf: 'center',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#118615',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
})
