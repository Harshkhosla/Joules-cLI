import React from 'react';
import Header from '../components/Header';
import { Text, View, Image, Linking, Dimensions,TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';
import Background from '../components/Background';
// import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../Redux/Action';
import Logo from '../components/Logo';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Loadcomponent from '../components/Loadcomponent';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function clamp({ navigation }) {
  const dispatch = useDispatch();
  const [text, onChangeText] = React.useState('');

  const OnClick = () => {
    const sample = text / 0.22;
    const house_voltage = Math.floor(sample);

    if (text < '10') {
      Alert.alert('Alert Title', 'Connect to the nearest Discom', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      dispatch(setName(house_voltage));
      navigation.navigate('Eligible');
    }
  };

  return (
    <Background>
      <View>
        <Image source={require('../assets/jouls.png')} style={styles.image} />
      </View>
      <View>
        <Image source={require('../assets/charger1.png')} style={styles.images} />
      </View>
      {/* <BackButton goBack={navigation.goBack} /> */}


      <Header style={styles.header}>What is the calibrated value from clamp meter:</Header>
      <CountdownCircleTimer
    isPlaying
    duration={60}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[40, 30, 20, 0]}
  >
    {({ remainingTime }) => <Text style={styles.inpute}>{remainingTime}</Text>}
  </CountdownCircleTimer>

      <TextInput
        label="Enter value"
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        keyboardType="numeric"
      />
      
      {/* Add a button or any other components here */}
      
    </Background>
  );
}

const styles = StyleSheet.create({
  input: {
    height: screenHeight * 0.058,
    width: screenWidth * 0.8,
    marginVertical: screenHeight * 0.02,
    borderRadius: screenHeight * 0.06,
    backgroundColor: '#F2F3F8',
    color: 'black',
    // marginLeft: screenWidth * 0.0001,
  },
  inpute: {
   
    color: 'black',
    fontSize:40,
    // marginLeft: screenWidth * 0.0001,
  },
  header: {
    fontSize: screenWidth * 0.065,
    fontWeight: 'bold',
    color: 'black',
    marginTop: screenHeight * -0.23,
    alignContent: 'center',
  },
  image: {
    width: screenWidth * 0.28,
    height: screenHeight * 0.09,
    marginTop: screenHeight * -0.34,
    marginBottom: screenHeight * -0.08,
  },
  images: {
    width: screenWidth * 0.55,
    height: screenWidth * 0.55,
    top: screenHeight * 0.38,
    right: screenWidth * -0.23,
  },
});