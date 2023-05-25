import React from 'react';
import Header from '../components/Diffheader';
import { SafeAreaView, StyleSheet, TextInput, Alert } from 'react-native';
import {  View, Linking } from 'react-native';
import Button from '../components/Button'
import { Text } from 'react-native-paper'
import Background from '../components/Background';
import Normal from "../components/Normal"
import Logo from '../components/Logo';
import { theme } from '../core/theme'
import Green from '../components/Green';

export default function Eligible({ navigation }) {
  return (
    <Background>

{/* let's tinker app  for pc testing and debuging  */}




      {/* <BackButton goBack={navigation.goBack} /> */}
      {/* <Normal  ></Normal> */}
      <Logo/>
      <Header style={styles.Congratulations}>Congratulations!!</Header>
      <Text style={styles.link}>
       Now You Are
      </Text>
      <Text style={styles.link}>
        A Part Of
      </Text>
      <Text style={styles.link}>
        Greener & Cleaner 
      </Text>
      <Text style={styles.link}>
        Future 
      </Text>
      {/* <Text style={styles.link}>Login</Text> */}
      <Button
        mode="contained"
        onPress={() => navigation.replace('Car')}
      >
       OK
      </Button>
      <Green/>
     
    </Background>
  )
}


const styles = StyleSheet.create({
 
  Congratulations:{
    fontWeight: 'bold',
    fontSize: 33,
    color: theme.colors.primary,
  },
  
  link: {
    fontWeight: 'bold',
    fontSize: 25,
    color: theme.colors.primary,
  }
})
