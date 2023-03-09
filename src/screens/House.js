
import React, { useState } from 'react'
import Header from '../components/Header';
import { SafeAreaView, StyleSheet, TextInput, Alert } from 'react-native';
import { Text, View, Linking } from 'react-native';
import Button from '../components/Button'
import Background from '../components/Background';
import DropDownPicker from 'react-native-dropdown-picker';
import BackButton from '../components/BackButton'


export default function House({ navigation }) {
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>
        Which Car Do you Own ?
      </Header>

      {/* <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    /> */}
      <Button
        mode="contained"
        onPress={() => navigation.replace('House')}
      >to home </Button>
    </Background>
  )
}
