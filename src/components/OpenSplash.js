import React, { useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('Authtoken')
        if (userToken) {
          navigation.replace('chargerSelection')
        } else {
          navigation.replace('SignIn')
        }
      } catch (error) {
        console.error('Error fetching userToken:', error)
      }
    }

    checkSignInStatus()
  }, [navigation])

  return (
    <View style={styles.container}>
      {/* Add your loading component here */}
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default AuthLoadingScreen
