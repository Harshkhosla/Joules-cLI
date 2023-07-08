import React from 'react';
import Header from '../components/Header';
import { Text, View, Image, Linking, Dimensions,TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import Clampinput from '../components/Clampinput';
import Background from '../components/Background';
// import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../Redux/Action';
import Logo from '../components/Logo';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Loadcomponent from '../components/Loadcomponent';
import Charger from '../components/Charger';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function clamp({ navigation }) {
  const dispatch = useDispatch();
  const [text, onChangeText] = React.useState('');

  return (
    <Background>
      
      <View style={styles.image} >
      <Logo/>
      </View>
      <View style = {styles.charger}>
     <Charger/> 
     </View> 

      <Header style={styles.header}>{'\  '}What is the calibrated value from clamp meter</Header>
      <View style={styles.container}>
      <CountdownCircleTimer
    isPlaying
    duration={60}
    colors={['#118615', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[40, 30, 20, 0]}
  >
    {({ remainingTime }) => <Text style={styles.inpute}>{remainingTime}</Text>}
  </CountdownCircleTimer>
  </View>
      <View style={styles.input}>
       <Clampinput
        label="Enter Value"
        
        onChangeText={onChangeText}
        value={text}
        keyboardType="numeric"
      />
      </View>
      {/* Add a button or any other components here */}
      
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: screenHeight * -0.4,
  },
  charger:{
    width: screenWidth * 0.57,
    height: screenWidth * 0.57,
    top: screenHeight * 0.3,
    right: screenWidth * 0.0,
    alignSelf: 'center',
  },
  input: {
    // height: screenHeight * 0.058,
    // width: screenWidth * 0.8,
    marginVertical: screenHeight * 0.02,
    borderRadius: screenHeight * 0.06,
    top: screenHeight * -0.2,
    color: 'black',
    // marginLeft: screenWidth * 0.0001,
  },
  inpute: {
   
    color: 'black',
    fontSize:40,
    // marginLeft: screenWidth * 0.0001,
  },
  header: {
    fontSize: screenWidth * 0.055,
    fontWeight: 'bold',
    color: 'black',
    // marginTop: screenHeight * -0.23
    top: screenHeight * 0.07,
    // textAlign: 'justify',
  },
  image: {
    width: screenWidth * 0.28,
    height: screenHeight * 0.09,
    top: screenHeight * 0.3,
  },
  images: {
    width: screenWidth * 0.55,
    height: screenWidth * 0.55,
    top: screenHeight * 0.38,
    right: screenWidth * -0.23,
  },
});