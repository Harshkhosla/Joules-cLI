import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import Elegiblity from '../components/Elegiblity'
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { setFlat } from '../Redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import { Click } from '../Redux/Action';

export default function Flat({ navigation }) {
  
  const imagesAllData = useSelector(state => state?.userReducers);
  console.log(imagesAllData);

  const [value, setValue] = React.useState('');
  const dispatch = useDispatch()
  const sendResetPasswordEmail = () => {
    console.log(value);
    dispatch(setFlat(value))
    dispatch(Click(imagesAllData));
    navigation.navigate('HomePage')
  }

  return (
    <Background>
      <Logo />
      <BackButton goBack={navigation.goBack} />
      <Elegiblity/>
      <Header>Where do You live?</Header>
    <View>
  <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
    <RadioButton.Item label="Apartments" value="Apartments"/>
    <RadioButton.Item label="Individual House" value="Individual House"/>
 
  </RadioButton.Group>
</View>
      
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Done
      </Button>
    </Background>
  )
}
