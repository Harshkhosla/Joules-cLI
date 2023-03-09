import React from 'react';
import Header from '../components/Header';
import { SafeAreaView, StyleSheet, TextInput, Alert } from 'react-native';
import { Text, View, Linking } from 'react-native';
import Button from '../components/Button'
import Background from '../components/backgroundstation';
import BackButton from '../components/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../Redux/Action';


export default function Load({ navigation }) {
  const dispatch = useDispatch()
  // const UserName=useSelector(state=>state?.userReducers?.house_voltage)
  // console.log(UserName);
  const [text, onChangeText] = React.useState('');
  const OnClick = () => {
    console.log(text);
    const sample  = text / 0.22;
    // console.log(sample);
    const house_voltage=Math.floor(sample)
    {
      text < "10" ? Alert.alert('Alert Title', 'Connect to the nearest Discom', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]) :
        dispatch(setName(house_voltage))
      navigation.navigate('Eligible')
    }
  }
  return (
    <Background>

      <BackButton goBack={navigation.goBack} />
      <Header>
        What is the Maximum electrical sanctioned Load Of Your Home ?
      </Header>

      <TextInput
        label="Name"
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        keyboardType="numeric"
      />
      <Button
        mode="contained"
        styles={styles.button}
        onPress={OnClick
        }>
        JHJ
      </Button>
    </Background>
  )
}
const styles = StyleSheet.create({
  input: {
    height: 90,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    height: 40,
    width: 200,
  }
});