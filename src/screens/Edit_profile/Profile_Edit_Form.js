import React, { useRef } from 'react'
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
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions'

const Profile_Edit_Form = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="gray"
        returnKeyType="next"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        keyboardType="email-address"
        returnKeyType="next"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry={true}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => console.log('press')}
      >
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
    color: 'red',
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
