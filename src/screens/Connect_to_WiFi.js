import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions'

import App_top_Header from './App_top_Header'

const Connect_to_WiFi = ({ navigation }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleConnect = () => {
    // Implement logic to handle password submission and validation
    if (password === confirmPassword) {
      // Passwords match, proceed with connection
      console.log('Passwords match, connecting...')
    } else {
      // Passwords don't match, show error message
      console.log('Passwords do not match!')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : '1000'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inner}>
            <App_top_Header
              title={'Connect to a Wi-Fi'}
              navigation={navigation}
              color={'#C1E0C2'}
            />

            <View style={styles.formcontent}>
              <View>
                <Text style={styles.Text}>
                  Please add your Wi-Fi credentials to connect the charger to
                  control it seamlessly !!
                </Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="SSID"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.ConnectButton}
                  onPress={handleConnect}
                >
                  <Text style={styles.ConnectText}>Connect</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <View style={styles.tagNote}>
        <Image
          style={styles.tagNoteImg}
          source={require('../assets/energy_savings_leaf.png')}
        />
        <Text style={{ color: '#118615' }}>
          Charging an electric vehicle is equivalent to giving a car a breath of
          fresh air
        </Text>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
  },
  formcontent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  Text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '500',
    textAlign: 'justify',
    marginVertical: hp(4),
  },

  input: {
    height: 45,
    borderColor: '#838284',
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: hp(1),
    paddingHorizontal: 20,
    color: '#838284',
  },
  ConnectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp(40),
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'green',
    marginTop: hp(6),
  },
  ConnectText: {
    fontSize: 16,
    color: '#0D0D0D',
  },

  tagNote: {
    height: 60,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagNoteImg: {
    height: 40,
    marginRight: 6,
  },
})

export default Connect_to_WiFi
