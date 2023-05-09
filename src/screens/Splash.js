import { View, Text, StatusBar } from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Logo from '../components/Logo'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
    const navigation = useNavigation();
    useEffect(() => {
      setTimeout(() => {
        getData();
      },1000);
    }, [])
    
    const getData = async () => {
      const email = await AsyncStorage.getItem('EMAIL');
      console.log(email);
      if(email !== null )
        {
          navigation.navigate('Home');
        }
      else{
        navigation.navigate('LoginScreen')
      }
    }
  return (
    <>
    <StatusBar
        animated={true}
        backgroundColor="##FFFFFF"
        barStyle="light-content"
      />
    <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#FFFFFF'}}>
      <View style={{alignItems:'center', justifyContent:'center', width:200, height:200, borderRadius:200, backgroundColor:'#ffffff'}}>
      {/* <Text style={{fontSize:25, fontWeight:600, color:'#118615'}}>UNIVERSE</Text> */}
      <Logo />
      </View>
    </View>
    </>
  )
}

export default Splash