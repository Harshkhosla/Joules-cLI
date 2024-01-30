import React, { useState } from 'react';
import { View, ScrollView, Image ,Dimensions } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo4';
import Header from '../components/Header';
import Button from '../components/Button';
import { emailValidator } from '../helpers/emailValidator';
import Elegiblity from '../components/Elegiblity';
import { setFlat } from '../Redux/Action';
import { setTYPE } from '../Redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import { Click } from '../Redux/Action';
import EvCharging from '../components/EvCharging';
import { StyleSheet } from 'react-native';



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default function ChargingOption({ navigation }) {
  const imagesAllData = useSelector((state) => state?.userReducers);
  console.log(imagesAllData);

  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const sendResetPasswordEmail = () => {
    console.log(value);
    dispatch(setFlat(value));
    dispatch(setTYPE(value));
    dispatch(Click(imagesAllData));
    if(value =="Apartments" ){

        navigation.navigate('Datainput');
        
    }else{
        navigation.navigate('Navbar');

    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Background>
        {/* <Logo style={styles.logo} /> */}
        <Image source={require('../assets/jouls.png')} style={styles.image1} /> 
        <BackButton goBack={navigation.goBack} />
        <Elegiblity  />
        <Header >What chargers are you using?</Header>
        <View>
          <RadioButton.Group onValueChange={(value) => setValue(value)} value={value}>
            <RadioButton.Item label="Private Charger" value="Apartments" />
            <RadioButton.Item label="Public Charger" value="Individual House" />
          </RadioButton.Group>
        </View>

        <Button mode="contained" onPress={sendResetPasswordEmail} style={{ marginTop: 10 }}>
          Done
        </Button>
        {/* <EvCharging /> */}
        {/* <View>
        <Image source={require('../assets/charger1.png')} style={styles.images} />
      </View> */}
       <EvCharging/>
      </Background>
    </ScrollView>
  );
}
const styles = StyleSheet.create({


image: {
  width: screenWidth * 0.24,
  height: screenHeight * 0.07,
  top: screenHeight * 0.006,
  alignSelf: 'center',
},
logo: {
  width: screenWidth * 0.24,
  height: screenHeight * 0.27,
  alignSelf: 'center',
  marginTop: screenHeight * 0.04,
},

image1: {
  width: screenWidth * 0.25,
  height: screenHeight * 0.07,
  alignSelf: 'center',
  marginTop: -screenHeight * 0.27,
  marginBottom:screenHeight * 0.17,
},
// image11: {
//   width: screenWidth * 0.25,
//   height: screenHeight * 0.07,
//   alignSelf: 'center',
//   marginTop: -screenHeight * 0.4,
//   marginBottom:screenHeight * 0.17,
// },
});