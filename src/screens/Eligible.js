import React from 'react';
import Header from '../components/Diffheader';
import { SafeAreaView, StyleSheet, TextInput, Alert } from 'react-native';
import { Text, View, Linking } from 'react-native';
import Button from '../components/Button'
import Background from '../components/Background';
import Normal from "../components/Normal"

export default function Eligible({ navigation }) {
  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Normal  ></Normal>
      <Header>
        Now , You are eligible to step in Green and Clean world.
      </Header>
      <Button
        mode="contained"
        onPress={() => navigation.replace('Car')}
      >
       OK
      </Button>
    </Background>
  )
}