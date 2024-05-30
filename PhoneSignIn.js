import React, { useState, useEffect } from 'react'
import { View, Button, TextInput, StyleSheet, Text } from 'react-native'
import auth from '@react-native-firebase/auth'

const PhoneSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [confirm, setConfirm] = useState(null)
  const [code, setCode] = useState('')

  function onAuthStateChanged(user) {
    if (user) {
      // Navigate to another screen or show a success message
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  async function signInWithPhoneNumber() {
    const confirmation = await auth().signInWithPhoneNumber(`+91${phoneNumber}`)
    setConfirm(confirmation)
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code)
    } catch (error) {
      console.log('Invalid code.')
    }
  }

  if (!confirm) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />
        <Button title="Phone Number Sign In" onPress={signInWithPhoneNumber} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={(text) => setCode(text)}
        placeholder="Enter verification code"
        keyboardType="numeric"
      />
      <Button title="Confirm Code" onPress={confirmCode} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    marginTop: 10,
  },
})

export default PhoneSignIn
