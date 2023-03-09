import React from 'react';
import Header from '../components/Header';
import { SafeAreaView, StyleSheet, TextInput, Alert } from 'react-native';
import { Text, View, Linking } from 'react-native';
import Button from '../components/Button'
import Background from '../components/BackgroundCar';


export default function Eligible({ navigation }) {
  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Header>
        Now , You are eligibil to step in Green and Clean world.
      </Header>
      <Button
        mode="contained"
        onPress={() => navigation.replace('Car')}
      >
        Navigating to Car section
      </Button>
    </Background>
  )
}