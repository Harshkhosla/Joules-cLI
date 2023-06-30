import React from 'react';
import Header from '../components/Header';
import { StyleSheet, Alert } from 'react-native';
import Newbutton from '../components/Newbutton';
import Background from '../components/Background';
import { useDispatch } from 'react-redux';
import { setName } from '../Redux/Action';
import { Dimensions } from 'react-native';
import Charger from '../components/Charger';
import Logo from '../components/Logo';




const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Datainput({ navigation }) {

  const OnClick = () => {
      navigation.navigate('Load');

  };

  return (
    <Background>
    <Logo/>
    
   <Charger/>
    <Header style={styles.header}>
      To improve your experience, we kindly request your input through a short questionnaire. 
      {'\n'}{'\n'}
      It does not require any personal information and will greatly assist us in understanding your specific needs and preferences.
    </Header>

    <Newbutton mode="contained" onPress={OnClick}>
      Okay
    </Newbutton>
  </Background>

  );
}

const styles = StyleSheet.create({
  input: {
    height: screenHeight * 0.1,
    width: screenWidth * 0.8,
    margin: screenHeight * 0.02,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  header: {
    fontSize: screenWidth * 0.048,
    color: 'black',
    marginTop: screenHeight * -0.35,
    // marginBottom: screenHeight * 0.05,
    marginHorizontal: screenWidth * -0.05,
    // textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    width: screenWidth * 0.24,
    height: screenHeight * 0.07,
    marginTop: screenHeight * -0.39,
    // marginBottom: screenHeight * 0.1,
    alignSelf: 'center',
  },
  images: {
    width: screenWidth * 0.45,
    height: screenWidth * 0.45,
    top: screenHeight * 0.36,
    right: screenWidth * -0.275,
    alignSelf: 'center',
  },
});