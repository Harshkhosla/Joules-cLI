import React from 'react';
import Header from '../components/Header';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, StyleSheet,  Alert } from 'react-native';
import Button from '../components/Button'
import Background from '../components/Background';
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../Redux/Action';
import Logo from '../components/Logo';
import Loadcomponent from '../components/Loadcomponent';
import { log } from 'react-native-reanimated';


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
  // const data =async()=>{
  //   const mEmail = await AsyncStorage.getItem('Authtoken');
  //   console.log(mEmail,"googmorning");
  // }
  return (
    <Background>

      <BackButton goBack={navigation.goBack} />
      <Logo/>
      <Loadcomponent/>
      <Header>
        What is the maximum electrical sanctioned load Of your home ?
      </Header>

      <TextInput
        label="Enter electrical sanctioned load"
        // style={styles.input}
        onChangeText={onChangeText}
        value={text}
        keyboardType="numeric"
      />
     
      <Button
        mode="contained"
        styles={styles.button}
        onPress={OnClick
        }>
        OK
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
    color: 'black',
  
  },
  button: {
    height: 40,
    width: 200,
   
  }
});